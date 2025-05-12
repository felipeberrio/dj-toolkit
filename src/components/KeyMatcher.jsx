import { useState } from 'react'

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

function KeyMatcher() {
  const [selectedKey, setSelectedKey] = useState('')
  const matches = camelotWheel[selectedKey] || []

  return (
    <div className="tool-card">
      <h2>🎼 Key Matcher</h2>
      <select value={selectedKey} onChange={(e) => setSelectedKey(e.target.value)}>
        <option value="">Selecciona una tonalidad</option>
        {Object.keys(camelotWheel).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      {selectedKey && (
        <div>
          <p>🔑 Tonalidades compatibles con <strong>{selectedKey}</strong>:</p>
          <ul>
            {matches.map((key) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default KeyMatcher
