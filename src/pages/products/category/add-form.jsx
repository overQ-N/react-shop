import React,{Component} from 'react';
import { Modal, Form, Input, Cascader, message  } from 'antd';
import { getCategories,addCategory } from 'http/product'
const {Item} = Form
class AddForm extends Component {
  formRef = React.createRef()
  constructor(props) {
    super(props); 
    this.state = { 
      categories: [],
      fieldNames: {
        label: 'cat_name',
        value:'cat_id'
      }
    }
  }
  componentDidMount() {
    // 获取二级分类列表
    this.getList(2)
  }
  // 获取分类列表
  getList = async(type) => {
    const { data: res } = await getCategories({ type })
    if (res.meta.status !== 200) return
    this.setState({
      categories: res.data,
    })
  }
  onFinish = async (values) => {
    if (values.cat_pid instanceof Array && values.cat_pid.length === 0) {
      values.cat_pid = ''
    }
    // 如果选中了父级分类
    if (values.cat_pid) {
      values.cat_pid = values.cat_pid[values.cat_pid.length - 1]
      values.cat_level = values.cat_pid
    } else {
      // 没有选择父级分类，则为一级分类
      values.cat_pid = 0
      values.cat_level = 0
    }
    const { data: res } = await addCategory(values)
    if (res.meta.status !== 201) return
    message.success('添加分类成功')
    this.props.closeForm()
  }
  onOk = () => {
    this.formRef.current.submit()
  }
  onCancel = () => {
    this.props.closeForm()
  }
  render() { 
    const { modalType } = this.props
    const {fieldNames,categories}  =this.state
    return ( 
      <Modal visible={modalType==='add'}  onCancel={this.onCancel} title='添加分类' onOk={this.onOk}>
        <Form labelCol={{ span: 6 }} ref={this.formRef} onFinish={this.onFinish}>
          <Item label='新增分类名称' rules={[{required:true}]} name='cat_name'>
            <Input />
          </Item>
          <Item name='cat_pid' label='选择父级分类'>
            <Cascader
              fieldNames={fieldNames}
              options={categories}
              placeholder='请选择父级分类'
              showSearch={true}
              changeOnSelect
              expandTrigger='hover'
            />
          </Item>
        </Form>
      </Modal>
     );
  }
}
 
export default AddForm;
