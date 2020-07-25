import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/es/locale/zh_CN'
import './index.css';
import App from './App.jsx';
import storage from '@/utils/storage'
import memory from '@/utils/memory'
memory.user = storage.get('user')
ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>
,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
