import React from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import ProductItem from '../Components/ProductItem';
import { addItemToCart, addToWishlist } from '../redux/actions/Actions';

const CategoryProductList = ({ route }) => {
    const dispatch = useDispatch();
    const { productList } = route.params;
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../images/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Products</Text>
            </View>
            <FlatList
                data={productList}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                    <ProductItem
                        item={item}
                        onAddWishlist={(x) => { dispatch(addToWishlist(x)); }}
                        onAddToCart={(x) => { dispatch(addItemToCart(x)); }}
                    />
                )}
                contentContainerStyle={styles.listContent}
                numColumns={2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#0A8ED9',
        elevation: 4,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: 'white',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    listContent: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
});

export default CategoryProductList;
