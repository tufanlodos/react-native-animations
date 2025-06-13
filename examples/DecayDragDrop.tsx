import React, {useRef} from 'react';
import {StyleSheet, View, Animated, PanResponder, Text} from 'react-native';

const Decay = () => {
  const animation = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      animation.extractOffset();
    },
    onPanResponderMove: Animated.event(
      [null, {dx: animation.x, dy: animation.y}],
      {
        useNativeDriver: false, // not supported. see https://stackoverflow.com/a/50833024
      },
    ),
    onPanResponderRelease: (e, {vx, vy}) => {
      Animated.decay(animation, {
        velocity: {x: vx, y: vy},
        deceleration: 0.997,
        useNativeDriver: false, // not supported. see https://stackoverflow.com/a/50833024
      }).start();
    },
  });

  const animatedStyle = {
    transform: animation.getTranslateTransform(),
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, animatedStyle]}
        {...panResponder.panHandlers}>
        <Text>Drag!</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 500,
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Decay;
