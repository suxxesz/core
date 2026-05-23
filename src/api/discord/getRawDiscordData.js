export default async function getRawDiscordData(url, id) {
  const response = await fetch(`${url}/users/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json()
}