import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CustomInput from "../../component/customInput/CustomInput";
import Header from "../../component/layout/Header";
import Footer from "../../component/layout/Footer";
import {loginAdminUser} from "../../redux/auth/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.uid) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const inputs = [
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "sam@gmail.com",
      required: true,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
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
    dispatch(loginAdminUser(form));
  };
  return (
    <div>
      <Header />
      <main className="main">
        <Form
          onSubmit={handleOnSubmit}
          className="login p-5 mt-5 border rounded shadow"
        >
          {inputs.map((input) => (
            <CustomInput onChange={handleOnChange} {...input} />
          ))}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </main>
      <Footer />
    </div>
  );
}

export default Login;
