import React, { useEffect, useState } from 'react'
import Loading from './components/Loading'
import Routes from './Routes'
import { LoadingProvider } from 'react-hook-loading'
import 'antd/dist/antd.css'
import shortid from 'shortid'
import req from './utils/req'
import './App.scss'

export default function App() {
  const [state, setState] = useState('Loading..')
  const miniUrlId = window.location.pathname.slice(1)
  const forward = shortid.isValid(miniUrlId)
  window.$logger.debug({forward})

  useEffect(() => {
    if (!forward) {
      return
    }
    req('/api/url?miniUrlId=' + miniUrlId).then(({ originUrl }) => {
      if (originUrl) {
        window.location.href = originUrl
      }else{
        setState('Not found URL 😱')
      }
    })
  }, [])
  return forward ? state : (
    <div className="app">
      <LoadingProvider loading={<Loading />}>
        <Routes />
      </LoadingProvider>
    </div>
  )
}
