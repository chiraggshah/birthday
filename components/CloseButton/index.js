import React from 'react';
import { View, TouchableOpacity, Animated, Image } from 'react-native';

import CloseIcon from './close.png';
import styles from './styles';

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

const CloseButton = ({ onPress, opacity }) => (
  <AnimatedButton style={[styles.container, { opacity }]} onPress={onPress}>
    <View style={styles.buttonContainer}>
      <Image source={CloseIcon} style={styles.icon} />
    </View>
  </AnimatedButton>
);

export default CloseButton;
