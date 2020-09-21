import { useEffect, useRef, useState } from 'react'
import req from '../utils/req'
import h, { div, h3, header, section } from '../utils/hyperscript'
import { Input, notification } from 'antd'
import './index.scss'
import useList from '../swrs/useList'
import { go } from 'mingutils'
import { join, map, prop } from 'ramda'

const { Search } = Input

export default () => {
  const { data: list, mutate, loaded } = useList()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState(null)
  const mapRef = useRef(null)

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
      var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(37.450701, 127.570667), //지도의 중심좌표.
        level: 14 //지도의 레벨(확대, 축소 정도)
      };

      var map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
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
      div('#map', { ref:mapRef, style: { height: '500px', marginTop: '10px' } }),
      h3({style: {marginTop: '10px'}}, ['함께하는 사람들 :)']),
      div({style: {marginTop: '10px'}}, [loaded && go(list, map(prop('name')), join(', '))]),
    ]),
  ])
}
