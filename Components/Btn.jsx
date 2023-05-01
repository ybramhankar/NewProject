import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  verticalScale,
  scale,
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

const Btn = props => {
  return (
    <TouchableOpacity style={styles.conainer} onPress={() => props.onPress()}>
      <Text style={{textAlign: 'center', fontSize: 25, color: '#fff'}}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

export default Btn;

const styles = StyleSheet.create({
  conainer: {
    backgroundColor: '#6C3082',
    justifyContent: 'center',
    height: verticalScale(40),
    borderRadius: 5,
  },
});
