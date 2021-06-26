import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Loading';
import {useDispatch} from 'react-redux';
import {actionAllDog} from '../../redux/actions';

export default function LoginScreen(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  return (
    <ImageBackground
      source={require('../../assets/img/login-bg.jpeg')}
      style={styles.container}>
      <Text style={styles.title}>Welcome To The Dog World !</Text>
      <CustomButton
        text="Get Start !"
        onPress={() => {
          setLoading(true);
          setTimeout(() => {
            setLoading(true);
            dispatch(actionAllDog());
            setTimeout(() => {
              props.navigation.navigate('HomeScreen');
              setLoading(false);
            }, 400);
          });
        }}
      />
      <Loading isVisible={loading} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp(7),
    fontWeight: 'bold',
    position: 'absolute',
    top: hp(20),
    width: wp(60),
    textAlign: 'center',
  },
});
