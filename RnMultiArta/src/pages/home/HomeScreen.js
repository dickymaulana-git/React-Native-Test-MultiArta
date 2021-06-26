import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../components/SearchBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  actionAllDog,
  actionImageDogs,
  actionDetailList,
  actionSearchDog,
  actionRecentSearch,
} from '../../redux/actions';
import color from '../../config/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../../components/Loading';

export default function HomeScreen(props) {
  const {allDog, limit, search, recent} = useSelector(
    state => state.DogReducer,
  );
  const dispatch = useDispatch();
  const [active, setActive] = useState('0');
  const [loading, setLoading] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  
  const titleHeader = [
    {id: '0', name: 'ALL BREEDS NAME'},
    {id: '1', name: 'SEARCH BREED'},
  ];

  const recentSearch = recent.reduce((result, element) => {
    return result.includes(element) ? result : [...result, element];
  }, []);

  const activeHandler = id => {
    setActive(id);
  };

  useEffect(() => {
    dispatch(actionAllDog());
  }, []);

  const searchHandler = () => {
    dispatch(actionSearchDog(textSearch));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={titleHeader}
          horizontal={true}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  activeHandler(item.id)
                  setTextSearch('')
                }}
                style={active == item.id ? styles.active : styles.unActive}>
                <Text
                  style={
                    active == item.id
                      ? styles.titleActive
                      : styles.titleUnActive
                  }>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          Î
        />
      </View>
      {active == '0' ? (
        <View>
          <FlatList
            data={allDog}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setLoading(true);
                    dispatch(actionDetailList(item));
                    dispatch(actionImageDogs([item, 10]));
                    setTimeout(() => {
                      props.navigation.navigate('DetailScreen', {name: item});
                      setLoading(false);
                    }, 1000);
                  }}
                  style={styles.listBreed}>
                  <Text style={styles.itemName}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Text>
                  <Icon name="chevron-right" size={24} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      ) : (
        <View>
          <SearchBar
            onSubmitEditing={searchHandler}
            value={textSearch}
            onChangeText={setTextSearch}
          />
          {textSearch.length < 1 ? (
            <View>
              <Text style={styles.recent}>Recent Search :</Text>
              <FlatList
                data={recentSearch}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setLoading(true);
                        setTextSearch('');
                        dispatch(actionRecentSearch(item));
                        dispatch(actionDetailList(item));
                        dispatch(actionImageDogs([item, 10]));
                        setTimeout(() => {
                          props.navigation.navigate('DetailScreen', {
                            name: item,
                          });
                          setLoading(false);
                        }, 500);
                      }}
                      style={styles.listBreed}>
                      <Text style={styles.itemName}>{item}</Text>
                      <Icon name="chevron-right" size={24} />
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : (
            <FlatList
              data={search}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setLoading(true);
                      setTextSearch('');
                      dispatch(actionRecentSearch(item));
                      dispatch(actionDetailList(item));
                      dispatch(actionImageDogs([item, 10]));
                      setTimeout(() => {
                        props.navigation.navigate('DetailScreen', {name: item});
                        setLoading(false);
                      }, 1000);
                    }}
                    style={styles.listBreed}>
                    <Text style={styles.itemName}>{item}</Text>
                    <Icon name="chevron-right" size={24} />
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      )}
      <Loading isVisible={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: wp(5),
  },
  active: {
    marginVertical: hp(2),
    marginHorizontal: wp(1),
    width: wp(43),
    marginRight: wp(1),
    borderWidth: 2,
    borderColor: color.black,
    padding: wp(2),
    borderRadius: 10,
    backgroundColor: color.primary,
  },
  unActive: {
    marginVertical: hp(2),
    marginHorizontal: wp(1),
    width: wp(43),
    marginRight: wp(1),
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
  listBreed: {
    borderBottomColor: color.ash,
    borderBottomWidth: 1,
    padding: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemName: {
    fontWeight: '600',
  },
  recent:{
    fontWeight:'bold',
  }
});
