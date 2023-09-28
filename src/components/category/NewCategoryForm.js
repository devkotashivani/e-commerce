import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import slugify from "slugify";
import { addCategoryAction } from "../../redux/category/categoryAction";

function NewCategoryForm() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    status: "inactive",
  });

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
    const slug = slugify(form.name, {
      lower: true,
      trim: true,
    });
    const catObj = { ...form, slug };
    dispatch(addCategoryAction(catObj));
  };
  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        className="border p-1 ms-1 me-1 shadow-lg"
      >
        <Row>
          <Col md="2">
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                label="Status"
                name="status"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Name"
                required
                name="name"
                type="text"
                onChange={handleOnChange}
              />
            </Form.Group>
          </Col>
          <Col md="5">
            <Button type="submit">Add New Category</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default NewCategoryForm;
