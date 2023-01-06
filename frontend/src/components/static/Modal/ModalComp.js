import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { closeModal } from "../../../slices/modalSlice";
import { useDispatch } from "react-redux";
import useDataGridHelper from "../../../services/useDataGridHelper";
import { useSelector } from "react-redux";

export default function ModalComp(props) {
  const {deleteFunction } = useDataGridHelper();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  return (
    <Modal
    open={isOpen}
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {props.text}
        </Typography>
        <div className="Buttons">
          <Button
            variant="contained"
            onClick={() => {
              props.actionOnConfirm();
              dispatch(closeModal());
            }}
          >
            {props.confirmButtonText}
          </Button>
          <Button variant="contained" onClick={()=> dispatch(closeModal())}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
