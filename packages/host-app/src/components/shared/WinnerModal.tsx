import styled, { keyframes } from "styled-components";
import { TrackDetails } from "./TrackDetails";
import { Track } from "../../models/track";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(13, 13, 13, 0.84);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const flashingAnimation = keyframes`
  0%, 100% {
    background-color: #484848;
  }
  50% {
    background-color: #9927b9;
  }
`;

const Modal = styled.div`
  background-color: #484848;
  transition: all 300ms;
  animation: ${flashingAnimation} 500ms infinite;
  padding: 26px 60px;
  border-radius: 10px;
  min-width: 700px;
  min-height: 500px;
`;

const Header = styled.h1`
  color: #FFBFFF;
  font-size: 100px;
  font-weight: 700;
  margin: 0 0 50px 0;
  text-align: center;
`;

interface Props {
  track: Track;
}

export const WinnerModal = ({track}: Props) => {

  return (
    <Container>
      <Modal>
        <Header>Winner!</Header>
        <TrackDetails track={track} size="large" />
      </Modal>
    </Container>
  );

}
