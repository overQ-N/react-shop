import React from 'react';
import { Tag, Button } from 'antd';
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

// 角色表格column配置
export const roleColumns = (_this) => [
  
  {
    dataIndex: 'index',
    title:'序号',
    render:(title,row,index)=>index+1
  },
  {
    dataIndex: 'roleName',
    title:'角色名称'
  },
  {
    dataIndex: 'roleDesc',
    title: '角色描述',
  },
  {
    dataIndex: 'action',
    title: "操作",
    render: (title, row) => (
      <div className='cell-btns'>
        <Button onClick={()=>_this.editRow(row)} type='link'>【编辑】</Button>
        <Button onClick={() => { _this.delRow(row) }} type='link'>【删除】</Button>
        <Button onClick={() => { _this.assignRow(row) }} type='link'>【分配权限】</Button>
      </div>
    )
  }
]
