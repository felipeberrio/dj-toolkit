import { useState } from 'react'

function TrackBpmFinder() {
  const [query, setQuery] = useState('')
  const [bpm, setBpm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!query) return
    setLoading(true)
    setError(null)
    setBpm(null)

    try {
      const response = await fetch(`https://api.getsongbpm.com/search/?api_key=demo&q=${encodeURIComponent(query)}`)
      const data = await response.json()
      const track = data.search?.[0]

      if (track?.bpm) {
        setBpm(track.bpm)
      } else {
        setError('No se encontró el BPM para esta canción.')
      }
    } catch {
      setError('Error al buscar el BPM.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="tool-card">
      <h2>🔍 Buscador BPM por nombre</h2>
      <input
        placeholder="Nombre del track o artista"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar BPM</button>

      {loading && <p>Buscando...</p>}
      {bpm && <p>🎧 BPM estimado: <strong>{bpm}</strong></p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default TrackBpmFinder
