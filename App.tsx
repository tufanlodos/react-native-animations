import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  useColorScheme,
  StatusBar,
  Pressable,
  Modal,
  Linking,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TimingOpacity from './examples/TimingOpacity';
import TimingTranslatePosition from './examples/TimingTranslatePosition';
import TimingScale from './examples/TimingScale';
import TimingWidthHeight from './examples/TimingWidthHeight';
import TimingWidthHeightPercentage from './examples/TimingWidthHeightPercentage';
import TimingPositioning from './examples/TimingPositioning';
import TimingColorBackgroundColor from './examples/TimingColorBackgroundColor';
import TimingRotation from './examples/TimingRotation';
import TimingWithEasing from './examples/TimingWithEasing';
import TimingLoop from './examples/TimingLoop';
import Spring from './examples/Spring';
import EventScroll from './examples/EventScroll';
import Decay from './examples/DecayDragDrop';
import Shake from './examples/Shake';
import MathAddTranslatePosition from './examples/MathAddTranslatePosition';
import MathDivideTranslatePosition from './examples/MathDivideTranslatePosition';
import MathMultiplyTranslatePosition from './examples/MathMultiplyTranslatePosition';
import MathModuloRotation from './examples/MathModuloRotation';
import ParallelColorScale from './examples/ParallelColorScale';
import SequenceColorScale from './examples/SequenceColorScale';
import StaggerColorScale from './examples/StaggerColorScale';
import DelayColorScale from './examples/DelayColorScale';
import InterpolateTranslatePositionOpacity from './examples/InterpolateTranslatePositionOpacity';
import InterpolateColorBackgroundColor from './examples/InterpolateColorBackgroundColor';
import InterpolateRotation from './examples/InterpolateRotation';
import ExtrapolateScale from './examples/ExtrapolateScale';
import {InfoData, ThemeColors} from './types';

const DETAILS = {
  0: 'Timing: Opacity',
  1: 'Timing: Translate Position',
  2: 'Timing: Scale',
  3: 'Timing: Width-Height',
  4: 'Timing: Width-Height Percentage',
  5: 'Timing: Positioning',
  6: 'Timing: Color-Background Color',
  7: 'Timing: Rotation',
  8: 'Timing with Easing',
  9: 'Timing: Loop',
  10: 'Spring',
  11: 'Event: Scroll',
  12: 'Decay: Drag-Drop',
  13: 'Shake',
  14: 'Math: Add (Translate Position)',
  15: 'Math: Divide (Translate Position)',
  16: 'Math: Multiply (Translate Position)',
  17: 'Math: Modulo (Rotation)',
  18: 'Parallel: Color,Scale',
  19: 'Sequence: Color,Scale',
  20: 'Stagger: Color,Scale',
  21: 'Delay: Color,Scale',
  22: 'Interpolate: Translate Position, Opacity',
  23: 'Interpolate: Color-Background Color',
  24: 'Interpolate: Rotation',
  25: 'Extrapolate: Scale',
};

const App = () => {
  const [showDetail, setShowDetail] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoLoading, setInfoLoading] = useState(true);
  const [infoData, setInfoData] = useState<InfoData | null>(null);

  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? AppTheme.dark : AppTheme.light;
  const styles = getStyles(themeColors);

  useEffect(() => {
    (async () => {
      setInfoLoading(true);
      try {
        const response = await fetch(
          'https://tufanlodos.github.io/react-native-animations/info.json',
        );
        if (response.ok) {
          const data = await response.json();
          setInfoData(data);
        } else {
          console.error('Failed to fetch intro data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching intro data:', error);
      } finally {
        setInfoLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {showDetail === null ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.header}>
            <Text style={styles.title}>React Native Animations</Text>
            {!infoLoading && (
              <Pressable onPress={() => setShowInfoModal(true)}>
                <Text>ℹ️</Text>
              </Pressable>
            )}
            <Modal visible={showInfoModal} transparent={true}>
              <View style={styles.modalOverlay}>
                {infoData ? (
                  <View style={styles.modalBody}>
                    {infoData.title && (
                      <Text style={styles.title}>{infoData.title}</Text>
                    )}
                    {infoData.description && (
                      <Text style={styles.subtitle}>
                        {infoData.description}
                      </Text>
                    )}
                    {infoData.websiteURL && (
                      <Text style={styles.text}>
                        Visit{' '}
                        <Text
                          style={styles.link}
                          onPress={() => Linking.openURL(infoData.websiteURL)}>
                          the website
                        </Text>{' '}
                        for more information.
                      </Text>
                    )}
                    {infoData.repositoryURL && (
                      <Text style={styles.text}>
                        Check out the{' '}
                        <Text
                          style={styles.link}
                          onPress={() =>
                            Linking.openURL(infoData.repositoryURL)
                          }>
                          repository
                        </Text>{' '}
                        for source code.
                      </Text>
                    )}
                    {infoData.email && (
                      <Text style={styles.text}>
                        Contact:{' '}
                        <Text
                          style={styles.link}
                          onPress={() =>
                            Linking.openURL(`mailto:${infoData.email}`)
                          }>
                          {infoData.email}
                        </Text>
                      </Text>
                    )}
                    <Button
                      title="Close"
                      onPress={() => setShowInfoModal(false)}
                    />
                  </View>
                ) : (
                  <View style={styles.modalBody}>
                    <Text style={styles.text}>
                      Visit{' '}
                      <Text
                        style={styles.link}
                        onPress={() =>
                          Linking.openURL(
                            'https://tufanlodos.github.io/react-native-animations/',
                          )
                        }>
                        the website
                      </Text>{' '}
                      to learn more about this project.
                    </Text>
                  </View>
                )}
              </View>
            </Modal>
          </View>
          <View style={styles.body}>
            <Button
              title={DETAILS[0]}
              onPress={() => setShowDetail(DETAILS[0])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[1]}
              onPress={() => setShowDetail(DETAILS[1])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[2]}
              onPress={() => setShowDetail(DETAILS[2])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[3]}
              onPress={() => setShowDetail(DETAILS[3])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[4]}
              onPress={() => setShowDetail(DETAILS[4])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[5]}
              onPress={() => setShowDetail(DETAILS[5])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[6]}
              onPress={() => setShowDetail(DETAILS[6])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[7]}
              onPress={() => setShowDetail(DETAILS[7])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[8]}
              onPress={() => setShowDetail(DETAILS[8])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[9]}
              onPress={() => setShowDetail(DETAILS[9])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[10]}
              onPress={() => setShowDetail(DETAILS[10])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[11]}
              onPress={() => setShowDetail(DETAILS[11])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[12]}
              onPress={() => setShowDetail(DETAILS[12])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[13]}
              onPress={() => setShowDetail(DETAILS[13])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[14]}
              onPress={() => setShowDetail(DETAILS[14])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[15]}
              onPress={() => setShowDetail(DETAILS[15])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[16]}
              onPress={() => setShowDetail(DETAILS[16])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[17]}
              onPress={() => setShowDetail(DETAILS[17])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[18]}
              onPress={() => setShowDetail(DETAILS[18])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[19]}
              onPress={() => setShowDetail(DETAILS[19])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[20]}
              onPress={() => setShowDetail(DETAILS[20])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[21]}
              onPress={() => setShowDetail(DETAILS[21])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[22]}
              onPress={() => setShowDetail(DETAILS[22])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[23]}
              onPress={() => setShowDetail(DETAILS[23])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[24]}
              onPress={() => setShowDetail(DETAILS[24])}
            />
            <View style={styles.spacer} />
            <Button
              title={DETAILS[25]}
              onPress={() => setShowDetail(DETAILS[25])}
            />
            <View style={styles.spacer} />
          </View>
        </ScrollView>
      ) : (
        <View style={styles.f1}>
          <View style={styles.detailHeader}>
            <Pressable
              style={styles.backButton}
              onPress={() => setShowDetail(null)}>
              <Text style={styles.backButtonText}>Back</Text>
            </Pressable>
            <Text style={styles.title} adjustsFontSizeToFit numberOfLines={1}>
              {showDetail} animation
            </Text>
          </View>
          <View style={styles.f1}>
            {showDetail === DETAILS[0] ? (
              <TimingOpacity />
            ) : showDetail === DETAILS[1] ? (
              <TimingTranslatePosition />
            ) : showDetail === DETAILS[2] ? (
              <TimingScale />
            ) : showDetail === DETAILS[3] ? (
              <TimingWidthHeight />
            ) : showDetail === DETAILS[4] ? (
              <TimingWidthHeightPercentage />
            ) : showDetail === DETAILS[5] ? (
              <TimingPositioning />
            ) : showDetail === DETAILS[6] ? (
              <TimingColorBackgroundColor />
            ) : showDetail === DETAILS[7] ? (
              <TimingRotation />
            ) : showDetail === DETAILS[8] ? (
              <TimingWithEasing />
            ) : showDetail === DETAILS[9] ? (
              <TimingLoop />
            ) : showDetail === DETAILS[10] ? (
              <Spring />
            ) : showDetail === DETAILS[11] ? (
              <EventScroll />
            ) : showDetail === DETAILS[12] ? (
              <Decay />
            ) : showDetail === DETAILS[13] ? (
              <Shake />
            ) : showDetail === DETAILS[14] ? (
              <MathAddTranslatePosition />
            ) : showDetail === DETAILS[15] ? (
              <MathDivideTranslatePosition />
            ) : showDetail === DETAILS[16] ? (
              <MathMultiplyTranslatePosition />
            ) : showDetail === DETAILS[17] ? (
              <MathModuloRotation />
            ) : showDetail === DETAILS[18] ? (
              <ParallelColorScale />
            ) : showDetail === DETAILS[19] ? (
              <SequenceColorScale />
            ) : showDetail === DETAILS[20] ? (
              <StaggerColorScale />
            ) : showDetail === DETAILS[21] ? (
              <DelayColorScale />
            ) : showDetail === DETAILS[22] ? (
              <InterpolateTranslatePositionOpacity />
            ) : showDetail === DETAILS[23] ? (
              <InterpolateColorBackgroundColor />
            ) : showDetail === DETAILS[24] ? (
              <InterpolateRotation />
            ) : showDetail === DETAILS[25] ? (
              <ExtrapolateScale />
            ) : null}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const AppTheme: {
  [theme: string]: ThemeColors;
} = {
  light: {
    background: Colors.white,
    text: Colors.black,
    subText: Colors.dark,
    border: Colors.light,
  },
  dark: {
    background: '#121212',
    text: Colors.white,
    subText: '#e0e0e0',
    border: '#333333',
  },
};

const getStyles = (themeColors: ThemeColors) =>
  StyleSheet.create({
    f1: {
      flex: 1,
    },
    f0: {
      flex: 0,
    },
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      paddingTop: StatusBar.currentHeight || 0,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalBody: {
      flex: 0,
      backgroundColor: themeColors.background,
      padding: 20,
      gap: 10,
    },
    body: {
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      color: themeColors.text,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: '400',
      textAlign: 'center',
      marginBottom: 16,
      color: themeColors.subText,
    },
    text: {
      color: themeColors.text,
    },
    link: {
      textDecorationLine: 'underline',
    },
    spacer: {
      marginBottom: 10,
    },
    detailHeader: {
      alignItems: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 10,
      gap: 10,
    },
    backButton: {
      flex: 0,
      borderWidth: 1,
      borderColor: 'tomato',
      paddingVertical: 5,
      paddingHorizontal: 10,
    },
    backButtonText: {
      color: themeColors.text,
      fontSize: 18,
      fontWeight: '400',
    },
  });

export default App;
