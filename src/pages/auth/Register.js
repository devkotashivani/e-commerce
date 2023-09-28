import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../components/custom-input/CustomInput";
import AdminLayout from "../../components/layout/AdminLayout";
import { createNewAdminUser } from "../../redux/auth/userAction";

export default function Register() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { progress, error, success } = useSelector((state) => state.userInfo);
  const inputFields = [
    {
      label: "First Name *",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true,
    },
    {
      label: "Last Name *",
      name: "lName",
      type: "text",
      placeholder: "Sung",
      required: true,
    },
    {
      label: "Phone",
      name: "phone",
      type: "number",
      placeholder: "043xxxx",
    },
    {
      label: "Email *",
      name: "email",
      type: "email",
      placeholder: "abc@domain.com",
      required: true,
    },
    {
      label: "Password *",
      name: "password",
      type: "password",
      placeholder: "******",
      required: true,
    },
    {
      label: "Confirm Password *",
      name: "confirmPassword",
      type: "password",
      placeholder: "******",
      required: true,
    },
  ];

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", form);
    dispatch(createNewAdminUser(form));
  };
  return (
    <AdminLayout title="Register Admin">
      {progress === true && `Loading...`}
      {error === true && `Error...`}
      {success === true && `Success...`}
      <Form
        onSubmit={handleOnSubmit}
        className="login border p-5 shadow-lg rounded mt-3 mb-2"
      >
        {inputFields.map((item) => (
          <CustomInput {...item} onChange={handleOnChange} />
        ))}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </AdminLayout>
  );
}
