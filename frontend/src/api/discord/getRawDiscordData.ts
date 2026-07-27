export default async function getRawDiscordData<T>(url : string, id : string) {
  const response = await fetch(`${url}/users/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json() as T
}