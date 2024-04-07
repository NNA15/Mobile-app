import { View, TouchableOpacity, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'

const FavoriteItem = ({ item, onRemoveItem, addToCartFromFavorite }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperImageCheck}>
                <Image
                    source={
                        item.image
                    }
                    style={styles.productImage}
                />
            </View>

            <View style={{ wejustifyContent: 'space-between' }}>
                <View>
                    <Text style={{ fontSize: 20, fontWeight: 15 }}>{item.name}</Text>
                    <Text style={{ fontSize: 15 }}>{'đ' + item.price}</Text>
                </View>

                <View style={styles.wrapperCardBottom}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 0,
                            padding: 25,
                            paddingLeft: 0,
                            paddingRight: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginRight: 5,
                            marginLeft: 0,
                        }}
                        onPress={() => {
                            //console.log("Add to Cart button clicked");
                            addToCartFromFavorite(item);
                        }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="cart" size={20} color="black" />
                            <Text style={{ color: 'black', borderWidth: 0.5, borderRadius: 10, padding: 5, marginLeft: 5 }}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            borderWidth: 0,
                            padding: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 0,
                            marginRight: 0,
                            marginLeft: 40,
                        }}
                        onPress={() => {
                            onRemoveItem();
                        }}>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <AntDesign name="delete" size={20} color="black" />
                            <Text style={{ color: 'black', borderWidth: 0.5, borderRadius: 10, padding: 5, marginLeft: 5, }}>Remove</Text>
                        </View>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default FavoriteItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    wrapperImageCheck: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 120,
        height: 120,
        marginHorizontal: 10,
    },
    button: {
        borderWidth: 0.5,
        borderRadius: 4,
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPlus: {
        color: 'black',
        fontWeight: '600',
    },
    wrapperCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});