import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategoryAction,
  deleteCategory,
  deleteCategoryAction,
} from "../../redux/category/categoryAction";
import { setModalShow } from "../../redux/systemState/systemSlice";

function EditCategoryForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });

  const { selectedCategory } = useSelector((state) => state.category);

  useEffect(() => {
    setForm(selectedCategory);
  }, [selectedCategory]);

  const handleOnChange = (e) => {
    let { name, value, checked } = e.target;
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    dispatch(addCategoryAction(form));
    dispatch(setModalShow(false));
  };

  const handleOnDelete = () => {
    dispatch(deleteCategoryAction(form.slug));
  };
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-1 ms-1 me-1 shadow-lg"
      >
        <Row>
          <Col md="3">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Status"
                name="status"
                checked={form.status === "active"}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                value={form.name}
                required
                name="name"
                type="text"
                onChange={handleOnChange}
              />
              <Form.Label>{`Slug: ${form.slug}`}</Form.Label>
            </Form.Group>
          </Col>
          <Col md="3">
            <Button type="submit">Update</Button>
          </Col>
        </Row>
        <Row>
          <Col className="mt-2 d-grid">
            <Button variant="danger" onClick={handleOnDelete}>
              Delete
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EditCategoryForm;
