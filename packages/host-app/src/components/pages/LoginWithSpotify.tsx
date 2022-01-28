import buildUrl from 'build-url';

const spotifyAuthBaseUrl = 'https://accounts.spotify.com';
const spotifyAuthPath = 'authorize';
const scopes = [
    'user-modify-playback-state',
];
const responseCode = 'code';

export const LoginWithSpotify = () => {

    const redirectToSpotify = (): undefined => {
        const url = buildUrl(spotifyAuthBaseUrl, {
            path: spotifyAuthPath,
            queryParams: {
                'client_id': process.env.REACT_APP_SPOTIFY_CLIENT_ID as string,
                'response_type': responseCode,
                'redirect_uri': process.env.REACT_APP_SPOTIFY_CALLBACK as string,
                'scope': scopes
            }
        });

        window.location.href = url;
        return undefined;
    };

    const onClickConnectToSpotify = () => {
        redirectToSpotify();
    }

    return (
        <button onClick={onClickConnectToSpotify}>Login with Spotify</button>
    )
};
