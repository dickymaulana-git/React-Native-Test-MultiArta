import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import color from '../config/Colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export default function CustomButton(props) {
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.text}>{props.text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: color.primary,
        marginVertical: hp(2),
        borderRadius:wp(2)
    },
    text:{
        color:color.white,
        fontWeight:'bold',
        paddingHorizontal:wp(10),
        paddingVertical:wp(3)
    }
})
