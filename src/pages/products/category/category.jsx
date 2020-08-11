import React, { Component } from 'react';
import { Card, Button, Table ,Input, Row,Col, message, Modal} from 'antd'
import { getCategories, findCateById, removeCateById } from 'http/product'
import getColumns from '../config/categoryColumns'
import AddForm from './add-form'
import EditForm from './edit-form'
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      categories: [],
      tableLoading: false,
      modalType:''
     }
  }
  componentDidMount() {
    // 获取分类列表
    this.getList(3)
  }
  // 获取商品列表
  getList = async (type) => {
    this.setState({tableLoading:true})
    const { data: res } = await getCategories({ type })
    if (res.meta.status !== 200) return
    this.setState({
      categories: res.data,
      tableLoading:false
    })
  }
  // 编辑
  editRow=(row)=> {
    this.setState({
      modalType:'edit'
    })
  }
  // 删除
  delRow = (row) => {
    Modal.confirm({
      title: '确认删除？',
      onOk: async() => {
        const { data: res } = await removeCateById(row.cat_id)
        if (res.meta.status !== 200) return
        message.success('删除成功')
        this.getList(1)
      }
    })
  }
  addCategory = () => {
    this.setState({
      modalType:'add'
    })
  }
  // 关闭弹框
  closeForm = () => {
    this.setState({
      modalType:''
    })
  }
  // 根据id搜索分类
  onSearch = async (id) => {
    this.setState({tableLoading:true})
    const { data: res } = await findCateById(id)
    if (res.meta.status !== 200) return
    this.setState({
      // 如果id存在，则获取该id的分类信息 否则获取全部分类
      categories: id?[res.data]:res.data,
      tableLoading:false
    })
  }
  setRowKey = (record) => {
    return record.cat_id
  }
  render() { 
    const { categories, tableLoading, modalType } = this.state
    const Extra = <Button type='primary' onClick={this.addCategory}>添加分类</Button>
    const Title = (<Row>
      <Col span={10}>
        <Input.Search enterButton placeholder='根据id查找分类' onSearch={this.onSearch}></Input.Search>
      </Col></Row>)
    return ( 
      <Card title={Title} extra={Extra}>
        <Table
          loading={tableLoading}
          dataSource={categories}
          rowKey={this.setRowKey}
          bordered
          columns={getColumns(this)}
          size='small'
        />
        {/* 添加分类 */}
        <AddForm modalType={modalType} closeForm={this.closeForm} />
        
        {/* 编辑分类 */}
        <EditForm modalType={modalType} closeForm={this.closeForm}></EditForm>
      </Card>
     );
  }
}
 
export default Category;
