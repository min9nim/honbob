import { useState } from 'react'
import req from '../utils/req'
import h, { a, div, header, nav, section, span } from '../utils/hyperscript'
import { CopyOutlined } from '@ant-design/icons'
import { copyToClipboard, urlReg } from '../utils'
import { Input, message, notification, Skeleton } from 'antd'
import QrCode from '../components/QrCode'
import './index.scss'

const { Search } = Input

export default () => {
  const [miniUrl, setMiniUrl] = useState(null)
  const [loading, setLoading] = useState(false)

  const minimize = async value => {
    if (!value.trim()) {
      // notification.warning({ message: 'URL is empty' })
      return
    }
    if (!urlReg.test(value)) {
      notification.warning({ message: 'URL is not valid' })
      return
    }
    try {
      setLoading(true)
      const { miniUrlId } = await req.post('/api/url?action=create', {
        url: value,
      })
      window.$logger.debug('res', miniUrlId)
      setMiniUrl(window.location.origin + '/' + miniUrlId)
    } catch (e) {
      notification.warning({ message: e.message })
    } finally {
      setLoading(false)
    }
  }

  function copy(value) {
    copyToClipboard(value)
    message.success('링크 복사 완료')
  }

  return div('.index', [
    header([div('.title', ['Minimize your URL :)'])]),
    section([
      div('.desc', ['Paste the URL to be shortened.']),
      div('.input', [
        h(Search, {
          loading,
          autoFocus: true,
          allowClear: true,
          placeholder: 'https://',
          enterButton: 'Minimize',
          size: 'large',
          onSearch: minimize,
        }),
      ]),
      (miniUrl || loading) &&
        h(Skeleton, { loading }, [
          div('.result', [
            h(QrCode, { value: miniUrl }),
            div('.link', [
              nav([a({ href: miniUrl }, [miniUrl])]),
              span('.copy', { onClick: () => copy(miniUrl) }, [
                h(CopyOutlined, ['링크복사']),
              ]),
            ]),
          ]),
        ]),
    ]),
  ])
}
