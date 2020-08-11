import React,{useState,useEffect} from 'react';
import { Steps, Button, Space, Form, Input, Cascader ,message} from 'antd'
import './add.less'
import { getCategories, addGood} from 'http/product'
const { Step } = Steps
const { Item } = Form


const Add = (props) => {
  const [form] = Form.useForm()
  const [current, setCurrent] = useState(0)
  const [goodsInfo, setGoodsInfo] = useState({
    goods_name: '',
    goods_price: '',
    goods_number: '',
    goods_weight: '',
    goods_cat:''
  })
  const [disabled, setDisabled] = useState(false)
  const [categories,setCategories] = useState([])
  useEffect(() => {
    _getCategories()
  }, [])
  // 获取分类列表
  const _getCategories = async () => {
    const { data: res } = await getCategories({ type: 3 })
    if (res.meta.status !== 200) return
    setCategories(res.data)
  }
  // 判断表单是否填写完整，才可进行下一步
  useEffect(() => {
    let disabled = false
    for (const key in goodsInfo) {
      if (goodsInfo[key] === '') {
        disabled = true
      }
    }
    disabled||form.submit()
    setDisabled(disabled)
  }, [goodsInfo,form])
  // 上一步
  const pre = () => {
    setCurrent(current-1)
  }
  // 下一步
  const next = () => {
    setCurrent(current+1)
  }
  // 完成
  const success = async() => {
    const { data: res } = await addGood(goodsInfo)
    if (res.meta.status !== 201) return
    message.success('添加成功')
  }
  // 
  const handleChange = (e) => {
    let good = { ...goodsInfo }
    // 如果选中的是分类
    if (e instanceof Array) {
      good.goods_cat = e.join(',')
    } else {
      good[e.target.name] = e.target.value
    }
    setGoodsInfo(good)
  }

  useEffect(() => {
    
  })
  // 点击步骤条
  const handleStepChange = (current) => {
    if (disabled) return message.error('请填写完整表单')
    setCurrent(current)
  }
  const steps = [
    {
      title: '基本信息',
      content: (
        <Form layout='vertical' form={form}>
          <Item label='商品名称' name='goods_name' rules={[{ required: true }]}>
            <Input name='goods_name' onChange={handleChange}></Input>
          </Item>
          <Item label='商品价格' name='goods_price' rules={[{ required: true }]}>
            <Input name='goods_price' onChange={handleChange}></Input>
          </Item>
          <Item label='商品数量' name='goods_number' rules={[{ required: true }]}>
            <Input name='goods_number' onChange={handleChange}></Input>
          </Item>
          <Item label='商品重量' name='goods_weight' rules={[{ required: true }]}>
            <Input name='goods_weight' onChange={handleChange}></Input>
          </Item>
          <Item label='分类参数' name='goods_cat'>
            <Cascader name='goods_cat'
              fieldNames={{ label: 'cat_name', value: 'cat_id' }}
              options={categories} onChange={handleChange}></Cascader>
          </Item>
        </Form>
      )
    },
    {
      title: '商品参数',
      content: '商品参数'
    },
    {
      title: '商品属性',
      content: '商品属性'
    },
    {
      title: '基本信息',
      content: '基本信息'
    },
    {
      title: '商品图片',
      content: '商品图片'
    },
    {
      title: '商品内容',
      content: '商品内容'
    },
    {
      title: '完成',
      content: '完成'
    }
  ]
  return ( 
    <div>
      <Steps size='small' current={current} onChange={handleStepChange} className='steps'>
        <Step className='step-item' title='基本信息'></Step>
        <Step className='step-item' title='商品参数'></Step>
        <Step className='step-item' title='商品属性'></Step>
        <Step className='step-item' title='商品图片'></Step>
        <Step className='step-item' title='商品内容'></Step>
        <Step className='step-item' title='完成'></Step>
      </Steps>
      <div className='steps-content'>
        {steps[current].content}
      </div>
      <div className="steps-actions">
        <Space className='steps-space'>
          {
            current > 0 && (<Button onClick={pre}>上一步</Button>)
          }
          {
            current < steps.length - 1 && (<Button type='primary' onClick={next} disabled={disabled}>下一步</Button>)
          }
          {
            current === steps.length - 1 && (<Button onClick={success} type='primary'>完成</Button>)
          }
        </Space>
      </div>
    </div>
   );
}
 
export default Add;
