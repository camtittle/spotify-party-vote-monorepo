import { useParty } from "../../contexts/partyContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PartyService } from "../../api/partyService";

export const Party = () => {
   const { party, setParty } = useParty();
   const navigate = useNavigate();

   if (!party) {
      navigate('/');
   }

   useEffect(() => {
      if (!party) {
         return;
      }

      // Refresh party
      PartyService.getParty(party.partyId).then(party => {
         setParty(party);

         if (!party.activeRound)
      });
   }, []);

   return (
       <p>Party ID: {party?.partyId}</p>
   );
}
