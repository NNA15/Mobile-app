import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CheckoutItem = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperImageCheck}>
                <Image
                    source={{
                        uri: item.image
                    }}
                    style={styles.productImage}
                />
            </View>

            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{'đ' + item.price}</Text>
                <Text style={styles.itemQuantity}>Số lượng : {item.quantityorder}</Text>
            </View>
        </View>
    );
};

export default CheckoutItem;

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
        height: 100,
        marginHorizontal: 10,
    },
    itemDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
    itemPrice: {
        fontSize: 14,
        color: '#0A8ED9',
    },
    itemQuantity: {
        fontSize: 14,
        color: '#666',
    },
});
