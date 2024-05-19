import { View, Text, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress } from '../redux/actions/Actions';

const MyAddress = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const addressList = useSelector(state => state.AddressReducers);
    const dispatch = useDispatch();
    console.log(addressList);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        width: '100%',
                        height: 70,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        borderBottomWidth: 1,
                        borderBottomColor: '#e0e0e0',
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 7,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}>
                        <Image
                            source={require('../images/back.png')}
                            style={{ width: 24, height: 24 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '600', fontSize: 18 }}>My Address</Text>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 7,
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            navigation.navigate('AddAddress');
                        }}>
                        <Text style={{ color: '#007bff' }}>Add Address</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={addressList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                width: '90%',
                                borderWidth: 0.5,
                                borderColor: '#8e8e8e',
                                borderRadius: 10,
                                padding: 15,
                                marginVertical: 10,
                                alignSelf: 'center',
                                backgroundColor: '#fff',
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.2,
                                shadowRadius: 1.41,
                                elevation: 2,
                            }}>
                            <View>
                                <Text style={{ marginBottom: 5 }}>{'City: ' + item.city}</Text>
                                <Text style={{ marginBottom: 5 }}>{'Building: ' + item.building}</Text>
                                <Text>{'Pincode: ' + item.pincode}</Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 0.5,
                                    borderColor: '#ff0000',
                                    padding: 5,
                                    borderRadius: 5,
                                    alignSelf: 'flex-end',
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    dispatch(deleteAddress(index));
                                }}>
                                <Text style={{ color: '#ff0000' }}>Delete address</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};

export default MyAddress;
