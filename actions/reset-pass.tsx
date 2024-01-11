import axios from "axios";

const ResetPass = async (password: string, resetToken: string) => {
  const reset = await axios.patch("/api/users/reset-password", {
    password,
    resetToken,
  });

  return reset;
};

export default ResetPass;
