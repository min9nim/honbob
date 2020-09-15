import { useEffect, useRef, useState } from 'react'
import req from '../utils/req'
import h, { div, header, section } from '../utils/hyperscript'
import { copyToClipboard } from '../utils'
import { Input, message, notification } from 'antd'
import './index.scss'
import useList from '../swrs/useList'
import { go } from 'mingutils'
import { join, map, prop } from 'ramda'

const { Search } = Input

export default () => {
  const { data: list, mutate, loaded } = useList()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(null)

  const minimize = async value => {
    if (!value.trim()) {
      return
    }
    try {
      setLoading(true)
      await req.post('/api/add', {
        name: value,
      })
      setName('')
      mutate()
    } catch (e) {
      notification.warning({ message: e.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    try {
      window.IPMapper.initializeMap('map')
      // window.IPMapper.addIPMarker("111.111.111.111");
      window.IPMapper.addIPArray(list.map(prop('ip')))
    } catch (e) {
      console.error(e)
    }
  }, [list])

  return div('.index', [
    header([div('.title', ["Let's HobBob against CORONA-19:)"])]),
    section([
      div('.desc', ['혼밥 운동에 함께 참여하길 원한다면 이름을 입력해 주세요']),
      div('.input', [
        h(Search, {
          loading,
          autoFocus: true,
          allowClear: true,
          placeholder: '이름',
          enterButton: '함께하기',
          size: 'large',
          onSearch: minimize,
          onChange: e => setName(e.target.value),
          value: name,
        }),
      ]),
      div([loaded && go(list, map(prop('name')), join(', '))]),
      div('#map', { style: { height: '500px' } }),
    ]),
  ])
}
