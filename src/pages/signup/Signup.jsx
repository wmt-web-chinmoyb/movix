import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import "./signup.scss";
import { Link } from "react-router-dom";

const Signup = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="signup-main">
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
                <Input.Password  size="large" placeholder="Confirm Password" prefix={<KeyOutlined />} className="custom-input"/>
              </Form.Item>
            </div>
            <div className="login-btn">
              <Button type="primary" htmlType="submit" block danger size="large"> 
                Submit
              </Button>
            </div>
          </Form>
          <div style={{ textAlign: "center", paddingTop: "10px",color:"white" }}>
          Already have an account ?
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
              className="link"
            >
               {" "}Signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
