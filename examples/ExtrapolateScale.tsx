import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const ExtrapolateScale = () => {
  const animation = useRef(new Animated.Value(1)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      animation.setValue(5);
    });
  };

  const scaleInterpolate = animation.interpolate({
    inputRange: [1, 2],
    outputRange: [1, 2],
    extrapolate: 'clamp', // 'extend' or 'identity' can also be used
    extrapolateLeft: 'identity', // 'clamp' or 'extend' can also be used
    extrapolateRight: 'clamp', // 'identity' or 'extend' can also be used
    // Note: 'clamp' prevents the scale from going below 1 or above 2
    // 'extend' allows the scale to go beyond these values
    // 'identity' keeps the scale value as is
    // This is useful for controlling the animation behavior
  });

  const animatedStyles = {
    transform: [{scale: scaleInterpolate}],
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

export default ExtrapolateScale;
