import axios from "axios";
import { useNavigate } from "react-router";

export function useAuthCheck(destination, alternative) {
  const navigate = useNavigate();

  return () => {
    axios
      .get("/api/account/")
      .then((res) => {
        console.log("res:", res);
        if (res.data) navigate(destination);
        else if (alternative) navigate(alternative);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function useNonAuthCheck(destination, alternative) {
  const navigate = useNavigate();
  return () => {
    axios
      .get("/api/account")
      .then((res) => {
        if (!res.data) navigate(destination);
        else if (alternative) navigate(alternative);
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
