import { useSpotifyCredentials } from "../../contexts/spotifyCredentialsContext";


export const Home = () => {

    const { spotifyCredentials } = useSpotifyCredentials();

    return (
        <div>
            <p>Home</p>
            <p>Access token: {spotifyCredentials?.accessToken}</p>
        </div>
    );
};
