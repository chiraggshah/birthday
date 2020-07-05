import React from 'react';
import { TouchableWithoutFeedback, View, Animated } from 'react-native';

import styles from './styles';

class Card extends React.PureComponent {
  measure = (callback) => {
    this.container.measure(callback);
  };

  render() {
    const { children, customContainerStyle, onPress } = this.props;
    const containerStyle = [styles.container, customContainerStyle];

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={containerStyle}>
          <View
            renderToHardwareTextureAndroid
            ref={(instance) => {
              this.container = instance;
            }}
            style={styles.childrenContainer}>
            {children}
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

export default Card;
