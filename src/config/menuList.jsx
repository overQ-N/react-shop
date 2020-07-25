// 菜单配置
import { HomeOutlined, TeamOutlined, ApartmentOutlined, DesktopOutlined, ShoppingOutlined, AppstoreAddOutlined, SnippetsOutlined } from '@ant-design/icons'
import React from 'react';
const menuList = [
  {
    title: '首页',
    key: '/home',
    icon: <HomeOutlined/>
  },
  {
    icon: <TeamOutlined />,
    title: '用户管理',
    key: '/users',
    children: [
      {
        key: '/user',
        title: '用户列表',
        icon:<AppstoreAddOutlined />
      }
    ]
  },
  {
    icon: <ApartmentOutlined />,
    title: '权限管理',
    key: '/rights',
    children: [
      {
        key: '/role',
        title: '角色列表',
        icon: <AppstoreAddOutlined />
      },
      {
        key: '/right',
        title: '权限列表',
        icon: <AppstoreAddOutlined />
      }
    ]
  },
  {
    icon: <ShoppingOutlined/>,
    title: '商品管理',
    key: '/products',
    children: [
      {
        key: '/category',
        title: '品类列表',
        icon: <AppstoreAddOutlined />
      },
      {
        key: '/param',
        title: '商品参数',
        icon: <AppstoreAddOutlined />
      },
      {
        key: '/product',
        title: '商品列表',
        icon: <AppstoreAddOutlined />
      },
    ]
  },
  {
    icon: <SnippetsOutlined />,
    title: '订单管理',
    key: '/orders',
    children: [
      {
        key: '/order',
        title: '订单列表',
        icon: <AppstoreAddOutlined />
      }
    ]
  },
  {
    icon: <DesktopOutlined />,
    key: '/reports',
    title: "数据统计",
    children: [
      {
        key: '/report',
        title: '数据报表',
        icon: <AppstoreAddOutlined />
      }
    ]
  }
]
export default menuList
