import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
    },
    arrow: {
      position: 'absolute',
      borderColor: 'transparent',
      borderWidth: 6,
    },
    tooltip: {
      position: 'absolute',
      paddingTop: 15,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      borderRadius: 3,
      overflow: 'hidden',
    },
    tooltipText: {
  
    },
    tooltipContainer: {
      flex: 1,
    },
    button: {
      padding: 10,
    },
    buttonText: {
      color: '#A138F2',
    },
    bottomBar: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    overlayRectangle: {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.2)',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
    overlayContainer: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
      right: 0,
    },
  });

 const Button = ({ wrapperStyle, style, ...rest }) => (
    <View style={[styles.button, wrapperStyle]}>
      <Text style={[styles.buttonText, style]} {...rest} />
    </View>
  );

  const TooltipComponent = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}) => (
  <View>
    <View style={styles.tooltipContainer}>
      <Text testID="stepDescription" style={styles.tooltipText}>{currentStep.text}</Text>
    </View>
    <View style={[styles.bottomBar]}>
      {
        !isLastStep ?
          <TouchableOpacity onPress={handleStop}>
            <Button>{labels.skip || 'Skip'}</Button>
          </TouchableOpacity>
          : null
      }
      {
        !isFirstStep ?
          <TouchableOpacity onPress={handlePrev}>
            <Button>{labels.previous || 'Previous'}</Button>
          </TouchableOpacity>
          : null
      }
      {
        !isLastStep ?
          <TouchableOpacity onPress={handleNext}>
            <Button>{labels.next || 'Next'}</Button>
          </TouchableOpacity> :
          <TouchableOpacity onPress={handleStop}>
            <Button>{labels.finish || 'Finish'}</Button>
          </TouchableOpacity>
      }
    </View>
  </View>
);

export default TooltipComponent;