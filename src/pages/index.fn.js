import req from '../utils/req'
import { prop } from 'ramda'

export const getLocations = async list => {
  const locations = await Promise.all(
    list.map(user => req.post(`/api/location`, { ip: user.ip }).then(prop('result'))),
  )
  return locations
}
