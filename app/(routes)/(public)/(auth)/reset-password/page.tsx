import ResetPasswordForm from "./components/reset-password-form";


const ResetPasswordPage = () => {
  return ( 

    <div className="flex items-center justify-center w-screen h-sccreen bg-slate-100 dark:bg-slate-900">
    <div className="px-8 pt-12 pb-8 space-y-12 sm:shadow-xl sm:bg-white sm:dark:bg-black rounded-xl text">
    <h1 className="text-2xl font-semibold text-center">  Réinitialiser votre mot de passe</h1>
    <ResetPasswordForm />
    </div>
  </div>
   );
}
 
export default ResetPasswordPage