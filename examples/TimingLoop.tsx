import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Button,
  Text,
} from 'react-native';

const TimingLoop = () => {
  const [started, setStarted] = React.useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    setStarted(true);
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ).start();
  };

  const interpolated = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolated,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyle]}>
          <Text>Press!</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {started && (
        <Button
          title="Stop"
          onPress={() => {
            animation.setValue(0);
            setStarted(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimingLoop;
