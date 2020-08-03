import React from 'react';
import { Tag } from 'antd';
export const rightColumns = (_this) => [
  {
    dataIndex: 'index',
    title: '序号',
    render:(title,row,index)=>index+1
  },
  {
    dataIndex: 'authName',
    title: '权限名称',
  },
  {
    dataIndex: 'path',
    title:'路径'
  },
  {
    dataIndex: 'level',
    title: '等级',
    render: (title, row) => {
      let level = row.level
      let color 
      if (level === '0') {
        level = '一级'
        color = "#108ee9"
      } else if (level === '1') {
        level = '二级'
        color = "#2db7f5"
      } else {
        level = '三级'
        color = "#87d068"
      }
      return <Tag color={color}>{level}</Tag>
    }
  }
]
