import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FavoriteItem = ({ item, onRemoveItem, addToCartFromFavorite }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperImageCheck}>
                <Image
                    source={{
                        uri: item.image,
                    }}
                    style={styles.productImage}
                />
            </View>

            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{'đ' + item.price}</Text>
                </View>

                <View style={styles.wrapperCardBottom}>
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCartFromFavorite(item)}
                    >
                        <View style={styles.buttonContent}>
                            <Icon name="cart" size={20} color="black" />
                            <Text style={styles.addButtonText}>Add to cart</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => onRemoveItem()}
                    >
                        <View style={styles.buttonContent}>
                            <AntDesign name="delete" size={20} color="black" />
                            <Text style={styles.removeButtonText}>Remove</Text>
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
    infoContainer: {
        justifyContent: 'space-between',
    },
    productName: {
        fontSize: 20,
        fontWeight: '500', // Sửa giá trị fontWeight thành giá trị hợp lệ
    },
    productPrice: {
        fontSize: 15,
    },
    wrapperCardBottom: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        borderWidth: 0,
        padding: 25,
        paddingLeft: 0,
        paddingRight: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginRight: 5,
        marginLeft: 0,
    },
    removeButton: {
        borderWidth: 0,
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 0,
        marginRight: 0,
        marginLeft: 40,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
    },
    removeButtonText: {
        color: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        marginLeft: 5,
    },
});
