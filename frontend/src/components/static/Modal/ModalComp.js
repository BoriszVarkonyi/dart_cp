import React from "react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { closeModal } from "../../../slices/modalSlice";
import { useDispatch } from "react-redux";
import useDataGridHelper from "../../../services/useDataGridHelper";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";

export default function ModalComp(props) {
  const { deleteFunction } = useDataGridHelper();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const contentProps = props.content
  return (
    <Modal open={isOpen}>
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.title}
        </Typography>

        {props.type == "Alert" && (
          <div className="Alert">
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {contentProps.text}
            </Typography>
            <div className="Buttons">
              <Button
                variant="contained"
                onClick={() => {
                  contentProps.actionOnConfirm();
                  dispatch(closeModal());
                }}
              >
                {contentProps.confirmButtonText}
              </Button>
              <Button
                variant="contained"
                onClick={() => dispatch(closeModal())}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {props.type == "Barcode" && (
          <div className="Barcode">
            <div>Ide jön a kép</div>
            <TextField label="Code" type="text" size="small" variant="filled" />
          </div>
        )}
      </Box>
    </Modal>
  );
}
