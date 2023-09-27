import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setModalShow } from '../../redux/systemState/systemSlice';


function CustomModal({children, title, handleClose}) {

  const dispatch = useDispatch()
  const {modalShow} = useSelector((state)=>state.system)
  return (
    <div>
        <Modal show={modalShow} onHide={()=>dispatch(setModalShow(false))}>
                  <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {children}
                  </Modal.Body>
                  
                </Modal>
    </div>
  )
}

export default CustomModal
