import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    stepNumber: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 14,
        borderColor: '#FFFFFF',
        backgroundColor: '#A138F2',
      },
      stepNumberText: {
        fontSize: 10,
        backgroundColor: 'transparent',
        color: '#FFFFFF',
      }
})

const StepNumberComponent = ({
  currentStepNumber,
}) => (
  <View style={styles.stepNumber}>
    <Text style={[styles.stepNumberText]}>{currentStepNumber}</Text>
  </View>
);

export default StepNumberComponent;