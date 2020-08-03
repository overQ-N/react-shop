import React from 'react';
import { Button, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined,} from '@ant-design/icons'
const columns = (_this) => {
  return [
    {
      dataIndex: 'index',
      title: '序号',
      key:'index',
      render:(title,row,index)=> index+1
    },
    {
      dataIndex: 'cat_name',
      // key:'cat_name',
      title:'分类名称'
    },
    {
      dataIndex: 'cat_deleted',
      key:'cat_deleted',
      title: '是否有效',
      // 
      render: (title, row) => {
        return !row.cat_deleted ? < CheckCircleOutlined style={{ color: '#1890ff' }} /> : <CloseCircleOutlined style={{ color:'#ff4d76'}}/>
      }
    },
    {
      dataIndex: 'cat_level',
      key:'cat_level',
      title: '等级',
      render: (record, row) => {
        if (row.cat_level === 0) {
          return <Tag color="#108ee9">一级</Tag>
        } else if (row.cat_level === 1) {
          return <Tag color="#2db7f5">二级</Tag>
        } else if (row.cat_level === 2) {
          return <Tag color="#87d068">三级</Tag>
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      index:'action',
      render: (scope, row) => (
        <span className='cell-btns'>
          <Button type='link' onClick={() => { _this.editRow(row)}}>【编辑】</Button>
          <Button type='link' onClick={()=>{_this.delRow(row)}}>【删除】</Button>
        </span>
      )
    }
  ]
}
export default columns
