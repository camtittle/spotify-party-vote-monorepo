import { Round } from "../../models/round";
import { useEffect, useState } from "react";
import { TrackVotes } from "@spotify-party-vote/core";
import { Track } from "../../models/track";
import styled from "styled-components";
import { VotesBar } from "./VotesBar";
import { VoteService } from "../../api/voteService";
import { TrackDetails } from "./TrackDetails";

interface Props {
  round: Round;
}

type MetadataMap = { [trackId: string]: Track };
type VotesMap = { [trackId: string]: TrackVotes };

const Container = styled.div`
  padding-top: 23px;
`

const Header = styled.h1`
  font-size: 80px;
  color: #F8F8F8;
  margin: 8px 0;
`;

const TracksList = styled.div`
  width: 100%;
`;

const TrackItem = styled.div`
  width: 100%;
  background-color: #222222;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 24px 26px;
`;

export const VoteResults = ({ round }: Props) => {

  const [votes, setVotes] = useState<VotesMap>();
  const [metadata, setMetadata] = useState<MetadataMap>();

  // Fetch track votes
  useEffect(() => {
    const fetchVotes = async () => {
      const votesResponse = await VoteService.getVotes(round.partyId, round.roundId);
      const map: VotesMap = votesResponse.reduce((map, trackVotes) => {
        map[trackVotes.trackId] = trackVotes;
        return map;
      }, {} as VotesMap);
      setVotes(map);
    };
    fetchVotes();
  }, []);

  // Update map of track metadata
  useEffect(() => {
    const map: MetadataMap = round.tracks.reduce((map, track) => {
      map[track.trackId] = track;
      return map;
    }, {} as MetadataMap);
    setMetadata(map);
  }, [round.tracks]);

  // replace with loading spinner
  if (!metadata) return null;
  if (!votes) return null;

  const totalVotes = Object.values(votes).reduce((sum, vote) => {
    return sum + vote.voteCount;
  }, 0);

  const sortedTracks = Object.values(votes).map(trackVotes => ({
    ...trackVotes,
    votePercentage: totalVotes > 0 ? ((trackVotes.voteCount * 1.0) / totalVotes) : 0
  })).sort((a, b) => b.votePercentage - a.votePercentage);

  const trackItems = sortedTracks.map((trackVotes, index) => {
    const trackMetadata = metadata[trackVotes.trackId];

    return (
      <TrackItem key={trackVotes.trackId}>
        <TrackDetails track={trackMetadata} />
        <VotesBar place={index} percentage={trackVotes.votePercentage} >
          <div>{trackVotes.voteCount} {trackVotes.voteCount === 1 ? 'vote' : 'votes'}</div>
        </VotesBar>
      </TrackItem>
    );
  });

  return (
    <Container>
      <Header>Next Eurovision song to play...</Header>
      <TracksList>
        {trackItems}
      </TracksList>
    </Container>
  )

};
