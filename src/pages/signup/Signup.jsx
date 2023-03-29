import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./signup.scss";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const navigate = useNavigate();
  const notify = () => toast("Email is already exist!");

  const onFinish = (values) => {
    console.log("Success:", values);
    const existingData = JSON.parse(localStorage.getItem("sign-up-data"));
    console.log(existingData);
    let newData;
    if (existingData) {
      console.log(existingData, "existing Data");
      let allEmail = existingData.map((user) => user.email);
      console.log(allEmail);
      if (allEmail.includes(values.email)) {
        notify();
      } else {
        newData = [...existingData, values];
        localStorage.setItem("sign-up-data", JSON.stringify(newData));
        navigate("/login")
      }
    } else {
      newData = [values];
      console.log(newData);
      localStorage.setItem("sign-up-data", JSON.stringify(newData));
      navigate("/login");
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signup-main">
      <ToastContainer />
      <div className="signup-card">
        <div className="login-title">Sign Up</div>
        <div>
          <Form
            name="signupform"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="login-username">
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please enter your name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Name"
                  className="custom-input"
                />
              </Form.Item>
            </div>
            <div className="login-username">
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Email"
                  className="custom-input"
                />
              </Form.Item>
            </div>
            <div className="login-password">
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                  {
                    min: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  {
                    pattern:
                      /^(?=.*?[A-Z])(?=.*?[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/,
                    message:
                      "Password must contain at least one uppercase letter and one special character",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<KeyOutlined />}
                  placeholder="Password"
                  className="custom-input"
                />
              </Form.Item>
            </div>
            <div className="login-password">
              <Form.Item
                name="confirm"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Confirm Password"
                  prefix={<KeyOutlined />}
                  className="custom-input"
                />
              </Form.Item>
            </div>
            <div className="login-btn">
              <Button
                type="primary"
                htmlType="submit"
                block
                danger
                size="large"
              >
                Submit
              </Button>
            </div>
          </Form>
          <div
            style={{ textAlign: "center", paddingTop: "10px", color: "white" }}
          >
            Already have an account ?
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
              className="link"
            >
              {" "}
              Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
