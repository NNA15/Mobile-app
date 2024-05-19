import React, { useEffect, useState, useRef } from 'react';
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
import Icon from 'react-native-vector-icons/Ionicons';
import ProductItem from '../Components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [product, setProduct] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tshirtList, setTshirtList] = useState([]);
  const [jeansList, setjeansList] = useState([]);
  const [shoeList, setshoeList] = useState([]);
  const [jacketList, setjacketList] = useState([]);
  const [slipperList, setslipperList] = useState([]);
  const [trouserList, settrouserList] = useState([]);

  const [filteredTshirtList, setFilteredTshirtList] = useState([]);
  const [filteredJeansList, setFilteredJeansList] = useState([]);
  const [filteredShoeList, setFilteredShoeList] = useState([]);
  const [filteredJacketList, setFilteredJacketList] = useState([]);
  const [filteredSlipperList, setFilteredSlipperList] = useState([]);
  const [filteredTrouserList, setFilteredTrouserList] = useState([]);

  const [searchText, setSearchText] = useState('');

  const handleViewAllPress = (productList) => {
    navigation.navigate('CategoryProductList', { productList }); // Điều hướng đến CategoryProductList với productList
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const respose = await axios.get('http://192.168.1.12:8000/product');
      const fetchProducts = respose.data;
      if (fetchProducts) {
        setProduct(fetchProducts);

        const categories = Array.from(new Set(fetchProducts.map(product => product.category)));
        const categorizedProducts = {};
        categories.forEach(category => {
          categorizedProducts[category] = fetchProducts.filter(product => product.category === category);
        });

        setCategoryList(categories);
        setTshirtList(categorizedProducts['T-shirt'] || []);
        setjeansList(categorizedProducts['Jeans'] || []);
        setjacketList(categorizedProducts['Jacket'] || []);
        setshoeList(categorizedProducts['Shoe'] || []);
        setslipperList(categorizedProducts['Slipper'] || []);
        settrouserList(categorizedProducts['Trouser'] || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearchInputChange = (text) => {
    setSearchText(text);
  };

  const handleSearch = () => {
    const defaultScrollPosition = 0;

    const filteredTshirtList = tshirtList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredTshirtList(filteredTshirtList);

    const filteredJacketList = jacketList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredJacketList(filteredJacketList);

    const filteredJeansList = jeansList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredJeansList(filteredJeansList);

    const filteredShoeList = shoeList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredShoeList(filteredShoeList);

    const filteredSlipperList = slipperList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredSlipperList(filteredSlipperList);

    const filteredTrouserList = trouserList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredTrouserList(filteredTrouserList);

    if (searchText.trim() === '') {
      scrollViewRef.current.scrollTo({ y: defaultScrollPosition, animated: true });
    } else {
      if (filteredTshirtList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 50, animated: true });
      } else if (filteredJacketList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 900, animated: true });
      } else if (filteredJeansList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 300, animated: true });
      } else if (filteredShoeList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 600, animated: true });
      } else if (filteredSlipperList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 1500, animated: true });
      } else if (filteredTrouserList.length > 0) {
        scrollViewRef.current.scrollTo({ y: 1800, animated: true });
      }
    }
  };

  const handleCategoryPress = (category) => {
    const ITEM_HEIGHT = 250;
    const categoryIndex = categoryList.findIndex((item) => item === category);
    const scrollPosition = categoryIndex * ITEM_HEIGHT;
    scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
  };

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  const scrollViewRef = useRef();

  return (
    <ScrollView ref={scrollViewRef} style={styles.container}>
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
            style={styles.searchInput}
            onChangeText={handleSearchInputChange}
            onSubmitEditing={handleSearch}
            value={searchText}
          />
        </Pressable>
        <TouchableOpacity style={styles.chatIcon}>
          <Icon
            name="chatbubble-ellipses-outline"
            size={26}
            color={'#0A8ED9'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>Favorites</Text>
        <FlatList
          data={categoryList}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => handleCategoryPress(item)} style={styles.categoryItem}>
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View style={styles.saleContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New T-shirt</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(tshirtList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Super summer sale</Text>
        </View>
        <FlatList
          data={filteredTshirtList.length > 0 ? filteredTshirtList : tshirtList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                }}
              />
            );
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Jeans</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(jeansList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredJeansList.length > 0 ? filteredJeansList : jeansList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                }}
              />
            );
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Shoes</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(shoeList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Trendy collection</Text>
        </View>
        <FlatList
          data={filteredShoeList.length > 0 ? filteredShoeList : shoeList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                }}
              />
            );
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Jacket</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(jacketList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Trendy collection</Text>
        </View>
        <FlatList
          data={filteredJacketList.length > 0 ? filteredJacketList : jacketList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                }}
              />
            );
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Slippers</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(slipperList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Summer collection</Text>
        </View>
        <FlatList
          data={filteredSlipperList.length > 0 ? filteredSlipperList : slipperList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(item));
                }}
              />
            );
          }}
        />
      </View>

      <View style={styles.newContainer}>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Trousers</Text>
            <View style={styles.spacer} />
            <TouchableOpacity onPress={() => handleViewAllPress(trouserList)}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>New Collection</Text>
        </View>
        <FlatList
          data={filteredTrouserList.length > 0 ? filteredTrouserList : trouserList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductItem
                item={item}
                onAddWishlist={x => {
                  dispatch(addToWishlist(x));
                }}
                onAddToCart={x => {
                  dispatch(addItemToCart(x));
                }}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f8f8f8',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  chatIcon: {
    marginLeft: 16,
  },
  categoryContainer: {
    marginVertical: 16,
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoryItem: {
    marginRight: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0A8ED9',
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  saleContainer: {
    marginBottom: 32,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  spacer: {
    flex: 1,
  },
  viewAllText: {
    fontSize: 14,
    color: '#0A8ED9',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  newContainer: {
    marginBottom: 32,
  },
});
