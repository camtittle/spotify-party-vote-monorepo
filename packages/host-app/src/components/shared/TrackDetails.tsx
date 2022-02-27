import { Track } from "../../models/track";
import styled from "styled-components";

const MetadataContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Metadata = styled.div<{size: 'medium' | 'large'}>`
  margin-left: 30px;
  font-size: ${({size}) => size === 'medium' ? '28px' : '50px'};
  color: #D1D1D1;
`;

const Title = styled.div`
  margin-bottom: 4px;
  font-weight: 500;
`;

const Artwork = styled.img<{size: 'medium' | 'large'}>` 
  width: ${({size}) => size === 'medium' ? '100px' : '200px'};
  height: ${({size}) => size === 'medium' ? '100px' : '200px'};
`;

interface Props {
  track: Track;
  size?: 'medium' | 'large';
}

export const TrackDetails = ({track, size = 'medium'}: Props) => {
  return (
    <MetadataContainer>
      <Artwork src={track.artworkUrl} size={size} />
      <Metadata size={size}>
        <Title>{track.title}</Title>
        <div>{track.artist}</div>
      </Metadata>
    </MetadataContainer>
  )
}
