import getFullUser from "@/server-actions/get-user";
import { UserForm } from "./components/user-form";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const user = await getFullUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className=" p-8 pt-6">
      <div className="mb-8 space-y-4 ">
        <UserForm initialData={{ ...user, password: null }} />
      </div>
    </div>
  );
};

export default SettingsPage;
