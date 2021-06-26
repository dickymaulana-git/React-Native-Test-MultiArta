import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import color from '../../config/Colors';
import {useDispatch} from 'react-redux';
import {
  actionFilter,
  actionImageDogs,
  actionResetImage,
  actionResetLimit,
  actionSearchDog,
} from '../../redux/actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../components/Loading';

export default function DetailScreen(props) {
  const dispatch = useDispatch();
  const {detail, image, limit} = useSelector(state => state.DogReducer);
  const [active, setActive] = useState(detail[0]);
  const [changeLimit, setChangeLimit] = useState(limit);
  const [loading, setLoading] = useState(false);

  console.log('det', detail);
  console.log('act', active);

  const DogsName = props.route.params.name;

  const listImage = image.reduce((result, element) => {
    return result.includes(element) ? result : [...result, element];
  }, []);

  const activeHandler = async item => {
    setActive(item);
    if (item !== detail[0]) {
      await dispatch(actionResetImage());
      await dispatch(actionImageDogs([DogsName, limit, item]));
    } else {
      await dispatch(actionResetImage());
      await dispatch(actionImageDogs([DogsName, limit]));
    }
  };

  const handleLoadMore = async () => {
    setLoading(true);
    await setChangeLimit(parseInt(changeLimit) + 10);
    await dispatch(actionImageDogs([DogsName, changeLimit]));
    setLoading(false);
  };

  const backHandler = async () => {
    setLoading(true);
    await dispatch(actionResetImage());
    await dispatch(actionSearchDog('unknown'));
    setTimeout(() => {
      props.navigation.goBack();
      setLoading(false);
    }, 100);
  };

  const footerView = () => {
    return <View style={{marginBottom: hp(5)}} />;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <Icon onPress={backHandler} name="chevron-left" size={40} />
        <Text style={styles.headerTitle}>
          Sub-Breed {DogsName.charAt(0).toUpperCase() + DogsName.slice(1)}
        </Text>
      </SafeAreaView>
      <View style={{marginLeft: wp(2)}}>
        <FlatList
          data={detail}
          horizontal={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  activeHandler(item);
                }}
                style={active == item ? styles.active : styles.unActive}>
                <Text
                  style={
                    active == item ? styles.titleActive : styles.titleUnActive
                  }>
                  {item.charAt(0).toUpperCase() + item.slice(1)}{' '}
                  {DogsName.charAt(0).toUpperCase() + DogsName.slice(1)}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{flex: 1, marginHorizontal: wp(3)}}>
        <FlatList
          data={listImage}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View style={styles.itemContainer}>
                <Image style={styles.imgItem} source={{uri: item}} />
              </View>
            );
          }}
          ListFooterComponent={() => footerView()}
        />
      </View>
      <Loading isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  active: {
    marginVertical: hp(2),
    marginRight: wp(2),
    marginRight: wp(2),
    borderWidth: 2,
    borderColor: color.black,
    padding: wp(2),
    borderRadius: 10,
    backgroundColor: color.primary,
  },
  unActive: {
    marginVertical: hp(2),
    marginRight: wp(2),
    marginRight: wp(2),
    borderWidth: 2,
    borderColor: color.black,
    padding: wp(2),
    borderRadius: 10,
  },
  titleActive: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.white,
  },
  titleUnActive: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.black,
  },
  imgItem: {
    width: wp(44),
    height: hp(22),
    backgroundColor: color.ash,
  },
  itemContainer: {
    width: wp(47),
    marginVertical: wp(2),
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: color.ash,
    borderBottomWidth: 1,
    height: hp(11),
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    marginRight: wp(8),
  },
});
