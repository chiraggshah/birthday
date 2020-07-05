import React from 'react';
import { View, Text } from 'react-native';
import { HEADER_TEXT } from '../configurations';

const Header = () => (
  <View style={{ padding: 16, paddingBottom: 0 }}>
    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>{HEADER_TEXT}</Text>
  </View>
);

export default Header;
