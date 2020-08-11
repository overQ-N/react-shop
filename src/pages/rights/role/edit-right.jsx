import React, { Component } from 'react';
import { Modal, Form, Input, message } from 'antd';
import { editRole, addRole } from 'http/rights'
const { Item } = Form
class EditRight extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props);
    this.state = { 
      editRow:{}
    }
  }
  onCancel = () => {
    this.props.closeModal('close')
  }
  onOk = async () => {
    this.formRef.current.submit()
    // 编辑
    if (this.props.modalType === 'edit') {
      const { data: res } = await editRole(this.props.editRow.id, this.formRef.current.getFieldsValue())
      if (res.meta.status !== 200) return
      message.success('编辑成功')
    } else { //添加
      const { data: res } = await addRole(this.formRef.current.getFieldsValue())
      if (res.meta.status !== 201) return
      message.success('添加成功')
    } 
    
    this.props.closeModal('close')
  }
  render() { 
    const { visible, modalType } = this.props
    const { editRow } = this.state
    setTimeout(() => { this.props.setForm(this.formRef.current)},25)
    return ( 
      <Modal visible={visible} title={modalType==='edit'?'编辑角色':'添加角色'} onCancel={this.onCancel} onOk={this.onOk} >
        <Form ref={this.formRef} initialValues={editRow}  labelCol={{span:5}}>
          <Item label='角色名称' name='roleName' rules={[{required:true}]}>
            <Input ></Input>
          </Item>
          <Item label='角色描述' name='roleDesc'>
            <Input></Input>
          </Item>
        </Form>
      </Modal>
     );
  }
}
 
export default EditRight;
