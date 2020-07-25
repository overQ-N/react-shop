import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import { Menu } from 'antd';
import logo from '@/logo.svg'
import './index.less'
import menuList from '@/config/menuList.jsx'
const {SubMenu}  = Menu
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      menuNodes:[]
     }
  }
  getMenuNodes = (menuList) => {
    return menuList.map(item => {
      const path = this.props.location.pathname
      if (!item.children) {
        return (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{item.title}</Link>
          </Menu.Item>
        )
      } else {
        const cItem = item.children.find(cItem => cItem.key === path)
        if (cItem) {
          this.openKey = item.key
        }
        return (
          <SubMenu key={item.key} icon={item.icon} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        )
      }
    })
  }
  componentDidMount() {
    const menuNodes = this.getMenuNodes(menuList)
    this.setState({ menuNodes})
  }
  render() { 
    const path = this.props.location.pathname
    const openKey = this.openKey
    return ( 
      <div className='left-nav'>
        <header>
          <img src={logo} alt="" />
          <h2>后台管理系统</h2>
        </header>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[path]} defaultOpenKeys={[openKey]}>
          {
            this.state.menuNodes
          }
        </Menu>
      </div>
     );
  }
}
 
export default withRouter(LeftNav);
