import React from 'react';
import {
  View,
  SafeAreaView,
  Animated,
  Easing,
  FlatList,
  StatusBar,
  Image,
} from 'react-native';

import styles from './styles';

import Card from '../Card';
import Header from '../Header';
import CloseButton from '../CloseButton';
import DetailsContent from '../DetailsContent';
import CardBottomOverlay from '../CardBottomOverlay';
import ActiveCardDetails from '../ActiveCardDetails';

class CardList extends React.Component {
  state = {
    activeCard: 0,
  };

  cards = {};
  dimensions = new Animated.ValueXY({ x: 0, y: 0 });
  position = new Animated.ValueXY();
  animated = new Animated.Value(0);
  detailAnimated = new Animated.Value(0);

  oldPosition = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  enableScroll = () => this.state.activeCard !== 0;

  expand = (activeCard) => () => {
    StatusBar.setHidden(true, 'slide');

    this.cards[activeCard].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition = {
        x: pageX,
        y: pageY,
        width,
        height,
      };

      this.position.setValue({
        x: pageX,
        y: pageY,
      });

      this.dimensions.setValue({
        x: width,
        y: height,
      });

      this.setState({ activeCard }, () => {
        this.expandedView.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
          Animated.parallel([
            Animated.spring(this.position.x, {
              toValue: dPageX,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.spring(this.position.y, {
              toValue: dPageY,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.spring(this.dimensions.x, {
              toValue: dWidth,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.spring(this.dimensions.y, {
              toValue: dHeight,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(this.animated, {
              toValue: 1,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(this.detailAnimated, {
              toValue: 1,
              delay: 100,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        });
      });
    });
  };

  shrink = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y,
        easing: Easing.bezier(0.175, 0.885, 0.32, 1.275),
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.animated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(this.detailAnimated, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      StatusBar.setHidden(false, 'slide');
      this.setState({ activeCard: 0 });
    });
  };

  renderItem = ({ item, index }) => {
    const { activeCard } = this.state;

    const opacity = this.animated.interpolate({
      inputRange: [0, 0.01, 1],
      outputRange: [1, 0.1, 0.1],
    });

    return (
      <Card
        ref={(instance) => {
          this.cards[index + 1] = instance;
        }}
        onPress={
          item.locked ? () => console.log('locked') : this.expand(index + 1)
        }
        customContainerStyle={activeCard ? [opacity] : []}>
        <DetailsContent>
          <Image
            source={item.locked ? item.lockedImage : item.unlockedImage}
            style={styles.image}
            resizeMode={'cover'}
          />
          {item.locked && <CardBottomOverlay unlockTime={item.unlockTime} />}
        </DetailsContent>
      </Card>
    );
  };

  render() {
    const { activeCard } = this.state;
    const { data } = this.props;

    const activeCardBorderRadius = this.animated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [20, 10, 0],
    });

    const activeCardBackground = this.animated.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)'],
    });

    const activeCardStyle = {
      width: this.dimensions.x,
      left: this.position.x,
      top: this.position.y,
      borderRadius: activeCardBorderRadius,
      ...styles.activeCard,
    };

    const closeOpacity = this.animated.interpolate({
      inputRange: [0, 0.75, 1],
      outputRange: [0, 0, 1],
    });

    const contentOpacity = this.detailAnimated.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.2, 1],
    });

    const contentOffsetX = this.detailAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [-5, 0],
      easing: Easing.bezier(0.025, -0.05, 0.1, -0.1),
    });

    const contentOffsetY = this.detailAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
      easing: Easing.bezier(0.175, -0.885, 0.32, -1),
    });

    const activeDetailsStyle = {
      zIndex: 1,
      opacity: contentOpacity,
      transform: [
        {
          translateY: contentOffsetY,
        },
        {
          translateX: contentOffsetX,
        },
      ],
    };

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <FlatList
          onRefresh={this.props.onRefresh}
          refreshing={this.props.refreshing}
          contentContainerStyle={styles.flatlistContainer}
          keyExtractor={(item, index) => `item-${index}`}
          data={data}
          renderItem={this.renderItem}
          ListHeaderComponent={Header}
        />
        <View
          style={styles.expandedViewContainer}
          pointerEvents={activeCard ? 'auto' : 'none'}
          ref={(view) => {
            this.expandedView = view;
          }}>
          {activeCard ? (
            <Animated.ScrollView
              scrollEnabled={this.enableScroll()}
              style={[
                styles.scrollViewContainer,
                {
                  backgroundColor: activeCardBackground,
                },
              ]}
              contentContainerStyle={styles.scrollViewContentContainer}
              pointerEvents={activeCard ? 'auto' : 'none'}>
              <Card customContainerStyle={activeCardStyle}>
                <CloseButton onPress={this.shrink} opacity={closeOpacity} />
                <DetailsContent>
                  <Image
                    source={
                      activeCard ? data[activeCard - 1].unlockedImage : null
                    }
                    style={styles.image}
                    resizeMode="cover"
                  />
                </DetailsContent>
              </Card>
              <Animated.View style={activeDetailsStyle}>
                <DetailsContent>
                  <ActiveCardDetails item={data[activeCard - 1]} />
                </DetailsContent>
              </Animated.View>
            </Animated.ScrollView>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

export default CardList;
