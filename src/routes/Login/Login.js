import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getToken, setToken } from '../../authorization/auth'
import axios from 'axios'
import { HOST } from '../../const'
import authService from '../../services/auth';
import 'antd'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import './Login.css'

async function loginUser(credentials) {
  try {
    const response = await axios.post(HOST + '/login',
      JSON.stringify(credentials),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const tokenObject = {
      token: response.data.session_key.token
    }
    setToken(tokenObject)
    console.log(getToken())
  } catch (err) {
    console.log("AXIOS ERROR: ", err);
  }
}

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    authService.login(JSON.stringify({
      login, password
    }))
    .then(response => {
      setToken({
        token: response.data.token
      })
      nav("/admin/");
    })
    .catch(e => {
    });

  }

  return (
    <>
      <div id="form">
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
      <Input 
        prefix={<UserOutlined className="site-form-item-icon" />} 
        placeholder="Username" 
        onChange={(e) => {setLogin(e.target.value)}}
      />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onChange={(e) => {setPassword(e.target.value)}}
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          onClick={handleSubmit}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>       
    </div> 
    </>
  )
}

export default Login;