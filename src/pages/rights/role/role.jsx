import React, { Component } from 'react';
import { getRoles, delRight, delRole} from 'http/rights'
import { Card, Table, Modal, message, Button } from 'antd';
import { roleColumns } from '../config/columns'
import RoleColumnChildren from './role-column-chindren'
import EditRight from './edit-right'
import AssignRight from './assign-right'
class Role extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      roles: [],
      // 当前要删除权限的roleId
      roleId: '',
      modalType: '',
      editRow:{}
    }
  }
  componentDidMount() {
    this._getRoles()
  }
  _getRoles = async () => {
    const { data: res } = await getRoles()
    if (res.meta.status !== 200) return
    this.setState({
      roles:res.data
    })
  }
  // 分配角色
  assignRow=(row)=>{
    this.setState({
      modalType: 'assign',
      editRow: row
    })
  }
  // 编辑
  editRow = (row) => {
    setTimeout(()=>{ this.form.setFieldsValue(row)},100)
    this.setState({
      modalType: 'edit',
      editRow:row
    })
  }
  closeModal = (type = '') => {
    // 如果不是分配角色
    if (this.state.modalType !== 'assign') {
      this.form.resetFields()
    }
    this._getRoles()
    this.setState({
      modalType: type
    })
  }
  // 删除
  delRow =  (row) => {
    Modal.confirm({
      title:'确认删除该角色?',
      onOk: async () => {
        const { data: res } = await delRole(row.id)
        if (res.meta.status !== 200) return 
        message.success('删除成功')
        this._getRoles()
      }
    })
  }
  // 递归查找对应删除的tag
  cbFindDelTag = (children, rightId) => {
    children.forEach(async item => {
      if (item.id === rightId) {
        const index = children.findIndex(fItem => fItem.id === item.id)
        children.splice(index, 1)
        const { data: res } = await delRight(this.state.roleId, rightId)
        if (res.meta.status !== 200) return
        message.success('删除成功')
        return 
      } else {
        if (item.children) {
          this.cbFindDelTag(item.children, rightId)
        }
      }
    })
  }
  // 标签关闭时
  onTagClose = (rightId, roleId, e) => {
    e.preventDefault()
    this.setState({
      roleId
    })
    Modal.confirm({
      title: '确认删除? 此操作不可撤回',
      onOk: () => {
        const roles = this.state.roles
        roles.forEach(item => {
          if (item.id === roleId) {
            this.cbFindDelTag(item.children, rightId)
          }
        })
        this.setState({
          roles
        })
      },
      onCancel: () => {
        e.preventDefault()
      }
    })
  }
  render() { 
    const { roles, modalType, editRow } = this.state
    const title = (<Button type='primary' onClick={() => { this.setState({ modalType: 'add'})}}>添加角色</Button>)
    return ( 
      <Card title={title}>
        <Table
          dataSource={roles}
          columns={roleColumns(this)}
          bordered
          childrenColumnName="a"
          rowKey='id'
          expandable={{
            expandedRowRender: record => <RoleColumnChildren {...record} onTagClose={this.onTagClose}/> 
          }}
          size='small'
        />
        {/* 编辑或者添加的弹框 */}
        <EditRight
          visible={modalType === 'edit'||modalType==='add'}
          editRow={editRow}
          modalType={modalType}
          closeModal={this.closeModal}
          setForm={(form) => { this.form = form}}
        />
        {/* 分配权限的弹框 */}
        <AssignRight
          visible={modalType === 'assign'}
          editRow={editRow} closeModal={this.closeModal}
        />
      </Card>
     );
  }
}
 
export default Role;
