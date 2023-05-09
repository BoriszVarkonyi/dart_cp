import React, { useState } from "react";
import "./Modal.css";
import { Button, Modal, Box, IconButton } from "@mui/material";
import { closeModal } from "../../../slices/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import verifyHash from "../../../services/hash.service";
import { useNavigate } from "react-router-dom";

export default function ModalComp(props) {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const navigate = useNavigate();

  const modalProps = props.modalProps;

  const barCodeInputHandler = async (e) => {
    if (e.key === "Enter") {
      let obj = {};
      try {
        obj = JSON.parse(e.target.value);
        dispatch(closeModal())
      } catch (e) { }
      if (obj && obj.ciphertext && obj.nonce && obj.nonce) {
        const result = await verifyHash(obj);
        if (result !== false)
          navigate("add", { state: { rowId: result.fencer } });
      }
    }
  };

  return (
    <Modal open={isOpen} className="ModalWrapper">
      <Box className="Modal">
        <div className="ModalHeader">
          <p className="ModalTitle">{modalProps.title}</p>
          {modalProps.subtitle != undefined && (
            <p className="ModalSubtitle">{modalProps.subtitle}</p>
          )}
          <IconButton
            className="ModalCloseButton"
            onClick={() => dispatch(closeModal())}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {modalProps.type == "Alert" && (
          <div className="ModalFooter">
            <Button variant="outlined" onClick={() => dispatch(closeModal())}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                modalProps.deleteRow();
                dispatch(closeModal());
              }}
            >
              {modalProps.confirmButtonText}
            </Button>
          </div>
        )}

        {modalProps.type == "Barcode" && (
          <div className="ModalContent">
            <div className="ModalContentInner">
              <QrCodeScannerIcon className="BarcodeImage" sx={{ fontSize: 160 }} />
              <TextField
                label="Code"
                type="text"
                size="small"
                variant="filled"
                onKeyDown={(e) => {
                  barCodeInputHandler(e);
                }}
              />
            </div>
          </div>
        )}

        {modalProps.type == "Success" && (
          <div className="ModalContent">
            <div className="ModalContentInner">
              <p>{modalProps.text}</p>
            </div>
          </div>
        )}


        {/*props.type == "Print" && (
          <div>
            <TextField label="Margin top" type="number" size="small" variant="filled" />
            <TextField label="Margin left" type="number" size="small" variant="filled" />
            <TextField label="Margin right" type="number" size="small" variant="filled" />
            <TextField label="Margin bottom" type="number" size="small" variant="filled" />
            <TextField label="No. of rows" type="number" size="small" variant="filled" />
            <TextField label="Space between rows" type="number" size="small" variant="filled" />
            <TextField label="No. of colums" type="number" size="small" variant="filled" />
            <TextField label="Space between columns" type="number" size="small" variant="filled" />
          </div>
        )*/}
      </Box>
    </Modal>
  );
}
