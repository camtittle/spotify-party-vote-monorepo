import { useParty } from "../../contexts/partyContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Home = () => {

    const { party } = useParty();
    const navigate = useNavigate();

    useEffect(() => {
        if (!party) {
            navigate('/spotify/login');
        } else {
            navigate('/party');
        }
    }, [party]);

    return (
        <div>
            <p>Home</p>
            <p>Party ID: {party?.partyId}</p>
        </div>
    );
};
