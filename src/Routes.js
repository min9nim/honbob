import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import DynamicRoute from 'react-dynamic-route'
import Loading from './components/Loading'

export default function Routes({ user, setUser }) {
  return (
    <BrowserRouter>
      <DynamicRoute
        page={path => {
          window.$logger.info('[DynamicRoute] ' + path)
          return import('./pages' + path).then(module => module.default)
        }}
        loading={<Loading />}
        props={{
          user,
          setUser,
        }}
      />
    </BrowserRouter>
  )
}
