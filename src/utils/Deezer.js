let api;
if (process.env.NODE_ENV === 'development') {
  api = 'http://localhost:8005/api/v1/deezer';
} else {
  api = 'https://leave-app-sys.herokuapp.com/api/v1/deezer';
}

const Deezer = {
  search(term) {
    return fetch(`${api}/search?term=${term}`)
      .then((res) => {
        return res.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.data) {
          return [];
        }
        return jsonResponse.data.map((track) => ({
          id: track.id,
          name: track.title,
          artist: track.artist.name,
          album: track.album.title,
          uri: track.link,
        }));
      });
  },
  savePlaylist(playlistName, songs, token, userid) {
    return fetch(
      `${api}/playlist?userid=${userid}&name=${playlistName}&songs=${songs}&token=${token}`,
      {
        method: 'POST',
      }
    );
  },
};

export default Deezer;

// let accessToken;
// let redirect_uri;
// const clientId = '5a02a65751fd429285139696ea43b55b';
// const api = 'https://api.spotify.com'

// if (process.env.NODE_ENV === 'development') {
//   redirect_uri = 'http://localhost:3000/callback/';
// } else {
//   redirect_uri = 'https://jammming-ncuti.netlify.app/callback/';
// }

// const Spotify = {
//   getAccessToken() {
//     if (accessToken) {
//       return accessToken;
//     }
//     const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
//     const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
//     if (newAccessToken && newExpiresIn) {
//       accessToken = newAccessToken[1];
//       const expiresIn = Number(newExpiresIn[1]);
//       window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
//       window.history.pushState('Access Token', null, '/');
//       return accessToken;
//     } else {
//       const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}`;
//       window.location = accessUri;
//     }
//   },
//   search(term) {
//     const accessToken = Spotify.getAccessToken();
//     return fetch(`${api}/v1/search?type=track&q=${term}`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     })
//       .then((res) => {
//         return res.json();
//       })
//       .then((jsonResponse) => {
//         if (!jsonResponse.tracks) {
//           return [];
//         }
//         return jsonResponse.tracks.items.map((track) => ({
//           id: track.id,
//           name: track.name,
//           artist: track.artists[0].name,
//           album: track.album.name,
//           uri: track.uri,
//         }));
//       });
//   },
//   savePlaylist(playlistName, trackURIs) {
//     if (playlistName && trackURIs.length) {
//       const accessToken = Spotify.getAccessToken();
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       let userID;
//       let playlistID;

//         return fetch(`${api}/v1/me`, {
//         headers: headers,
//       })
//         .then((res) => {
//           return res.json();
//         })
//         .then((jsonResponse) => {
//           userID = jsonResponse.id;

//           return fetch(`${api}/v1/users/${userID}/playlists`, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify({ name: playlistName }),
//           })
//             .then((res) => {
//               return res.json();
//             })
//             .then((jsonResponse) => {
//               playlistID = jsonResponse.id;
//               return fetch(
//                 `${api}/v1/users/${userID}/playlists/${playlistID}/tracks`,
//                 {
//                   method: 'POST',
//                   headers: headers,
//                   body: JSON.stringify({ uris: trackURIs }),
//                 }
//               )
//                 .then((res) => {
//                   return res.json();
//                 })
//                 .then((jsonResponse) => jsonResponse);
//             });
//         });
//     } else {
//       return;
//     }
//   },
// };

// export default Spotify;
