import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../redux/category/CategorySlice";
import CustomModal from "../customModal/CustomModal";
import NewCategoryForm from "./NewCategoryForm";
import { setModalShow } from "../../redux/systemState/systemSlice";
import { fetchCategoryAction } from "../../redux/category/CategoryAction";
import EditCategoryForm from "./EditCategoryForm";

function CategoryTable() {
  const { categoryList } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  
  
  const handleOnEdit = (categoryDetail) => {
  
    dispatch(setSelectedCategory(categoryDetail));
    dispatch(setModalShow(true))
  };

  useEffect(()=>{
    dispatch(fetchCategoryAction())
  },[])

  
  return (
    <div>
         <CustomModal show={true} title="Update Category" >
            <EditCategoryForm />
         </CustomModal>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((cat, i) => {
            return (
              <tr key={cat.slug}>
                <td>{i + 1}</td>
                <td>
                  <span className={cat.status}>{cat.status} </span>
                </td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>
                  <Button variant="warning" onClick={() => handleOnEdit(cat)}>
                    Edit
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryTable;
