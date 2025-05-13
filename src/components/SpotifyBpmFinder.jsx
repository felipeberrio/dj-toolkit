import { useState, useEffect } from 'react';
import { getAccessToken } from '../spotifyAuth';
import axios from 'axios';

function SpotifyBpmFinder() {
  const [trackName, setTrackName] = useState('');
  const [bpm, setBpm] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const t = await getAccessToken();
      setToken(t);
    };
    fetchToken();
  }, []);

  const handleSearch = async () => {
    if (!token || !trackName) return;
    try {
      const searchResponse = await axios.get(
        `https://api.spotify.com/v1/search`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: trackName,
            type: 'track',
            limit: 1,
          },
        }
      );

      const track = searchResponse.data.tracks.items[0];
      if (!track) {
        setError('Canción no encontrada.');
        return;
      }

      const audioFeatures = await axios.get(
        `https://api.spotify.com/v1/audio-features/${track.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBpm(audioFeatures.data.tempo);
      setError('');
    } catch (err) {
      console.error('Error al buscar BPM:', err);
      setError('Ocurrió un error al buscar.');
    }
  };

  return (
    <div className="tool-card">
      <h3>🎧 Buscar BPM con Spotify</h3>
      <input
        type="text"
        placeholder="Nombre de la canción"
        value={trackName}
        onChange={(e) => setTrackName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
      {bpm && <p>BPM estimado: {bpm}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default SpotifyBpmFinder;