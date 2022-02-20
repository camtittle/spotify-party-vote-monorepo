import { useParty } from "../../contexts/partyContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PartyService } from "../../api/partyService";
import { RoundService } from "../../api/roundService";
import styled from "styled-components";
import { QrCode } from "../shared/QrCode";
import { VoteResults } from "../shared/VoteResults";
import { Countdown } from "../shared/Countdown";
import { addMinutes } from "date-fns";

const Column = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: top;
`;

const LeftColumn = styled(Column)`
  width: 75%;
   padding: 26px;
`;

const RightColumn = styled(Column)`
  width: 25%;
`;

const tempEndsAtDate = addMinutes(new Date(), 30);

export const Party = () => {
   const { party, setParty } = useParty();
   const navigate = useNavigate();

   useEffect(() => {
      if (!party) {
         navigate('/');
         return;
      }

      // Refresh party
      PartyService.getParty(party.partyId).then(party => {
         setParty(party);
      }).catch(error => {
         console.log(JSON.stringify(error));
      });
   }, []);

   useEffect(() => {
      if (!party) {
         return;
      }

      // Start a round if there is not one active
      if (!party.activeRound) {
         RoundService.startRound(party.partyId).then(round => {
            setParty({
               ...party,
               activeRound: round
            });
         });
      }

      console.log(party);
   }, [party?.activeRound])

   if (!party?.activeRound) {
      return (
          <p>Loading...</p>
      );
   }

   return (
       <div>
          <LeftColumn>
             <Countdown endsAt={party.activeRound.endsAt} />
             <VoteResults round={party.activeRound} />
          </LeftColumn>
          <RightColumn>
             <QrCode />
          </RightColumn>
       </div>
   );
}
