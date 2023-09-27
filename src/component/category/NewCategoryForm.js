import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../redux/category/CategoryAction";
import slugify from "slugify";

function NewCategoryForm() {
  const [form, setForm] = useState({
    status: "inactive",
  });
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    console.log(e);
    let { name, value, checked } = e.target;
    console.log(e.target)
    if (name === "status") {
      value = checked ? "active" : "inactive";
    }
      setForm({
        ...form,    
        [name]: value,
      });
  };

  const hanndleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);

    // todo
    // by default it will have name annd status
    // but i want to pass one more field called slug
    const slug = slugify(form.name, {
      lower: false,
      trim: true,
    });
    const catObj = { ...form, slug };
    dispatch(addCategoryAction(catObj));
  };
  return (
    <div>
      <Form
        onSubmit={hanndleOnSubmit}
        className="border p-2 ms-1 me-1 shadow-lg"
      >
        <Row>
          <Col md="2">
            <Form.Check
              label="Status"
              name="status"
              type="switch"
              onChange={handleOnChange}
            />
          </Col>
          <Col md="5">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
              placeholder="Name"
                name="name"
                type="text"
                required
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
