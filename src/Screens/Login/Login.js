import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Constants/colors';
import styles from './styles'
import * as Animitable from 'react-native-animatable'
import navigationStrings from '../../Constants/navigationStrings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [data, setData] = useState({
        email: '',
        pass: '',
    });
    const [errors, setErrors] = useState({
        emailError: "",
        passError: ""
    })

    const [emailBorder, setEmailBorder] = useState(false);
    const [passBorder, setPassBorder] = useState(false);
    const [showPassowrd, setShowPassowrd] = useState(false)
    const [showModal, setShowModal] = useState({
        flag: false,
        message: ''
    })


    const handleText = (text, name) => {
        setData(pre => ({ ...pre, [name]: text }));
    }

    const handleEmail = () => {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (data.email.trim().match(regex)) {
            setErrors(pre => ({ ...pre, emailError: '' }))
            return true;
        }
        else {
            setErrors(pre => ({ ...errors, emailError: 'Email is invalid' }))
            return false;
        }
    }
    const handleEmailBlur = () => {
        setEmailBorder(false)
        handleEmail();
    }

    const handlePass = () => {
        if (data.pass.length >= 6) {
            setErrors(pre => ({ ...pre, passError: '' }))
            return true
        }
        else {
            setErrors(pre => ({ ...pre, passError: 'Password must be atleast 6 characters long' }))
            return false
        }
    }
    const handlePassBlur = () => {
        setPassBorder(false)
        handlePass()
    }


    const handleLogin = () => {
        if (data.email.trim() && data.pass) {
            if (handleEmail() && handlePass()) {
                checkData()
            }
        }
        else
            handleEmail()
        handlePass()
    }

    const checkData = async () => {
        try {
            let value = await AsyncStorage.getItem('MyData');
            const  jsonValue= value? JSON.parse(value) : null;
            
            if (jsonValue != null) {
                if (jsonValue.email.trim() === data.email.trim() && jsonValue.pass === data.pass) {
                    setShowModal({ message: 'Login Successfully', flag: true })
                    setTimeout(() => {
                        setShowModal({ message: '', flag: false })
                        handleDashboard();
                        navigation.replace(navigationStrings.Dashboard)
                    }, 3000);
                }
                else {
                    setShowModal({ message: 'Email or Password are invalid', flag: true })
                    setTimeout(() => {
                        setShowModal({ message: '', flag: false })
                    }, 3000);
                }
            }
            else {
                setShowModal({ message: 'Email or Password are invalid', flag: true })
                setTimeout(() => {
                    setShowModal({ message: '', flag: false })
                }, 3000);
            }
            
        }
        catch (error) {
            console.warn(error);
        }
    }

    const handleDashboard = async()=>{
        try {
            await AsyncStorage.setItem('MyFlag','true')
        } catch (error) {
            
        }
    }

    const SuccesModal = () => {
        return (
            <Modal visible={showModal.flag} transparent={true} animationType='fade' >
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} >
                        <Text style={styles.modalText}>{showModal.message}</Text>
                    </View>
                </View>
            </Modal>
        )
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={colors.gradientColor} style={styles.container}>

                    <Animitable.View style={styles.header} animation="bounceIn">
                        <Text style={styles.headerLogo}>ManiWebify</Text>
                    </Animitable.View>

                    <Animitable.View style={styles.card} animation="fadeInUpBig">
                        <Text style={styles.cardHeader} >Welcome!</Text>

                        <View style={styles.cardContainer}>
                            <KeyboardAwareScrollView extraHeight={120} enableOnAndroid={true} style={styles.cardcontainer} >
                                <TextInput placeholder="Email" placeholderTextColor={colors.gray}
                                    style={[styles.input, emailBorder && { borderColor: colors.primary, borderWidth: 3 }]}
                                    value={data.email}
                                    name="email"
                                    onChangeText={(text) => handleText(text, 'email')}
                                    onFocus={() => setEmailBorder(true)}
                                    onBlur={handleEmailBlur} />
                                {errors.emailError ?
                                    <Text style={styles.errors}>{errors.emailError}</Text> : <></>}

                                <View style={styles.passContainer}>
                                    <TextInput placeholder="Password" secureTextEntry={!showPassowrd ? true : false} placeholderTextColor={colors.gray}
                                        style={[styles.input, styles.passwordPadding, passBorder && { borderColor: colors.primary, borderWidth: 3 }]}
                                        value={data.pass}
                                        name="pass"
                                        onChangeText={(text) => handleText(text, 'pass')}
                                        onFocus={() => setPassBorder(true)}
                                        onBlur={handlePassBlur} />
                                    {
                                        showPassowrd ?
                                            <Ionicons name="eye-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                                            : <Ionicons name="eye-off-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                                    }

                                </View>
                                {errors.passError ?
                                    <Text style={styles.errors}>{errors.passError}</Text> : <></>}

                                <TouchableOpacity style={styles.btnContainer} onPress={handleLogin}>
                                    <LinearGradient colors={colors.gradientColor} style={styles.btnContainer}
                                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                        <Text style={styles.btn}>Login</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <Text style={styles.text}>_______ or _______</Text>
                                <View style={styles.accountContainer}>
                                    <Text style={styles.need}>Need an account?</Text>
                                    <TouchableOpacity>
                                        <Text style={styles.reg} onPress={() => navigation.navigate(navigationStrings.Register)}>Register </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAwareScrollView>
                        </View>
                    </Animitable.View>

                </LinearGradient>

            </SafeAreaView>
            <SuccesModal />
        </>
    );
};


export default Login;
