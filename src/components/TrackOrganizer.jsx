import { useState, useEffect } from 'react'

const camelotWheel = {
  '1A': ['12A', '2A', '1B'],
  '2A': ['1A', '3A', '2B'],
  '3A': ['2A', '4A', '3B'],
  '4A': ['3A', '5A', '4B'],
  '5A': ['4A', '6A', '5B'],
  '6A': ['5A', '7A', '6B'],
  '7A': ['6A', '8A', '7B'],
  '8A': ['7A', '9A', '8B'],
  '9A': ['8A', '10A', '9B'],
  '10A': ['9A', '11A', '10B'],
  '11A': ['10A', '12A', '11B'],
  '12A': ['11A', '1A', '12B'],
  '1B': ['12B', '2B', '1A'],
  '2B': ['1B', '3B', '2A'],
  '3B': ['2B', '4B', '3A'],
  '4B': ['3B', '5B', '4A'],
  '5B': ['4B', '6B', '5A'],
  '6B': ['5B', '7B', '6A'],
  '7B': ['6B', '8B', '7A'],
  '8B': ['7B', '9B', '8A'],
  '9B': ['8B', '10B', '9A'],
  '10B': ['9B', '11B', '10A'],
  '11B': ['10B', '12B', '11A'],
  '12B': ['11B', '1B', '12A'],
}

function TrackOrganizer() {
  const [tracks, setTracks] = useState([])
  const [track, setTrack] = useState({ name: '', bpm: '', key: '' })

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('djTracks')
    if (stored) {
      setTracks(JSON.parse(stored))
    }
  }, [])

  // Guardar en localStorage cada vez que tracks cambie
  useEffect(() => {
    localStorage.setItem('djTracks', JSON.stringify(tracks))
  }, [tracks])

  const handleAdd = () => {
    if (!track.name || !track.bpm || !track.key) return
    setTracks([...tracks, track])
    setTrack({ name: '', bpm: '', key: '' })
  }

  const handleDelete = (index) => {
    const updated = [...tracks]
    updated.splice(index, 1)
    setTracks(updated)
  }

  const exportToCSV = () => {
    const header = ['"Track Name"', '"BPM"', '"Key"', '"Matches"']
    const rows = tracks.map(t => [
      `"${t.name}"`,
      `"${t.bpm}"`,
      `"${t.key}"`,
      `"${camelotWheel[t.key]?.join(' | ')}"`
    ])

    const csvContent =
      '\uFEFF' + // BOM para Excel
      [header, ...rows].map(e => e.join(';')).join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', 'dj_tracks.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const sortedTracks = [...tracks].sort((a, b) => a.bpm - b.bpm)

  return (
    <div className="tool-card">
      <h2>📋 Organizador de Tracks</h2>
      <input
        placeholder="Nombre del track"
        value={track.name}
        onChange={(e) => setTrack({ ...track, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="BPM"
        value={track.bpm}
        onChange={(e) => setTrack({ ...track, bpm: parseInt(e.target.value) })}
      />
      <select
        value={track.key}
        onChange={(e) => setTrack({ ...track, key: e.target.value })}
      >
        <option value="">Key</option>
        {Object.keys(camelotWheel).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>
      <button onClick={handleAdd}>➕ Agregar</button>

      {tracks.length > 0 && (
        <button onClick={exportToCSV} style={{ marginTop: '1rem' }}>
          📤 Exportar a CSV
        </button>
      )}

      <table style={{ marginTop: '1rem', width: '100%', color: 'white' }}>
        <thead>
          <tr>
            <th>🎵 Track</th>
            <th>BPM</th>
            <th>Key</th>
            <th>Matches</th>
            <th>🗑️</th>
          </tr>
        </thead>
        <tbody>
          {sortedTracks.map((t, i) => (
            <tr key={i}>
              <td>{t.name}</td>
              <td>{t.bpm}</td>
              <td>{t.key}</td>
              <td>{camelotWheel[t.key]?.join(', ')}</td>
              <td>
                <button onClick={() => handleDelete(i)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TrackOrganizer
