import React from 'react'
import Loading from './components/Loading'
import Routes from './Routes'
import { LoadingProvider } from 'react-hook-loading'
import 'antd/dist/antd.css'
import './App.scss'

export default function App() {
  return <div className="app">
    <LoadingProvider loading={<Loading />}>
      <Routes />
    </LoadingProvider>
  </div>
}
