import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction } from "../../redux/category/CategoryAction";
import slugify from "slugify";
import CustomInput from "../customInput/CustomInput";
import { addProductAction } from "../../redux/poduct/ProductAction";

function NewProductForm() {
  const [form, setForm] = useState({
    status: "inactive",
  });

  const {categoryList} = useSelector(state => state.category);
  const dispatch = useDispatch();
  // this part
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
    // dispatch create action
    const slug = slugify(form.title,{
      lower: true,
      trim: true,
    })

    const productObj = {...form, slug}

    // add new file to capture images
    // upload it to storage
    // grab the url
    // update the product with url
    
    dispatch(addProductAction(productObj))

    
  };
  const inputFields =[
    {
    label: "Product Name",
    name: "title",
    type: "text",
    placeholder: "Mobile Phone",
    required: true,
  },
  {
    label: "SKU",
    name: "sku",
    type: "text",
    placeholder: "MS_SJ",
    required: true,
  },
  {
    label: "Price",
    name: "price",
    type: "number",
    placeholder: "22",
    required: true,
  },
  {
    label: "Quantity",
    name: "quantity",
    type: "number",
    placeholder: "99",
    required: true,
  },
  {
    label: "Sales Price",
    name: "salesPrice",
    type: "number",
    placeholder: "99.99",
    required: true,
  },
  {
    label: "Sales Start From ",
    name: "salesStartAt",
    type: "date",
  },
  {
    label: "Sales End At ",
    name: "salesEndAt",
    type: "date",
  },
  {
    label: "Product Description",
    name: "description",
    type: "text",
    as:"textarea",
    placeholder: "",
    rows: 5
  },
]
  return (
    <div>
      
      <Form
          onSubmit={hanndleOnSubmit}
          className="border p-3 mt-3 rounded shadow rounded"
        >
          <Form.Group>
      <Form.Check
              label="Status"
              name="status"
              type="switch"
              onChange={handleOnChange}
            />
      </Form.Group>
            {/* Catefory drop down */}
      <Form.Group>
        <Form.Label>Select Category</Form.Label>
        <Form.Select name="parentCategory" required onChange={handleOnChange} aria-label="Default select example">
          <option>Open this select menu</option>
          {categoryList.map((cat,i) => {
             return <option value={cat.slug} key={i}>{cat.name}</option>
          })}
          {/* <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> */}
        </Form.Select>
     
      </Form.Group>
        {inputFields.map((input) => (
            <CustomInput onChange={handleOnChange} {...input} />
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>  
        </Form>
    </div>
  );
}

export default NewProductForm;
