import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';

import { Countdown } from '../../components/Countdown';
import { Timing } from './Timing';
import { RoundedButton } from '../../components/RoundedButton';

const DEFAULT_TIME = 0.1;

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
  useKeepAwake();

  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
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

  const chageTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}> Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <ProgressBar
        color="#5E84E2"
        style={styles.progressBar}
        progress={progress}
      />

      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={chageTime} />
      </View>

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
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
    color: colors.white,
    textAlign: 'center',
  },

  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  progressBar: {
    height: 10,
    marginTop: spacing.sm,
  },

  clearSubject: {
    paddingBottom: spacing.lg,
    paddingLeft: spacing.lg,
  },
});
