import styled from "styled-components";

enum Place {
  First = 0,
  Second = 1,
  Third = 2
}

const voteBarColours = {
  [Place.First]: '#25891D',
  [Place.Second]: '#FF6607',
  [Place.Third]: '#D11313'
}
interface Props {
  place: Place;
  percentage: number;
}

export const VotesBar = styled.div<Props>`
  height: 40px;
  margin-top: 26px;
  background-color: ${props => voteBarColours[props.place]};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.percentage * 100}%;
  min-width: 150px;
`;
