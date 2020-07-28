import React from 'react';
import { Button, Tooltip } from 'antd';
import formatDate from '@/utils/formatDate'
const productColumns = (_this)=>{
  return [
    {
      dataIndex: 'index',
      key: 'index',
      title: '序号',
      width:55,
      render: (text, row, index) => index + 1
    },
    {
      dataIndex: 'goods_name',
      key:'goods_name',
      title: '商品名称',
      ellipsis: { showTitle: true},
      width: 250,
      render: (goods_name) => (
        <Tooltip placement="topLeft" title={goods_name}>
          {goods_name}
        </Tooltip>
      )
    },
    {
      key: 'goods_price',
      dataIndex:'goods_price',
      title:'商品价格'
    },
    {
      key: 'hot_mumber',
      title: '热销数量',
      dataIndex:'hot_mumber'
    },
    {
      key: 'goods_number',
      dataIndex:'goods_number',
      title:'商品数量'
    },
    {
      key: 'goods_weight',
      dataIndex:'goods_weight',
      title:'商品重量'
    },
    {
      key: 'add_time',
      dataIndex:'add_time',
      title: '创建时间',
      width:180,
      render: (text, row) => formatDate(row.add_time)
    },
    {
      title: '操作',
      key: 'action',
      dataIndex:'action',
      render: (text, row) => (
        <div className='cell-btns'>
          <Button size='small' type='link' onClick={()=>{_this.editRow(row)}}>【编辑】</Button>
          <Button size='small' type='link' onClick={()=>{_this.delRow(row)}}>【删除】</Button>
        </div>
      )
    }
  ]
}
export default productColumns
