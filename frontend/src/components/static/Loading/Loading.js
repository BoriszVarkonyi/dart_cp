import { Modal } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export default function Loading() {
  const { isLoading } = useSelector((state) => state.isLoading);

  return (
    <Modal open={isLoading}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <img src="https://media.tenor.com/KEzW7ALwfUAAAAAC/cat-what.gif" />
      </div>
    </Modal>
  );
}
