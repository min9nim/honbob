import React from 'react'
import Loading from './components/Loading'
import Routes from './Routes'
import { LoadingProvider } from 'react-hook-loading'
import h, { div } from 'utils/hyperscript'
import 'antd/dist/antd.css'
import './App.scss'

export default function App() {
  return div('.app', h(LoadingProvider, { loading: h(Loading) }, h(Routes)))
}
