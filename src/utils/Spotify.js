let accessToken
const clientId = "c9facf4799e2437eadc26e8cc1128aa9"
const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken
        }
        const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (newAccessToken && newExpiresIn) {
            accessToken = newAccessToken[1]
            const expiresIn = Number(newExpiresIn[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const redirect_uri = "http://localhost:3000/"
            const accessUri = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&show_dialog=true&redirect_uri=${redirect_uri}`;
            window.location = accessUri;
        }
    }
}

export default Spotify