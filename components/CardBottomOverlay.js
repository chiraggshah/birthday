import React from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';

export default ({ unlockTime }) => (
  <View>
    <View
      style={{
        width: '100%',
        padding: 5,
        backgroundColor: 'rgba(150, 150, 150, 0.9)',
        position: 'absolute',
        bottom: 0,
        left: 0,
      }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/locked.png')}
            style={{ width: 30, height: 30, marginHorizontal: 10 }}
          />
          <View>
            <Text style={{ fontSize: 12, fontWeight: 'bold' }}>Locked</Text>
            <Text style={{ fontSize: 12 }}>Will unlock at {unlockTime}</Text>
          </View>
        </View>
        {/* <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#007AFF',
              padding: 7,
              minWidth: 60,
              borderRadius: 16,
            }}
            onPress={() => {
              console.log('Do Something');
            }}>
            <Text style={{ color: 'rgb(255, 255, 255)', textAlign: 'center' }}>
              Unlock
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  </View>
);
