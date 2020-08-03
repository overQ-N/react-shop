import React, { Component } from 'react';
import { SlackOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button,message } from 'antd'
import './index.less'
import { reqLogin } from '@/http'
import logo from '../../logo.svg'
import memory from '@/utils/memory'
import storage from '@/utils/storage'
import { Redirect } from 'react-router-dom';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  onFinish = (values) => {
    reqLogin(values).then(({data:res}) => {
      if (res.meta.status === 200) {
        // 保存用户信息
        memory.user = res.data
        storage.set('user',res.data)
        this.props.history.replace('/')
        message.success('登录成功')
      } 
    })
  }
  checkUserName = (_, value) => {
    if (value.length < 5) {
      return Promise.reject('用户名不能小于5位')
    }
    return Promise.resolve()
  }
  render() {
    if (memory.user && memory.user.id) {
      return <Redirect to='/'></Redirect>
    }
    return (
      <div className='login'>
        <div className="login-header">
          <span className='icon'><SlackOutlined /></span>
          <h2>后台管理系统</h2>
        </div>
        <div className="login-body">
          <div className="login-body-logo-wraper">
            <img src={logo} className='login-body-logo' alt="" />
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <h2>欢迎使用</h2>
            <Form.Item
              name="username"
              className='login-form-item'
              rules={[{ required: true, message: '请输入用户名' },
              { validator: this.checkUserName }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              className='login-form-item'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
