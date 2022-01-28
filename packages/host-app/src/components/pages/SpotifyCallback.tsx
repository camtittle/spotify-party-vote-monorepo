import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useParty } from "../../contexts/partyContext";
import { PartyService } from "../../api/partyService";

export const SpotifyCallback = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { party, setParty } = useParty()

    const params = queryString.parse(location.search);
    const code = params.code as string;

    const [error, setError] = useState<string>();

    const handleAuth = async (code: string) => {
        const codeIsValid = code !== undefined && code !== null;
        if (!codeIsValid) {
            console.error('Invalid redirect params');
            setError('An error occurred connecting to Spotify. Please try again');
            return;
        }

        try {
            const response = await PartyService.createParty(code);
            setParty(response.party);
            if (response.party) {
                console.log(response.party);
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            setParty(undefined);
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
