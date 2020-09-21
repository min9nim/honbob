import useSWR from 'swr'
import req from '../utils/req'

export default () => {
  const { data, error, isValidating, mutate } = useSWR('/api/list', req.get)

  return {
    data: data?.result || [],
    loaded: data || error,
    isValidating,
    mutate,
  }
}
