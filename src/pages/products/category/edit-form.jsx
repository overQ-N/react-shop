import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
const {Item} = Form
class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  onOk = () => {
    this.props.closeForm('close')
  }
  onCancel = () => {
    this.props.closeForm('close')
  }
  render() { 
    const { modalType} = this.props
    return ( 
      <Modal visible={modalType==='edit'} title='编辑分类' onOk={this.onOk} onCancel={this.onCancel}>
        <Form>
          <Item>
            <Input></Input>
          </Item>
        </Form>
      </Modal>
    );
  }
}
 
export default EditForm;
