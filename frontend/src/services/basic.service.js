import { useEffect } from "react";
import { get } from "./backend.service";
import { useNavigate, useLocation } from "react-router-dom";
import { areOptionsEqual } from "@mui/base";
import { Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../slices/load";

export default function useBasicServices() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    fetch(`${process.env.REACT_APP_API + getURL()}`)
      .then((response) => {
        if (response.status == 404) {
          navigate("/not_found");
          console.clear();
        }
      })
      .catch((error) => console.log(error));
  }, [pathname]);

  const setLoadingState = (state) => {
    dispatch(setIsLoading(state))
  };

  return { setLoadingState };
}
