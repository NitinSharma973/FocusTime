import React, { useState } from 'react';
import { View, Text, StyleSheet, Vibration, Platform } from 'react-native';
import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { ProgressBar } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';

import { useKeepAwake } from 'expo-keep-awake';

import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;

import { Countdown } from '../../components/Countdown';
export const Timer = ({ FocusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [isStarted, setIsStarted] = useState(false);

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(10000);
    }
  };

  const onEnd = () => {
    vibrate();

    setMinutes(DEFAULT_TIME);

    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const changeTime = (min) => {
    setMinutes(min);

    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.Countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>

      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{FocusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={changeTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
      </View>

      <View style={styles.clearSubject}>
        <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: colors.while,
    textAlign: 'center',
  },

  task: {
    textAlign: 'center',
    color: colors.while,
    fontWeight: 'bold',
  },

  Countdown: {
    flex: 0.5,

    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonWrapper: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'center',
    padding: 15,
    alignItems: 'center',
  },

  clearSubject: {
    paddingBottom: 25,
    paddingLeft: 25,
  },
});
