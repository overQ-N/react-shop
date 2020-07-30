import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card, Input, Table, Button, Row, Col, Select ,Modal, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import { reqGoods, reqGoodsById, removeGoodsById} from '@/http/product'
import getColumns from './config/productColumns'

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {
        query: '',
        pagesize: 10,
        pagenum: 1,
        total: 0,
        id:''
      },
      goods: [],
      columns: [],
      searchType: 0,
      loading:false
    }
  }
  componentDidMount() {
    this._reqGoods()
    const columns = getColumns(this)
    this.setState({ columns })
  }
  _reqGoods = async () => {
    this.setState({loading:true})
    const { data: res } = await reqGoods(this.state.query)
    if (res.meta.status !== 200) return
    const { query } = this.state
    const goods = res.data.goods
    query.total = res.data.total
    this.setState({
      query,
      goods,
      loading:false
    })
  }
  pagination = () => {
    return {
      showSizeChanger: true,
      showQuickJumper: true,
      total: this.state.query.total,
      showTotal: total => `共${total}条`,
      onChange: this.handlePageChange,
      onShowSizeChange: this.handleSizeChange
    }
  }
  // 编辑商品
  editRow = (row) =>{
    
  }
  // 删除商品
  delRow=(row) =>{
    Modal.confirm({
      title: '确认删除？',
      onOk:async () => {
        const { data: res } = await removeGoodsById(row.goods_id)
        if (res.meta.status !== 200) return
        message.success("删除成功")
        this._reqGoods()
      }
    })
  }
  // 查找商品
  handleSearch = (value) => {
    const { query } = this.state
    // 通过名称查找
    if (this.state.searchType === 0) {
      query.query = value
      this.setState({ query })
      this._reqGoods()
    }
    // 通过id查找
    if (this.state.searchType === 1) {
      query.query = ''
      query.id = value
      this.setState({ query })
      this._reqGoodsById()
    }
  }
  // 通过id查找商品
  _reqGoodsById = async() => {
    const { data: res } = await reqGoodsById(this.state.query.id)
    if (res.meta.status !== 200) return
    const { query } = this.state
    query.total=1
    this.setState({
      goods: [res.data],
      query
    })
  }
  handleSelect = (value) => {
    this.setState({searchType:value})
  }
  handlePageChange = (page) => {
    const { query } = this.state
    query.pagenum = page
    this.setState({ query })
    this._reqGoods()
  }
  handleSizeChange = (current, size) => {
    const { query } = this.state
    query.pagesize = size
    this.setState({ query })
    this._reqGoods()
  }
  render() {
    const { goods, columns, searchType, loading} = this.state
    const cartTitle = (
      <Row>
        <Col span={10}>
          <Select defaultValue={searchType} onSelect={this.handleSelect}>
            <Select.Option value={0}>按名称查找</Select.Option>
            <Select.Option value={1}>商品编号查找</Select.Option>
          </Select>
          <Input.Search enterButton placeholder='输入商品搜索' onSearch={this.handleSearch}></Input.Search>
        </Col>
      </Row>)
    return (
      <Card title={cartTitle} extra={(<Link to='/product/add' style={{ color: '#fff' }}><Button type='primary' icon={<PlusOutlined />}>添加商品</Button></Link>)}>
        <Table
          dataSource={goods}
          columns={columns}
          rowKey='goods_id'
          size='small'
          loading={loading}
          bordered
          pagination={this.pagination()}
        />
      </Card>
    );
  }
}

export default Product;
