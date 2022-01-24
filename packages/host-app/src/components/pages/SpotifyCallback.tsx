import { useLocation, useNavigate } from "react-router-dom";
import {  } from 'react-router';
import queryString from "query-string";
import { useEffect, useState } from "react";
import { GetSpotifyTokenResponse } from "@spotify-party-vote/core";
import { SpotifyService } from "../../api/spotifyService";
import { useSpotifyCredentials } from "../../contexts/spotifyCredentialsContext";

export const SpotifyCallback = () => {

    const location = useLocation();
    const navigation = useNavigate();
    const { spotifyCredentials, setSpotifyCredentials } = useSpotifyCredentials()

    const params = queryString.parse(location.search);
    const code = params.code as string;

    const [error, setError] = useState<string>();

    const exchangeToken = async (code: string): Promise<GetSpotifyTokenResponse> => {
        return await SpotifyService.getAccessToken(code);
    }

    const handleAuth = async (code: string) => {
        const codeIsValid = code !== undefined && code !== null;
        if (!codeIsValid) {
            console.error('Invalid redirect params');
            setError('An error occurred connecting to Spotify. Please try again');
            return;
        }

        try {
            const result = await exchangeToken(code);
            setSpotifyCredentials(result);
            if (result) {
                console.log(result);
                navigation('/');
            }
        } catch (error) {
            console.error(error);
            setSpotifyCredentials(undefined);
            setError('An error occurred connecting to Spotify. Please try again.');
        }
    }

    useEffect(() => {
        handleAuth(code);
    }, [code]);

    return (
        <>
            {!error &&
                <p>Loading...</p>
            }

            {error &&
                <p>{error}</p>
            }
        </>
    );
};
