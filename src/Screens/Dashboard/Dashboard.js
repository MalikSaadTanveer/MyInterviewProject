import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import navigationStrings from '../../Constants/navigationStrings';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Constants/colors';
import styles from './styles';
import * as Animitable from 'react-native-animatable'
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

colors
const Dashboard = ({ navigation }) => {
    const [data, setData] = useState({
        username: 'Loading...',
        ph: 'Loading...',
        cnic: 'Loading...',
        email: 'Loading...'
    })
    useEffect(() => {
      getData()
    }, [])
    
    const getData = async()=>{
        const jsonValue = await AsyncStorage.getItem('MyData');
        const value = jsonValue !=null ? JSON.parse(jsonValue) : null;

        if(value != null){
            const {username,ph,cnic,email} = value;
            setData({
                username,ph,cnic,email
            })
        }
    }

    let handleLogout = () => {
        logout()
        navigation.replace(navigationStrings.Login)
    }

    let logout = async () => {
        try {
            await AsyncStorage.removeItem('MyFlag')
        } catch (error) {

        }
    }
    return (
        <LinearGradient colors={colors.gradientColor}
            style={styles.container}>
            <Animitable.View style={styles.header} animation="fadeInDownBig" >
                <TouchableOpacity style={styles.headerIconContainer} onPress={handleLogout}>
                    <AntDesign name="logout" style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Dashboard</Text>
            </Animitable.View>

            <View style={styles.mainContainer}>

            <Ionicons name="ios-person-circle-outline" style={styles.person}/>
                <View style={styles.containerInner}>
                    <Text style={styles.mainText} >Name:</Text>
                    <TextInput style={styles.mainInput}   value={data.username}/>
                </View>
                <View style={styles.containerInner}>
                    <Text style={styles.mainText} >Phone:</Text>
                    <TextInput style={styles.mainInput}   value={data.ph}/>
                </View>
                <View style={styles.containerInner}>
                    <Text style={styles.mainText} >CNIC:</Text>
                    <TextInput style={styles.mainInput}   value={data.cnic}/>
                </View>
                <View style={styles.containerInner}>
                    <Text style={styles.mainText} >Email:</Text>
                    <TextInput style={styles.mainInput}    value={data.email}/>
                </View>
            </View>
        </LinearGradient
        >
    );
};



export default Dashboard;
