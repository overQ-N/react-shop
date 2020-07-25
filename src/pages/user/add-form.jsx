import React from 'react';
import { Form, Input, Modal, message } from 'antd'
import { reqAddUser} from '@/http/user'
const Item = Form.Item
const AddForm = (props) => {
  const [form] = Form.useForm()
  const handleOk = () => {
    form.submit()
  }
  const handleCancel = () => {
    props.closeForm('close')
  }
  const onFinish = async (values) => {
    const { data: res } = await reqAddUser(values)
    if (res.meta.status !== 201) return message.info(res.meta.msg)
    props.getList()
    props.closeForm('close')
    message.success('添加成功')
  }
  // 验证手机号
  const checkPhone = (rule,value) => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return Promise.reject('请输入正确的手机号码')
    } 
      return Promise.resolve()
  }
  const { formType } = props
  return (
    <Modal title='添加用户' visible={formType === 'add'} onCancel={handleCancel} onOk={handleOk}>
      <Form onFinish={onFinish} form={form} labelCol={{span:4}}>
        <Item label='用户名' name='username' rules={[{required:true,message:'请输入用户名'}]}>
          <Input placeholder='请输入用户名'></Input>
        </Item>
        <Item label='密码' name='password' rules={[{required:true,message:'请输入密码'}]}>
          <Input.Password placeholder='请输入用户名'></Input.Password>
        </Item>
        <Item label='邮箱' name='email' rules={[{type:'email'}]}>
          <Input></Input>
        </Item>
        <Item label='手机号' name='mobile' rules={[{validator:checkPhone}]}>
          <Input type=''></Input>
        </Item>
      </Form>
    </Modal>
  );
}

export default AddForm;
