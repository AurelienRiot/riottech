import getFullUser from "@/server-actions/get-user";
import { UserForm } from "./components/user-form";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const user = await getFullUser();

  if (!user) {
    redirect("/login");
  }
  console.log(user);

  return (
    <div className="flex-col p-8 pt-6">
      <div className="mb-8 flex-1 space-y-4 ">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default SettingsPage;
