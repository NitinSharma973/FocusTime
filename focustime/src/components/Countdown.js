import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import { fontSizes } from '../utils/sizes';
const minutesToMillis = (min) => min * 1000 * 60;

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const [millis, setMillis] = useState(null);

  const formatTime = (time) => (time < 10 ? `0${time}` : time);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const interval = React.useRef(null);
  const CountDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);

        onEnd();

        return time;
      }

      const timeLeft = time - 1000;

      onProgress(timeLeft / minutesToMillis(minutes));

      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(CountDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxl,

    color: colors.while,
    fontWeight: 'bold',
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
  },
});
