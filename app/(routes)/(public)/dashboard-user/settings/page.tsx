import GetUser from "@/server-actions/get-user";
import { UserForm } from "./components/user-form";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const user = await GetUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex-col p-8 pt-6">
      <div className="flex-1 mb-8 space-y-4 ">
        <UserForm initialData={user} />
      </div>
    </div>
  );
};

export default SettingsPage;
