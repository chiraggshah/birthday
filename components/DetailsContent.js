import React from 'react';
import { View } from 'react-native';

const DetailsContent = ({ children }) => (
  <View style={[{ overflow: 'hidden', borderRadius: 20, flex: 1 }]}>
    {children}
  </View>
);

export default DetailsContent;
