import React from "react";
import "./signin.scss";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Signin = () => {
  const onFinish = (values) => {
    // console.log("Success:", values);
    const jsonData = JSON.stringify(values);
    console.log(jsonData)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-main">
      <div className="login-card">
        <div className="login-title">Sign In</div>
        <div>
          <Form
            name="siginform"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="login-username">
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your Email!",
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
            <div className="remember">
              <Checkbox className="remmberme">Remember me</Checkbox>
              <Link to="/" className="link1">Forget Password</Link>
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
            style={{ textAlign: "center", paddingTop: "10px", color: "white", fontWeight:'200' }}
          >
            Need an account?
            <Link
              to="/signup"
              style={{ textDecoration: "none", color: "white",fontWeight:'200' }}
              className="link"
            >
              {" "}
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
