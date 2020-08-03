import React from 'react';
import PropsType from 'prop-types'
import { Modal, Input, Select, Form, message } from 'antd'
import { reqRoleList, reqAssignRole } from '@/http/user'
const Option = Select.Option
const Item = Form.Item
class AssignForm extends React.Component {
  formRef = React.createRef()
  static propsType = {
    formType: PropsType.string.isRequired,
    setAssignForm: PropsType.func.isRequired,
    assignRow: PropsType.object.isRequired,
    closeForm: PropsType.func
  }
  constructor(props) {
    super(props);
    this.state = {
      roles:[]
    }
  }
  componentDidMount() {
    this.reqRole()
  }
  shouldComponentUpdate(nextProps, props) {
    if (nextProps.formType === 'assign' || nextProps.formType === 'close') {
      return true
    }
    return false
  }
  // 获取角色列表
  reqRole = async () => {
    const { data: res } = await reqRoleList()
    if (res.meta.status === 200) {
      this.setState({
        roles:res.data
      })
    }

  }
  onCancel = () => {
    this.props.closeForm('close')
  }
  onFinish = async (values) => {
    const { data: res } = await reqAssignRole(this.props.assignRow.id, values)
    if (res.meta.status !== 200) return
    message.success('操作成功')
    this.props.closeForm('close')
    this.props.getList()
  }
  onOk = () => {
    this.formRef.current.submit()
  }
  render() {
    const {roles} = this.state
    return (
      <Modal visible={this.props.formType === 'assign'}
        title='分配角色'
        getContainer={false}
        onCancel={this.onCancel}
        onOk={this.onOk}
      >
        <Form labelCol={{ span: 5 }} ref={this.formRef} initialValues={this.props.assignRow} onFinish={this.onFinish}>
          <Item label='用户名称'>
            <Input value={this.props.assignRow.username} disabled></Input>
          </Item>
          <Item label='当前角色'>
            <Input value={this.props.assignRow.role_name} disabled></Input>
          </Item>
          <Item label='分配新角色' name='rid' rules={[{required:true}]}>
            <Select showSearch>
              {roles.map(item => <Option key={item.id} value={item.id}>{item.roleName}</Option>)}
            </Select>
          </Item>
        </Form>
      </Modal>
    );
  }
}

export default AssignForm;

