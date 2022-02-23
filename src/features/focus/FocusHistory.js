import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, spacing } from '../../utils/sizes';

import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return (
    <Text
      style={[
        styles.historyItem,
        { color: item.status > 1 ? 'red' : 'green' },
      ]}>
      {item.subject}
    </Text>
  );
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView styles={{ flex: 0.5 }}>
        {!!focusHistory.length && (
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.title}>Things we've focused on</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={75}
                title="Clear"
                onPress={() => onClear()}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: {
    fontSize: fontSizes.md,
  },

  title: {
    color: 'white',
    fontSize: fontSizes.lg,
  },

  clearContainer: {
    alignItems: 'center',
    padding: spacing.md,
  },
});
