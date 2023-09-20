import axios from "axios";

const ReqResetPass = async (email: string) => {
  const reset = await axios.post(`/api/users/reset-password`, { email });

  return reset;
};

export default ReqResetPass;
