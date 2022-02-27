import { useParty } from "../../contexts/partyContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PartyService } from "../../api/partyService";
import { RoundService } from "../../api/roundService";
import styled from "styled-components";
import { QrCode } from "../shared/QrCode";
import { VoteResults } from "../shared/VoteResults";
import { Countdown } from "../shared/Countdown";
import { Track } from "../../models/track";
import { WinnerModal } from "../shared/WinnerModal";

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

const winningModalDurationSeconds = 10;

export const Party = () => {
   const { party, setParty } = useParty();
   const [ winningTrack, setWinningTrack ] = useState<Track>();
   const navigate = useNavigate();

   const startNewRound = async () => {
      if (!party) {
         console.error('Cannot start round without active party');
         return;
      }

      const round = await RoundService.startRound(party.partyId);
      setParty({
         ...party,
         activeRound: round
      });
      setWinningTrack(undefined);
   }

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
         startNewRound();
      }
   }, [party?.activeRound]);

   useEffect(() => {
      if (winningTrack) {
         const timeout = setTimeout(() => {
            startNewRound();
         }, winningModalDurationSeconds * 1000);

         return () => {
            clearTimeout(timeout);
         }
      }
   }, [winningTrack]);

   const finishRound = async () => {
      if (!party || !party.activeRound) {
         console.error('Cannot finish round - no active party/round');
         return;
      }

      const winningTrack = await RoundService.finishRound(party.partyId, party.activeRound.roundId);
      setWinningTrack(winningTrack);
   }

   if (!party?.activeRound) {
      return (
          <p>Loading...</p>
      );
   }

   const showClock = !winningTrack;

   return (
       <div>
          <LeftColumn>
             <Countdown endsAt={showClock ? party.activeRound.endsAt : undefined} onTimerFinish={finishRound}/>
             <VoteResults round={party.activeRound} />
          </LeftColumn>
          <RightColumn>
             <QrCode />
             <button onClick={finishRound}>Finish round</button>
          </RightColumn>

          { winningTrack ? <WinnerModal track={winningTrack} /> : null }
       </div>
   );
}
