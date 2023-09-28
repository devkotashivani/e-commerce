import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/category/categoryAction";
import { setSelectedCategory } from "../../redux/category/categorySlice";
import { setModalShow } from "../../redux/systemState/systemSlice";
import CustomModal from "../customModal/CustomModal";
import EditCategoryForm from "./EditCategoryForm";

function CategoryTable() {
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.category);

  const handleOnEdit = (categoryDetail) => {
    dispatch(setSelectedCategory(categoryDetail));
    dispatch(setModalShow(true));
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, []);

  return (
    <div>
      <CustomModal title="Update Category">
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
                  <span className={cat.status}>{cat.status}</span>
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
