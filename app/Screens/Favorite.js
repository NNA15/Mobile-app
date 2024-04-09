import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import FavoriteItem from '../Components/FavoriteItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, addItemToCart } from '../redux/actions/Actions';


const Favorite = () => {
  const [favoriteList, setfavoriteList] = useState([]);
  const favoriteData = useSelector(state => state.Reducers2);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoriteData}
        renderItem={({ item, index }) => {
          return <FavoriteItem item={item}
            onRemoveItem={() => { dispatch(removeFromWishlist(index)); }}
            addToCartFromFavorite={x => { dispatch(addItemToCart(item)) }}
          />;
        }}
      />
    </View>
  );
};

export default Favorite;
