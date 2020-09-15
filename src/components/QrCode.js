import { useEffect, useRef } from 'react'
import h, { a, div, img } from '../utils/hyperscript'
import { DownloadOutlined } from '@ant-design/icons'
import { go } from 'mingutils'
import QRCode from 'qrcode'
import { last, split } from 'ramda'
import './QrCode.scss'

export default function QrCode({ value }) {
  const imgEl = useRef(null)
  const downloadEl = useRef(null)

  useEffect(() => {
    QRCode.toDataURL(
      encodeURI(value),
      {
        errorCorrectionLevel: 'H',
        type: 'image/jpeg',
        quality: 0.3,
        margin: 1,
        color: {
          dark: '#000',
          light: '#FFF',
        },
      },
      (err, url) => {
        if (err) throw err
        imgEl.current.src = url
        downloadEl.current.href = url
      },
    )
  })

  // return (
  //   <div className="image">
  //     <img ref={imgEl} />
  //     <div className="download">
  //       <a ref={downloadEl} download={go(value, split('/'), last) + '.jpg'}>
  //         <DownloadOutlined /> 다운로드
  //       </a>
  //     </div>
  //   </div>
  // )
  return div('.image', [
    img({ ref: imgEl }),
    div('.download', [
      a(
        {
          ref: downloadEl,
          download: go(value, split('/'), last) + '.jpg',
        },
        [h(DownloadOutlined), '다운로드'],
      ),
    ]),
  ])
}
