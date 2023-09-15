import React, { useState } from 'react'
import AdminLayout from '../../component/layout/AdminLayout'

import { Button, Form } from 'react-bootstrap';
import CustomInput from '../../component/customInput/CustomInput';
import { createNewAdminUser } from '../../redux/auth/UserAction';
import { useDispatch } from 'react-redux';

function Register() {
  const [form, setForm] = useState({})
  const dispatch = useDispatch();
  const inputs = [
    
    {
      label: "First Name",
      name: "fName",
      type: "text",
      placeholder: "Sam",
      required: true,
    },
    {
      label: "Last Name",
      name: "lName",
      type: "text",
      placeholder: "Smith",
      required: true,
    },
    {
      label: "Phone Number",
      name: "phone",
      type: "number",
      placeholder: "046xxxxxx",
      required: true,
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "sam@gmail.com",
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "******",
      required: true,
    },
    {
      label: "Confirm Password",
      name: "cPassword",
      type: "password",
      placeholder: "******",
      required: true,
    },
    
  ];
  const handleOnChange = (e)=>{
    const {name, value } = e.target;
    setForm({
      ...form,
      [name]:value,
    })
    
  }
  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data", form);
    dispatch(createNewAdminUser(form));
  };
  return (
    <div>
      <AdminLayout title="Register Admin">
      <Form onSubmit={handleOnSubmit} className="login p-5 mt-5 border rounded shadow">
          {inputs.map((input) => (
            <CustomInput onChange={handleOnChange} {...input} />
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </AdminLayout>
    </div>
  )
}

export default Register