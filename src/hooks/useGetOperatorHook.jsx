import { useState } from "react";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useGetOperatorHook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [getOperators,setGetOperators]=useState();
  const [loginResponse, setLoginResponse] = useState();
  let token = localStorage.getItem("token");

  const handleGetOperator = () => {
    setLoading(true);
    let headers = {
      Authorization: "Bearer " + token,
    };
    axios
      .get("https://backend-api.my360tribe.org/api/v1/operator-intake", {
        headers,
      })
      .then((res) => {
        console.log(res, "operator");
        if (res?.status == 200) {
          setGetOperators(res?.data?.data?.operatorIntakes)
          setLoading(false);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        toast.error(err?.response?.data?.message);
      });
  };

  return {
    handleGetOperator,
    loading,
    loginResponse,
    getOperators
  };
};
