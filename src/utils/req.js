const API_SERVER = process.env.REACT_APP_API_URL

console.log('API_SERVER', API_SERVER)

export default async function req(path, option) {
  const url = API_SERVER + path
  const res = await fetch(url, option)
  if (!res.ok) {
    throw new Error(url + ' [' + res.status + ']')
  }
  const result = await res.json()
  if(result.status !== 'ok'){
    throw Error(result.message)
  }
  return result
}

req.get = path => req(path, { method: 'GET' })
req.post = (path, payload) =>
  req(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
