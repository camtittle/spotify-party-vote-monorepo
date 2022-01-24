import { createContext, Provider, ReactNode, useContext, useState } from "react";
import { GetSpotifyTokenResponse } from "@spotify-party-vote/core";

export interface SpotifyCredentialsContextType {
    spotifyCredentials?: GetSpotifyTokenResponse;
    setSpotifyCredentials: (value?: GetSpotifyTokenResponse) => void;
}

interface SpotifyCredentialsContextProviderProps {
    children: ReactNode;
}

const SpotifyCredentialsContext = createContext<SpotifyCredentialsContextType>({
    spotifyCredentials: undefined,
    setSpotifyCredentials: () => {}
});

const localStorageKey = 'SpotifyCredentials';

export const SpotifyCredentialsProvider = ({children}: SpotifyCredentialsContextProviderProps) => {

    const storeCredentials = (spotifyCredentials?: GetSpotifyTokenResponse): void => {
        if (!spotifyCredentials) {
            localStorage.removeItem(localStorageKey);
        } else {
            console.log('storing creds');
            console.log(spotifyCredentials);
            localStorage.setItem(localStorageKey, JSON.stringify(spotifyCredentials));
        }
    };

    const loadStoredCredentials = (): GetSpotifyTokenResponse | undefined => {
        const item = localStorage.getItem(localStorageKey);
        if (!item) {
            return undefined;
        }
        return JSON.parse(item);
    }

    const [context, setContext] = useState<SpotifyCredentialsContextType>({
        spotifyCredentials: loadStoredCredentials(),
        setSpotifyCredentials: (value?: GetSpotifyTokenResponse) => {
            storeCredentials(value);
            setContext((previous) => {
                return { ...previous, spotifyCredentials: value }
            });
        }
    });

    return (
        <SpotifyCredentialsContext.Provider value={context}>
            {children}
        </SpotifyCredentialsContext.Provider>
    );
}

export const useSpotifyCredentials = () => {
    return useContext(SpotifyCredentialsContext);
}
