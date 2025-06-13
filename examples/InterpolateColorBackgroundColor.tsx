import React, {useRef} from 'react';
import {
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const InterpolateColorBackgroundColor = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 2,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const colorInterpolate = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['rgb(71,255,99)', 'rgb(255,99,71)', 'rgb(99,71,255)'],
  });

  const bgStyle = {
    backgroundColor: animation.interpolate({
      inputRange: [0, 2],
      outputRange: ['#666600', '#66660000'],
    }),
  };

  const animatedStyles = {
    backgroundColor: colorInterpolate,
  };

  return (
    <Animated.View style={[styles.container, bgStyle]}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InterpolateColorBackgroundColor;
