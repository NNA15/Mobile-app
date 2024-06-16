import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, Alert } from 'react-native';
import CommonButton from '../Components/CommonButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const navigation = useNavigation();

    const handleChangePassword = async() => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('New password and confirm password must match');
            return;
        }
        try {
            const userId = await AsyncStorage.getItem("userId");
            const response = await axios.post('http://192.168.1.122:8000/user/change_password', {
              userId: userId, // Thay userId bằng giá trị userId của người dùng hiện tại
              currentPassword: oldPassword,
              newPassword: newPassword
            });
        
            // Xử lý phản hồi từ API nếu cần
            console.log(response.data); // In ra thông báo từ API nếu cần
            Alert.alert("Thay đổi Password thành công.");
            // Đặt lại các trường thông tin
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setError('');
          } catch (error) {
            // Xử lý lỗi từ API
            console.error('Error changing password:', error);
            setError('Error changing password. Please try again.');
          }
        
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => {
                        navigation.goBack();
                    }}>
                    <Image
                        source={require('../images/back.png')}
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>Change Password</Text>
                <View style={styles.placeholder}></View>
            </View>
            <View style={styles.content}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Old Password"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        secureTextEntry
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="New Password"
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry={!showNewPassword}
                        style={styles.textInput}
                    />
                    <TouchableOpacity
                        style={styles.eyeButton}
                        onPress={() => setShowNewPassword(!showNewPassword)}
                    >
                        <Image
                            source={showNewPassword ? require('../images/visible.png') : require('../images/hide.png')}
                            style={styles.eyeIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        style={styles.textInput}
                    />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <CommonButton title="Change Password" bgColor={'#0A8ED9'} textColor={'white'} onPress={handleChangePassword} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 70,
        paddingHorizontal: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
    },
    backButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    title: {
        fontWeight: '600',
        fontSize: 18,
    },
    placeholder: {
        width: 30,
        height: 30,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
        position: 'relative',
    },
    textInput: {
        width: '100%',
        paddingRight: 40, // Add padding to the right to make space for the eye icon
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 10,
        fontSize: 16,
    },
    eyeButton: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -12 }], // Center the icon vertically
    },
    eyeIcon: {
        width: 24,
        height: 24,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default ChangePassword;
