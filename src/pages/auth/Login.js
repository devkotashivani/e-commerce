import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/custom-input/CustomInput";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import { loginAdminUser } from "../../redux/auth/userAction";

function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userInfo);
  useEffect(() => {
    if (user.uid) {
      navigate("/dashboard");
    }
  }, [user, navigate]);
  const inputFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
      placeholder: "abc@domain.com",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "******",
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
    dispatch(loginAdminUser(form));
  };
  return (
    <>
      <Header />
      <main className="main">
        <Form
          onSubmit={handleOnSubmit}
          className="login border p-5 shadow-lg rounded mt-5"
        >
          {inputFields.map((item) => (
            <CustomInput {...item} onChange={handleOnChange} />
          ))}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </main>
      <Footer />
    </>
  );
}

export default Login;
