import { useEffect } from "react";
import { get } from "./backend.service";
import { useNavigate, useLocation } from "react-router-dom";
import { areOptionsEqual } from "@mui/base";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../slices/load";
import authHeader from "./auth-header";
import { useSelector } from "react-redux";

export default function useBasicServices() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  function getURL() {
    if (!isNaN(pathname.split("/")[2])) {
      let tourID = pathname.split("/")[1];
      let compID = pathname.split("/")[2];
      return `tournaments/${tourID}/hascomp/${compID}/`;
    } else {
      let tourID = pathname.split("/")[1];
      return `tournaments/${tourID}/`;
    }
  }

  useEffect(() => {
    if(!isLoggedIn){
      navigate("/")
    }

    if (!isNaN(pathname.split("/")[1])) {
      fetch(`${process.env.REACT_APP_API + getURL()}`, {
        headers: {
          Authorization: authHeader(),
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status == 404) {
            navigate("/not_found");
            console.clear();
          }
        })
        .catch((error) => console.log(error));
    }
  }, [pathname]);

  const setLoadingState = (state) => {
    dispatch(setIsLoading(state));
  };


  return { setLoadingState };
}
