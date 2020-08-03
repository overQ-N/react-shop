import React, { Component } from 'react';
import { getRights} from 'http/rights'
import { Card, Table } from 'antd';
import { rightColumns} from '../config/columns'
class Right extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      rights: [],
      page: {
        current: 1,
        pageSize: 20,
        total:0
      }
    }
  }
  componentDidMount() {
    this._getRights('list')
  }
  _getRights = async(type) => {
    const { data: res } = await getRights(type)
    if (res.meta.status !== 200) return
    this.setState({
      rights:res.data
    })
  }
  render() { 
    const {rights}  = this.state
    return ( 
      <Card>
        <Table
          dataSource={rights}
          rowKey='id'
          bordered
          size='small'
          pagination={{

          }}
          columns={rightColumns(this)}
        />
      </Card>
     );
  }
}
 
export default Right;
