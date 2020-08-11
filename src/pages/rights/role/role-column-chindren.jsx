import React, { Component } from 'react';
import { Row, Col, Tag } from 'antd'
import { CaretRightOutlined} from '@ant-design/icons'
import './role-column-children.less';
class RoleColumnChildren extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return ( 
      <>
        {this.props.children.map(item => (
          <Row key={item.id} className='item-row'>
            <Col span={5} className='item-col'>
              <Tag color='blue'
                onClose={(e) => { this.props.onTagClose(item.id,this.props.id,e) }}
                closable>{item.authName}</Tag>
              <CaretRightOutlined />
            </Col>
            <Col span={19}>
              {item.children.map(cItem => (
                <Row key={cItem.id} className='cItem-row'>
                  <Col span={5} className='cItem-col'>
                    <Tag color='green' closable onClose={(e) => { this.props.onTagClose(cItem.id, this.props.id,e)}}>{cItem.authName}</Tag>
                    <CaretRightOutlined />
                  </Col>
                  <Col span={19}>
                    {cItem.children.map(subItem => (
                      <Tag key={subItem.id} color='gold'
                        onClose={(e) => { this.props.onTagClose(subItem.id, this.props.id,e) }}
                        style={{ margin: 8 }} closable>{subItem.authName}</Tag>
                    ))}
                  </Col>
                </Row>
              ))}
            </Col>
          </Row>
        ))}
      </>
     );
  }
}
 
export default RoleColumnChildren;
