import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};

export default function App() {
  const [FocusSubject, setFocusSubject] = useState(null);

  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  return (
    <View style={styles.container}>
      {FocusSubject ? (
        <Timer
          FocusSubject={FocusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(FocusSubject, STATUSES.COMPLETE);

            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubjectWithState(FocusSubject, STATUSES.CANCELLED);

            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: '#252250',
  },
});
