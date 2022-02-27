import { useEffect, useState } from "react";
import intervalToDuration from 'date-fns/intervalToDuration';
import isAfter from 'date-fns/isAfter';
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
  endsAt?: Date;
  onTimerFinish: () => void;
}

export const Countdown = ({endsAt, onTimerFinish}: Props) => {

  const [remainingTime, setRemainingTime] = useState<string>();

  useEffect(() => {
    if (!endsAt) {
      return;
    }

    console.log('setting timeout');

    const updateTime = () => {
      const now = new Date();
      const duration = intervalToDuration({
        start: now,
        end: endsAt
      });
      setRemainingTime(formatDuration(duration));

      if (isAfter(now, endsAt)) {
        onTimerFinish();
      }
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
    <Clock>{endsAt ? remainingTime : null}</Clock>
  )

};
