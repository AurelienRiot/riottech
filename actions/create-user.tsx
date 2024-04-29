import { RegisterFormValues } from "@/app/(routes)/(public)/(auth)/register/_components/register-form";
import { User } from "@prisma/client";
import axios from "axios";

const CreatUser = async (data: RegisterFormValues): Promise<User> => {
  const res = await axios.post(`/api/users`, data);

  return res.data;
};

export default CreatUser;
