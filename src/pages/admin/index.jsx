import React, { Component } from 'react';
import { Layout, Breadcrumb } from 'antd';
import memory from '@/utils/memory'
import { Redirect, Route, Switch, withRouter, Link } from 'react-router-dom';
import Header from '@/components/Header'
import LeftNav from '@/components/left-nav'
import Category from '@/pages/products/category/category'
import Param from '@/pages/products/param'
import Product from '@/pages/products/product'
import AddProduct from '@/pages/products/add'
  
import User from '@/pages/user/user'
import Home from '@/pages/home'

import Role from '@/pages/rights/role/role'
import Right from '@/pages/rights/right/right'

import Order from '@/pages/orders/order'
import Report from '@/pages/reports/report'
import './index.less';
import menuList from '@/config/menuList.jsx'
const { Sider, Content, Footer } = Layout
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  // 递归获取面包屑导航条
  getBreadcrumbItem = (menuList) => {
    const path = this.props.location.pathname
    let titleList = []
    getItem(menuList)
    function getItem(menuList,pItem) {
      menuList.forEach(item => {
        if (!item.children) {
          if (item.key === path) {
            if (pItem) {
              titleList.push(
                <Breadcrumb.Item key={pItem.key}>
                  <Link to={pItem.key}>{pItem.title}</Link>
                </Breadcrumb.Item>
              )
            }
            titleList.push(
              <Breadcrumb.Item key={item.key}>
                <Link to={item.key}>{item.title}</Link>
              </Breadcrumb.Item>
            )
          } 
        } else {
          getItem(item.children,item)
        }
      })
    }
    return titleList
  }
  render() {
    const user = memory.user
    // 如果没有登录 跳转到登录页面
    if (!user || !user.id) {
      return <Redirect to='/login'></Redirect>
    }
    return (
      <div className='container'>
        <Layout>
          <Sider style={{ background:'#19233e'}}>
            <LeftNav />
          </Sider>
          <Layout>
            <Header />
            <Content className='content'>
              <Breadcrumb className='admin-breadcrumb'>
                {this.getBreadcrumbItem(menuList)}
              </Breadcrumb>
              <Switch>
                <Route path='/user' component={withRouter(User)}></Route>
                <Route path='/category' component={withRouter(Category)}></Route>
                <Route path='/home' component={Home}></Route>
                <Route path='/role' component={Role}></Route>
                <Route path='/right' component={Right}></Route>
                <Route path='/param' component={Param}></Route>
                <Route path='/product' component={Product} exact></Route>
                <Route path='/product/add' component={AddProduct}></Route>
                <Route path='/order' component={Order}></Route>
                <Route path='/report' component={Report}></Route>
                <Redirect to='/home'></Redirect>
              </Switch>
            </Content>
            <Footer style={{ background:'#0b1530'}}>footer</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default withRouter(Admin);
