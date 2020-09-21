import req from '../utils/req'

export const getLocations = async (list) => {
  const locations = await Promise.all(
    list.map(user =>
      req.get(
        `//api.ipstack.com/${user.ip}?access_key=4448b8b2be662b3927372b0c185b30d7&format=1`,
      ),
    ),
  )
  return locations
}
