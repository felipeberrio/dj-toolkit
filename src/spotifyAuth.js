// src/spotifyAuth.js
import axios from 'axios';

export async function getAccessToken() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const token = btoa(`${clientId}:${clientSecret}`);

  try {
    const res = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${token}`,
        },
      }
    );

    console.log('🎟️ Token generado:', res.data.access_token); // Para probar
    return res.data.access_token;
  } catch (error) {
    console.error('❌ Error al generar token:', error.response?.data || error.message);
    return null;
  }
}
