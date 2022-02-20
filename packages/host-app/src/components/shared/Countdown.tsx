import { useEffect, useState } from "react";
import intervalToDuration from 'date-fns/intervalToDuration';
import styled from "styled-components";

const formatDuration = (duration: any) => {
  return `${duration.minutes < 10 ? '0' + duration.minutes : duration.minutes}:${duration.seconds < 10 ? '0' + duration.seconds : duration.seconds}`;
}

const Clock = styled.div`
  color: #FFBFFF;
  font-size: 200px;
  font-weight: 700;
  min-height: 240px;
`;

interface Props {
  endsAt: Date;
}

export const Countdown = ({endsAt}: Props) => {

  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    console.log('setting timeout');

    const updateTime = () => {
      const now = new Date();
      const duration = intervalToDuration({
        start: now,
        end: endsAt
      });
      setRemainingTime(formatDuration(duration));
    }

    updateTime();
    const interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      console.log('clearing timeout');
      clearTimeout(interval);
    }
  }, [endsAt]);

  return (
    <Clock>{remainingTime}</Clock>
  )

};
