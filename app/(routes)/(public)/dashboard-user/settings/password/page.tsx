import { PasswordForm } from "./components/password-form";

const SettingsPage = async () => {
  return (
    <div className="flex-col p-8 pt-6">
      <div className="flex-1 mb-8 space-y-4 ">
        <PasswordForm />
      </div>
    </div>
  );
};

export default SettingsPage;
