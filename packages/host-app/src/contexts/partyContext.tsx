import { createContext, ReactNode, useContext, useState } from "react";
import { Party } from "../models/party";

export interface PartyContextType {
    party?: Party;
    setParty: (value?: Party) => void;
}

interface PartyContextProviderProps {
    children: ReactNode;
}

const PartyContext = createContext<PartyContextType>({
    party: undefined,
    setParty: () => {}
});

const localStorageKey = 'SpotifyCredentials';

const storeParty = (party?: Party): void => {
    if (!party) {
        localStorage.removeItem(localStorageKey);
    } else {
        localStorage.setItem(localStorageKey, JSON.stringify(party));
    }
};

const loadStoredParty = (): Party | undefined => {
    const item = localStorage.getItem(localStorageKey);
    if (!item) {
        return undefined;
    }
    const parsed = JSON.parse(item) as Party;
    return {
        ...parsed,
        activeRound: parsed.activeRound && {
            ...parsed.activeRound,
            endsAt: new Date(parsed.activeRound.endsAt)
        }
    };
}

const storedParty = loadStoredParty();

export const PartyProvider = ({children}: PartyContextProviderProps) => {

    const [context, setContext] = useState<PartyContextType>({
        party: storedParty,
        setParty: (value?: Party) => {
            storeParty(value);
            setContext((previous) => {
                return { ...previous, party: value }
            });
        }
    });

    return (
        <PartyContext.Provider value={context}>
            {children}
        </PartyContext.Provider>
    );
}

export const useParty = () => {
    return useContext(PartyContext);
}
