import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {product} from '../Products';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from '../Components/ProductItem';

const Home = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [tshirtList, setTshirtList] = useState([]);

  useEffect(() => {
    let tempCategory = [];
    product.category.map(item => {
      tempCategory.push(item);
    });
    setCategoryList(tempCategory);
    setTshirtList(product.category[0].data);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
        <Pressable style={styles.searchInputContainer}>
          <Icon
            style={styles.searchIcon}
            name="search-outline"
            color={'black'}
            size={24}></Icon>
          <TextInput
            placeholder="Search"
            placeholderTextColor={'#0A8ED9'}
            style={styles.searchInput}></TextInput>
        </Pressable>
        <TouchableOpacity style={styles.notificationIcon}>
          <Icon name="notifications-outline" size={26} color={'#0A8ED9'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatIcon}>
          <Icon
            name="chatbubble-ellipses-outline"
            size={26}
            color={'#0A8ED9'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Categories</Text>
        <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity style={styles.categoryItem}>
                <Text style={styles.categoryText}>{item.category}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.saleContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sale</Text>
            <View style={styles.spacer} />
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Super summer sale</Text>
        </View>
        <FlatList
          data={tshirtList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <ProductItem item={item}></ProductItem>;
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New</Text>
            <View style={styles.spacer} />
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={tshirtList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => {
            return <ProductItem item={item}></ProductItem>;
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: 'white',
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    flex: 1,
    borderRadius: 5,
    gap: 10,
    height: 38,
    margin: 10,
    marginHorizontal: 15,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    width: '100%',
  },
  notificationIcon: {
    margin: 5,
  },
  chatIcon: {
    marginHorizontal: 10,
  },
  categoryContainer: {
    marginTop: 25,
    paddingBottom: 10,
  },
  categoryTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  categoryItem: {
    backgroundColor: '#0A8ED9',
    marginLeft: 10,
    width: 100,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
  },
  saleContainer: {
    marginTop: 15,
    paddingLeft: 20,
  },
  sectionContainer: {
    paddingBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 30,
    color: 'black',
    fontWeight: '700',
  },
  spacer: {
    flex: 1,
  },
  viewAllText: {
    fontSize: 12,
    color: '#222222',
    marginRight: 20,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#9B9B9B',
  },
  newContainer: {
    marginTop: 15,
    paddingLeft: 20,
  },
});

export default Home;
