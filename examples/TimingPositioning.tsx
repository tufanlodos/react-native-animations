import React, {useRef} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';

const TimingPositioning = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 30,
      duration: 1500,
      useNativeDriver: false, // not supported, see https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated#caveats
    }).start(() => {
      animation.setValue(0);
    });
  };

  const animatedStyles = {
    top: animation,
    left: animation,
    right: animation,
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={startAnimation}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <Text>Press!</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'tomato',
    position: 'absolute',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TimingPositioning;
