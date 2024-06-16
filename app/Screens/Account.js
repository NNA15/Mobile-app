import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const Account = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`http://192.168.1.122:8000/user/${userId}`);
        // Xử lý dữ liệu từ response tại đây
        console.log(response.data);
        const userName = response.data.name;
        setName(userName);
      } else {
        console.log("User ID invalid in AsyncStorage.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const logout = async () => {
    try {
      // Xóa token từ AsyncStorage
      await AsyncStorage.clear();
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            navigation.navigate('ChangePassword');
          }}>
          <Image
            source={require('../images/settings.png')}
            style={styles.settingsIcon}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../images/profile.png')}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{name}</Text>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('MyAddress');
        }}>
        <Text style={styles.menuText}>My Address</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => {
          navigation.navigate('Orders');
        }}>
        <Text style={styles.menuText}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}>
        <Text style={styles.menuText}>Offers</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem}
        onPress={() => {
          logout();
        }}
      >
        <Text style={styles.menuText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  settingsButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 30,
  },
  profileName: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 22,
    fontWeight: '600',
  },
  menuItem: {
    width: '90%',
    alignSelf: 'center',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  menuText: {
    fontSize: 18,
  },
});

export default Account;
