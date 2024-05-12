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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ProductItem from '../Components/ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';
import axios from 'axios';

const Home = () => {

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

  // lưu giá trị khi nhập vào ô search
  const handleSearchInputChange = (text) => {
    setSearchText(text); // Lưu giá trị của TextInput vào state
  };

  // Hàm xử lý search , lưu các danh sách tìm kiếm được vào danh sách mới.
  const handleSearch = () => {
    const defaultScrollPosition = 0;
    const tshirtListPosition = 50;
    const jeansListPosition = 300;
    const shoeListPosition = 600;
    const jacketListPosition = 900;
    const slipperListPosition = 1200;
    const trouserListPosition = 1500;

    console.log('Searching for:', searchText);

    const filteredTshirtList = tshirtList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Tshirt List:', filteredTshirtList);
    setFilteredTshirtList(filteredTshirtList);

    const filteredJacketList = jacketList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Jacket List:', filteredJacketList);
    setFilteredJacketList(filteredJacketList);

    const filteredJeansList = jeansList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Jeans List:', filteredJeansList);
    setFilteredJeansList(filteredJeansList);

    const filteredShoeList = shoeList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Shoe List:', filteredShoeList);
    setFilteredShoeList(filteredShoeList);

    const filteredSlipperList = slipperList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Slippers List:', filteredSlipperList);
    setFilteredSlipperList(filteredSlipperList);

    const filteredTrouserList = trouserList.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
    console.log('Filtered Trousers List:', filteredTrouserList);
    setFilteredTrouserList(filteredTrouserList);
    if (searchText.trim() === '') {
      // Nếu searchText rỗng, cuộn đến vị trí mặc định
      scrollViewRef.current.scrollTo({ y: defaultScrollPosition, animated: true });
    } else {
      if (filteredTshirtList.length > 0) {
        // You might need to adjust the yOffset according to your UI
        scrollViewRef.current.scrollTo({ y: tshirtListPosition, animated: true });
      } else if (filteredJacketList.length > 0) {
        scrollViewRef.current.scrollTo({ y: jacketListPosition, animated: true });
      } else if (filteredJeansList.length > 0) {
        scrollViewRef.current.scrollTo({ y: jeansListPosition, animated: true });
      } else if (filteredShoeList.length > 0) {
        scrollViewRef.current.scrollTo({ y: shoeListPosition, animated: true });
      } else if (filteredSlipperList.length > 0) {
        scrollViewRef.current.scrollTo({ y: slipperListPosition, animated: true });
      } else if (filteredTrouserList.length > 0) {
        scrollViewRef.current.scrollTo({ y: trouserListPosition, animated: true });
      }
    }
  };

  const handleCategoryPress = (category) => {
    const ITEM_HEIGHT = 250;
    // Xác định vị trí của danh mục trong danh sách categoryList
    const categoryIndex = categoryList.findIndex((item) => item.category === category);

    // Xác định vị trí cuộn để đến danh mục này, có thể cần điều chỉnh tùy thuộc vào giao diện của bạn
    const scrollPosition = categoryIndex * ITEM_HEIGHT; // Thay ITEM_HEIGHT bằng chiều cao của mỗi mục trong danh sách

    // Cuộn xuống vị trí tương ứng
    scrollViewRef.current.scrollTo({ y: scrollPosition, animated: true });
  };

  const scrollViewRef = useRef();

  useEffect(() => {
    fetchData();
    let tempCategory = [];
    product.map(item => {
      tempCategory.push(item);
    })
    console.log(tempCategory);
    console.log(tshirtList);
    console.log("category:", categoryList);
  }, []);

  const fetchData = async () => {
    try {
      const respose = await axios.get('http://192.168.1.15:8000/product');
      const fetchProducts = respose.data;
      if (fetchProducts) {
        setProduct(fetchProducts);

        const categories = Array.from(new Set(fetchProducts.map(product => product.category)));
        const categorizedProducts = {};
        categories.forEach(category => {
          setCategoryList(category);
          categorizedProducts[category] = fetchProducts.filter(product => product.category === category);
        });

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

  const items = useSelector(state => state);
  console.log(items);
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
            onChangeText={handleSearchInputChange} // Gọi hàm này mỗi khi TextInput thay đổi
            onSubmitEditing={handleSearch}
            value={searchText} // Đặt giá trị của TextInput thành giá trị của state

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
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => handleCategoryPress(item.category)} style={[styles.categoryItem, { flexDirection: 'row', flex: 1 }]}>
                <Text style={styles.categoryText}>{item.category}</Text>
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
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>Super summer sale</Text>
        </View>
        <FlatList
          data={filteredTshirtList.length > 0 ? filteredTshirtList : tshirtList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredJeansList.length > 0 ? filteredJeansList : jeansList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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
            <Text style={styles.sectionTitle}>New Shoe</Text>
            <View style={styles.spacer} />
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredShoeList.length > 0 ? filteredShoeList : shoeList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredJacketList.length > 0 ? filteredJacketList : jacketList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredSlipperList.length > 0 ? filteredSlipperList : slipperList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionDescription}>You've seen it before!</Text>
        </View>
        <FlatList
          data={filteredTrouserList.length > 0 ? filteredTrouserList : trouserList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
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


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  searchContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: 375,
    height: 140,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    flex: 1,
    borderRadius: 20,
    gap: 15,
    height: 38,
    margin: 5,
    marginHorizontal: 15,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  searchInput: {
    width: '100%',
  },
  notificationIcon: {
    // margin: 5,
    position: 'absolute',
    left: 340,
    top: 30,
    marginLeft: 20,
    marginTop: 0,
  },
  chatIcon: {
    margin: 5,
    position: 'absolute',
    left: 360,
    top: 50,
    marginLeft: 20,
    marginHorizontal: 10,
  },
  categoryContainer: {
    marginTop: -10,
    paddingBottom: 10,
  },
  categoryTitle: {
    fontSize: 34,
    color: 'black',
    fontWeight: '700',
    paddingBottom: 10,
    paddingLeft: 10,
  },
  categoryItem: {
    backgroundColor: '#0A8ED9',
    marginLeft: 10,
    //borderWidth: 1,
    width: 100,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryText: {
    textAlign: 'center',
    color: 'white',
    marginLeft: 10, marginRight: 10
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
    fontSize: 34,
    color: 'black',
    fontWeight: '500',
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
    marginTop: 20,
    fontSize: 18,
    marginLeft: 20,
    fontWeight: '600',
    color: '#000',
  },


});

export default Home;
