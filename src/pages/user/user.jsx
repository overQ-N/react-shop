import React, { Component } from 'react';
import { Card, Table, Button, message, Switch, Input, Row, Col } from 'antd'
import AddForm from "./add-form";
import {PlusCircleFilled} from '@ant-design/icons'
import { reqUser, reqChangeState} from '@/http/user'
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
      columns :[
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
          render:(text,scope) =>{
            return (<Switch checked={scope.mg_state} onChange={() => { this.handleSwitchChange(scope)}}></Switch>)
          }
        },
        {
          title: '操作',
          render: () => {
            return <Button>删除</Button>
          }
        },
      ]
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
    console.log(res);
    
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
  // 关闭添加用户对话框
  closeForm = (formType) => {
    this.setState({formType})
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
  render() {
    const { columns, dataSource, loading, query, formType } = this.state
    const cardTitle = (
      <Row>
        <Col span='10'>
          <Input.Search placeholder='请输入搜索内容' inputMode='search' enterButton />
        </Col>
      </Row>
    )
    const cartExtra = (<Button type='primary' onClick={this.showAddForm} icon={<PlusCircleFilled/>}>添加用户</Button>)
    return (
      <Card title={cardTitle} extra={cartExtra}>
        <AddForm formType={formType} closeForm={this.closeForm} getList={this.reqUser}></AddForm>
        <Table
          dataSource={dataSource}
          columns={columns} bordered
          rowKey='id'
          size='small'
          loading={loading}
          pagination={{
            total: query.total,
            showQuickJumper:true,
            showSizeChanger: true,
            onChange: this.paginationChange,
            onShowSizeChange:this.sizeChange
          }}
        />
      </Card>
    );
  }
}

export default User;
