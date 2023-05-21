import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../slices/load";
import authHeader from "./auth-header";
import { useSelector } from "react-redux";

export default function useBasicServices() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  function checkURL() {
    let url = "";
    if (!isNaN(parseInt(pathname.split("/")[2]))) {
      let tourID = pathname.split("/")[1];
      let compID = pathname.split("/")[2];
      url = `tournaments/${tourID}/hascomp/${compID}/`;
    } else {
      let tourID = pathname.split("/")[1];
      url = `tournaments/${tourID}/`;
      if(pathname.split("/")[2] !== "weapon_control_report" && pathname.split("/")[2] !== "competitions" && pathname.split("/")[2] !== undefined){
        navigate("/not_found");
        console.clear();
      }
    }

    fetch(`${process.env.REACT_APP_API + url}`, {
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


  useEffect(() => {
    if (isLoggedIn) {
      if (!isNaN(parseInt(pathname.split("/")[1]))) {
        checkURL();
      } else {
        if (pathname.split("/")[1] !== "panel" && pathname.split("/")[1] !== "" && pathname.split("/")[1] !== "not_found") {
          navigate("/not_found");
          console.clear();
        }
      }
    } else {
      navigate("/");
    }
  }, [pathname]);

  const setLoadingState = (state) => {
    dispatch(setIsLoading(state));
  };

  return { setLoadingState };
}
