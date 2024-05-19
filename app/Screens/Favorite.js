import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import FavoriteItem from '../Components/FavoriteItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist, addItemToCart } from '../redux/actions/Actions';

const Favorite = () => {
  const favoriteData = useSelector(state => state.Reducers2);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      <FlatList
        data={favoriteData}
        renderItem={({ item, index }) => (
          <FavoriteItem
            item={item}
            onRemoveItem={() => dispatch(removeFromWishlist(index))}
            addToCartFromFavorite={() => dispatch(addItemToCart(item))}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContent: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});
