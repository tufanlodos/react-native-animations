import React, {useRef} from 'react';
import {StyleSheet, View, Text, Animated, ScrollView} from 'react-native';

const EventScroll = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const backgroundInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ['rgb(255,99,71)', 'rgb(99,71,255)'],
  });

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          {
            useNativeDriver: false, // not supported, see https://reactnative.dev/blog/2017/02/14/using-native-driver-for-animated#caveats
          },
        )}>
        <Animated.View style={[styles.content, backgroundStyle]}>
          <Text style={styles.text}>Scroll!</Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 300,
  },
  text: {
    textAlign: 'center',
    marginTop: 100,
  },
  content: {
    height: 3000,
  },
});

export default EventScroll;
