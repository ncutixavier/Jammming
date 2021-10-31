let accessToken;
let redirect_uri;
const clientId = 'c9facf4799e2437eadc26e8cc1128aa9';
const api = 'https://api.spotify.com'

if (process.env.NODE_ENV === 'development') {
  redirect_uri = 'http://localhost:3000/';
} else {
  redirect_uri = 'https://jammming-ncuti.netlify.app/';
}

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (newAccessToken && newExpiresIn) {
      accessToken = newAccessToken[1];
      const expiresIn = Number(newExpiresIn[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}`;
      window.location = accessUri;
    }
  },
  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`${api}/v1/search?type=track&q=${term}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
  savePlaylist(playlistName, trackURIs) {
    if (playlistName && trackURIs.length) {
      const accessToken = Spotify.getAccessToken();
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userID;
      let playlistID;

        return fetch(`${api}/v1/me`, {
        headers: headers,
      })
        .then((res) => {
          return res.json();
        })
        .then((jsonResponse) => {
          console.log(jsonResponse);
          userID = jsonResponse.id;

          return fetch(`${api}/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName }),
          })
            .then((res) => {
              return res.json();
            })
            .then((jsonResponse) => {
              playlistID = jsonResponse.id;
              return fetch(
                `${api}/v1/users/${userID}/playlists/${playlistID}/tracks`,
                {
                  method: 'POST',
                  headers: headers,
                  body: JSON.stringify({ uris: trackURIs }),
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((jsonResponse) => jsonResponse);
            });
        });
    } else {
      return;
    }
  },
};

export default Spotify;
