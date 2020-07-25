import React, { Component } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import storage from '@/utils/storage'
import memory from '@/utils/memory'
import './index.less'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  logout = () => {
    Modal.confirm({
      title: '确认退出?',
      onOk: () => {
        storage.remove('user')
        memory.user = {}
        console.log(this.props)
        this.props.history.replace('/login')
      },
      okText: '确认',
      cancelText:'取消'
    })
  }
  menu = (
    <Menu>
      <Menu.Item key='1'>个人信息</Menu.Item>
      <Menu.Item key='2' >切换用户</Menu.Item>
      <Menu.Item key='3' onClick={this.logout}>退出</Menu.Item>
    </Menu>
  )
  render() { 
    return ( 
      <div className='header'>
        <Dropdown overlay={this.menu} className='dropdown'>
          <Button type='primary'>
            {storage.get('user').username} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
     );
  }
}
 
export default withRouter(Header);
