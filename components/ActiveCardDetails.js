import React from 'react';
import { View, Text } from 'react-native';

const ActiveCardDetails = ({ item }) => (
  <View
    style={{
      paddingVertical: 30,
      paddingHorizontal: 16,
    }}>
    <Text style={{ fontSize: 36, marginBottom: 10 }}>{item.name}</Text>
    {item.wishes.map((para, i) => (
      <Text
        key={i}
        style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: 22, marginBottom: 10 }}>
        {para}
      </Text>
    ))}
  </View>
);

export default ActiveCardDetails;
