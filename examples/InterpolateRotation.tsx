import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const InterpolateRotation = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const xInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', '6.28319rad'],
  });

  const yInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['0deg', '0deg', '180deg'],
  });

  const animatedStyles = {
    transform: [
      {
        rotateX: xInterpolate,
      },
      {
        rotateY: yInterpolate,
      },
    ],
  };

  return (
    <Animated.View style={[styles.container]}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <Text>Press!</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 600,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InterpolateRotation;
