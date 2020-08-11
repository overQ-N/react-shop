import React, { Component } from 'react';
import { Modal, Tree,message } from 'antd';
import { getRights, assignRights } from 'http/rights'
class AssignRight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],
      rights:[],//所有权限列表
    }
  }
  async componentDidMount() {
    const { data: res } = await getRights('tree')
    if (res.meta.status !== 200) return
    const rights = this.recursizeFn(res.data)
    this.setState({
      rights
    })
  }
  onCancel = () => {
    this.props.closeModal('close')
  }
  onOk = async() => {
    const { data: res } = await assignRights(this.props.editRow.id, this.state.checkedKeys.join(','))
    if (res.meta.status !== 200) return
    message.success(res.meta.msg)
    this.props.closeModal('close')
  }
  recursizeFn = (children) => {
    return children.map(item => {
      if (item.children) {
        this.recursizeFn(item.children)
      }
      item.title = item.authName
      item.key = item.id
      return item
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.convertTreeData(this.props.editRow)
    }
  }
  convertTreeData = (editRow) => {
    if (!editRow.children) return
    const checkedKeys = []
    editRow.children.forEach(item => {
      if (item.children) {
        item.children.forEach(cItem => {
          if (cItem.children) {
            cItem.children.forEach(subItem => {
              checkedKeys.push(subItem.id)
            })
          }
        })
      }
    })
    this.setState({
      checkedKeys
    })
  }
  onCheck = async (checkedKeys) => {
    
    this.setState({
      checkedKeys
    })
  }
  render() {
    const { visible } = this.props
    const {  checkedKeys,rights } = this.state
    return (
      <Modal visible={visible} title='分配权限' onCancel={this.onCancel} onOk={this.onOk}>
        <Tree treeData={rights} checkable defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        ></Tree>
      </Modal>
    );
  }
}

export default AssignRight;
