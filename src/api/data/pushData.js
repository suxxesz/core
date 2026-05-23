// ← убран неверный export default = ...
// ← исправлен URL: был 'https://localhost:/4000', должно быть 'http://localhost:4000'
const pushData = async (formData) => {
  const response = await fetch('http://localhost:4000/applications', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name:      formData.name,
      email:     formData.email,
      discord_id: null,
      message:   `${formData.subname}\n\nCountry: ${formData.country || '—'}\n\n${formData.message}`,
    }),
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Server error')
  }

  return response.json()
}

export default pushData