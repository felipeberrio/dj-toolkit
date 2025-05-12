import { useState } from 'react'

function BpmCalculator() {
  const [bpm, setBpm] = useState(128)

  const beatDuration = (60000 / bpm).toFixed(2)

  return (
    <div className="tool-card">
      <h2>🕒 Calculadora BPM</h2>
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(e.target.value)}
        placeholder="Introduce BPM"
      />
      <p>⏱️ Un beat dura: <strong>{beatDuration} ms</strong></p>
      <p>Loop 4 beats: {beatDuration * 4} ms</p>
      <p>Loop 8 beats: {beatDuration * 8} ms</p>
      <p>Loop 16 beats: {beatDuration * 16} ms</p>
    </div>
  )
}

export default BpmCalculator
