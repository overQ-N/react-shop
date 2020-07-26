import React from 'react';
import {Button,Switch} from 'antd'
const columns = (_this) => {
  return [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, row, index) => `${index + 1}`
    },
    {
      title: '用户名称',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'mg_state',
      key: 'mg_state',
      render: (text, scope) => {
        return (<Switch checked={scope.mg_state} onChange={() => { _this.handleSwitchChange(scope) }}></Switch>)
      }
    },
    {
      title: '操作',
      key: 'operation',
      dataIndex: 'operation',
      render: (text,row) => {
        return (
          <div className='cell-btns'>
            <Button size='small' type='link' onClick={() => _this.editRow(row)}>【编辑】</Button>
            <Button size='small' type='link' onClick={()=>_this.delRow(row)}>【删除】</Button>
            <Button size='small' type='link' onClick={() => _this.assignRole(row)}>【分配角色】</Button>
          </div>
        )
      }
    },
  ]
}
export default columns
