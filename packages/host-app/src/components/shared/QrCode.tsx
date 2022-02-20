import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: 40px;
`;

const QrContainer = styled.div`
  background-color: #FFA3F8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px;
  border-radius: 16px;
`;

const QrCodeImg = styled.img`
  width: 100%;
`;

const QrLabel = styled.span`
  color: #3C3C3C;
  font-size: 50px;
  padding-top: 54px;
`;

export const QrCode = () => {
    return (
        <Container>
            <QrContainer>
                <QrCodeImg src="https://www.investopedia.com/thmb/ZG1jKEKttKbiHi0EkM8yJCJp6TU=/1148x1148/filters:no_upscale():max_bytes(150000):strip_icc()/qr-code-bc94057f452f4806af70fd34540f72ad.png" />
                <QrLabel>scan to vote</QrLabel>
            </QrContainer>
        </Container>
    )
}
