import { View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign'


const CartItem = ({ item, onCheckItem, addQuantity, reduceQuantity, onRemoveItem }) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapperImageCheck}>
                <TouchableOpacity style={styles.button} onPress={onCheckItem}>
                    <Text style={styles.iconPlus}>{item.selected ? "V " : ""}</Text>
                </TouchableOpacity>
                <Image
                    source={
                        item.image
                    }
                    style={styles.productImage}
                />
            </View>

            <View style={{ justifyContent: 'space-between' }}>
                <View>
                    <Text>{item.name}</Text>
                    <Text>{'đ' + item.price}</Text>
                </View>

                <View style={styles.wrapperCardBottom}>
                    <TouchableOpacity style={styles.button} onPress={reduceQuantity}>
                        <Text style={{ color: 'black', fontWeight: '600' }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ paddingHorizontal: 12 }}>{item.quantity}</Text>
                    <TouchableOpacity style={[styles.button, { borderColor: 'green' }]} onPress={addQuantity}>
                        <Text style={styles.iconPlus}>+</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            borderWidth: 0,
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            marginRight: 5,
                            marginLeft: 100,
                        }}
                        onPress={() => {
                            onRemoveItem();
                        }}>
                        <AntDesign name="delete" size={20} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default CartItem;

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