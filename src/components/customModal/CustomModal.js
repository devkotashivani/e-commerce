import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setModalShow } from "../../redux/systemState/systemSlice";

function CustomModal({ children, title }) {
  const dispatch = useDispatch();
  const { modalShow } = useSelector((state) => state.system);
  return (
    <Modal show={modalShow} onHide={() => dispatch(setModalShow(false))}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default CustomModal;
