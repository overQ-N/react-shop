import React, { Component } from 'react';
import { Card, Table, Button, message, Modal, Input, Row, Col } from 'antd'
import AddForm from "./add-form";
import UpdateForm from './update-form'
import AssignForm from './assign-form'
import { PlusCircleFilled } from '@ant-design/icons'
import { reqUser, reqChangeState, reqDelUser } from '@/http/user'
import getColumns  from './config/columns.jsx'
class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query:{
        query: '',
        pagenum: 1,
        pagesize: 10,
        total:0
      },
      loading:false,
      dataSource:[],
      editRow: {},//当前编辑的行
      assignRow:{},//当前分配角色的行
    }
  }
  componentDidMount() {
    this.reqUser()
  }
  handleSwitchChange = async (scope) => {
    const { dataSource } = this.state
    const item = dataSource.find(item => item.id === scope.id)
    item.mg_state = !scope.mg_state
    const { data: res } = await reqChangeState(item.id, item.mg_state)
    if (res.meta.status !== 200) return message.error('请求失败')
    message.success('操作成功')
    this.setState({
      item
    })
  }
  reqUser = async () => {
    const query = this.state.query
    this.setState({loading:true})
    const { data: res } = await reqUser(query)
    if (res.meta.status !== 200) {
      return message.error('请求失败')
    }
    
    query.total = res.data.total
    
    this.setState({
      query,
      dataSource: res.data.users,
      loading: false,
    })
  }
  // 显示添加用户对话框
  showAddForm = () => {
    this.setState({
      formType:'add'
    })
  }
  // 编辑
  editRow = (row) => {
    this.updateForm.setFieldsValue(row)
    this.setState({
      formType: 'update',
      editRow:row
    })
  }
  // 删除
  delRow(row) {
    Modal.confirm({
      title: '确认删除该用户吗',
      onOk:async () => {
        const { data: res } = await reqDelUser(row.id)
        if (res.meta.status !== 200) return message.error('删除失败')
        message.success('删除成功')
        this.reqUser()
      }
    })
  }
  // 分配角色
  assignRole(row) {
    this.setState({
      assignRow: row,
      formType:'assign'
    })
  }
  // 关闭添加用户对话框
  closeForm = (formType) => {
    this.setState({ formType })
  }
  paginationChange=(current)=> {
    const { query } = this.state
    query.pagenum  = current
    this.setState({
      query
    })
    this.reqUser()
  }
  sizeChange = (current,size) => {
    const { query } = this.state
    query.pagesize = size
    this.setState({
      query
    })
    this.reqUser()
  }
  // 搜索用户
  handleInputSearch = (value) => {
    const { query } = this.state
    query.query = value
    this.setState({
      query
    })
    this.reqUser()
  }
  render() {
    const { dataSource, loading, query, formType, editRow, assignRow } = this.state
    const cardTitle = (
      <Row>
        <Col span='10'>
          <Input.Search name='query' placeholder='请输入搜索内容' inputMode='search' enterButton onSearch={this.handleInputSearch}/>
        </Col>
      </Row>
    )
    const cartExtra = (<Button type='primary' onClick={this.showAddForm} icon={<PlusCircleFilled/>}>添加用户</Button>)
    return (
      <Card title={cardTitle} extra={cartExtra}>
        {/* 添加用户 */}
        <AddForm formType={formType} closeForm={this.closeForm} getList={this.reqUser} />
        {/* 编辑用户 */}
        <UpdateForm
          formType={formType}
          closeForm={this.closeForm}
          setForm={(form) => { this.updateForm = form }}
          getList={this.reqUser}
          editRow={editRow} />
        {/* 分配角色 */}
        <AssignForm
          formType={formType}
          closeForm={this.closeForm}
          assignRow={assignRow}
          getList={this.reqUser}
        />
        <Table
          dataSource={dataSource}
          columns={getColumns(this)} bordered
          rowKey='id'
          size='small'
          loading={loading}
          pagination={{
            total: query.total,
            showQuickJumper:true,
            showSizeChanger: true,
            showTotal:total=>`共${total}条`,
            onChange: this.paginationChange,
            onShowSizeChange:this.sizeChange
          }}
        />
      </Card>
    );
  }
}

export default User;
