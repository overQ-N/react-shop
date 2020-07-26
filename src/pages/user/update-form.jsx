import React,{memo} from 'react';
import PropTypes from 'prop-types'
import { Modal, Input, Form,message } from 'antd'
import { reqUpdateUser} from '@/http/user'
const Item = Form.Item
const UpdateForm = props => {
  UpdateForm.propTypes = {
    formType: PropTypes.string,
    closeForm: PropTypes.func.isRequired,
    editRow: PropTypes.object.isRequired,
    getList:PropTypes.func
  }
  const { formType, closeForm, editRow } = props
  const [form] = Form.useForm()
  props.setForm(form)
  const handleCancel = () => {
    closeForm('close')
  }
  const onFinish = async (values) => {
    values.id = editRow.id
    const { data: res } = await reqUpdateUser(values)
    if (res.meta.status !== 200) return message.error('更新失败')
    message.success('更新成功')
    props.getList()
    closeForm('close')
  }
  const checkPhone = (rule, value) => {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      return Promise.reject('请输入正确的手机格式')
    }
    return Promise.resolve()
  }
  return (
    <Modal visible={formType === 'update'} onCancel={handleCancel} title='编辑用户' onOk={form.submit} getContainer={false}>
      <Form labelCol={{ span: 4 }} form={form} onFinish={onFinish} initialValues={editRow}>
        <Item label='用户名' mobile='username'>
          <Input value={editRow.username} disabled></Input>
        </Item>
        <Item label='邮箱' name='email' rules={[{type:'email'}]}>
          <Input value={editRow.email} type='email'></Input>
        </Item>
        <Item label='手机号码' name='mobile' rules={[{validator:checkPhone}]}>
          <Input value={editRow.mobile} ></Input>
        </Item>
      </Form>
    </Modal>
    );
}
 
export default memo(UpdateForm);


