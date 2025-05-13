// src/spotifyAPI.js
import axios from 'axios';

export async function searchTrack(query, token) {
  const res = await axios.get('https://api.spotify.com/v1/search', {
    headers: { Authorization: `Bearer ${token}` },
    params: { q: query, type: 'track', limit: 1 },
  });

  return res.data.tracks.items[0];
}

export async function getAudioFeatures(trackId, token) {
  const res = await axios.get(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return res.data;
}
