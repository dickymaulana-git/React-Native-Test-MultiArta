import React from 'react';
import {StyleSheet, Text, View, TextInput, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../src/config/Colors';
import {ForceTouchGestureHandler} from 'react-native-gesture-handler';

export default function SearchBar(props) {
  return (
    <View style={styles.search}>
      <Icon name="magnify" size={25} />
      <TextInput
        autoCorrect={false}
        autoFocus={true}
        style={styles.input}
        placeholder="Search here ..."
        onSubmitEditing={props.onSubmitEditing}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    borderColor: color.black,
    borderRadius: wp(3),
    borderWidth: 1,
    padding: Platform.OS === 'android' ? wp(0) : wp(1),
    marginBottom: hp(2),
  },
  input: {
    width: wp(79),
    maxWidth: wp(79),
    marginLeft: wp(2),
  },
});
