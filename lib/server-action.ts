import { checkUser } from "@/components/auth/checkAuth";
import { getSessionUser } from "@/server-actions/get-user";
import type { Role } from "@prisma/client";
import { nanoid } from "nanoid";
import type { Session } from "next-auth";
import type { z } from "zod";
import { rateLimit } from "./rate-limit";

export type ReturnTypeServerAction<R = undefined, E = undefined> =
  | {
      success: true;
      message: string;
      data?: R;
    }
  | {
      success: false;
      message: string;
      errorData?: E;
      zodError?: {
        [x: string]: string[] | undefined;
        [x: number]: string[] | undefined;
        [x: symbol]: string[] | undefined;
      };
    };

type BaseServerActionType<D extends z.ZodTypeAny, U> = {
  schema: D;
  roles?: Role[];
  data: z.infer<D>;
  rateLimited?: boolean;
};

type SafeServerActionType<D extends z.ZodTypeAny, R, E, U> = BaseServerActionType<D, U> &
  (
    | {
        ignoreCheckUser?: false;
        serverAction: (data: z.infer<D>, user: Session["user"]) => Promise<ReturnTypeServerAction<R, E>>;
      }
    | {
        ignoreCheckUser: true;
        serverAction: (data: z.infer<D>, user: Session["user"] | null) => Promise<ReturnTypeServerAction<R, E>>;
      }
  );

async function safeServerAction<D extends z.ZodTypeAny, R, E, U>({
  schema,
  serverAction,
  ignoreCheckUser,
  data,
  roles = ["admin", "user", "pro"],
  rateLimited,
}: SafeServerActionType<D, R, E, U>): Promise<ReturnTypeServerAction<R, E>> {
  const timerLabel = `Total Execution Time - ${nanoid(5)}`;
  console.time(timerLabel);

  const user = await getSessionUser();

  if (rateLimited) {
    const isRateLimited = await rateLimit(user?.role);
    if (isRateLimited) {
      console.timeEnd(timerLabel);

      return {
        success: false,
        message: "Trop de requêtes. Veuillez reessayer plus tard",
      };
    }
  }

  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    console.timeEnd(timerLabel);
    return {
      success: false,
      message: validatedData.error.issues[0].message,
      zodError: validatedData.error.flatten().fieldErrors,
    };
  }
  if (ignoreCheckUser) {
    const result = await serverAction(validatedData.data, user);
    console.timeEnd(timerLabel);
    return result;
  }

  if (!user || !roles.includes(user.role)) {
    console.timeEnd(timerLabel);
    return {
      success: false,
      message: "Vous devez être authentifier pour effectuer cette action",
    };
  }

  const result = await serverAction(validatedData.data, user);
  console.timeEnd(timerLabel);
  return result;
}

export default safeServerAction;
