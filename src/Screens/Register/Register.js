import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Modal } from 'react-native';
import styles from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../Constants/colors';
import * as Animitable from 'react-native-animatable'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import navigationStrings from '../../Constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
    const [borders, setBorders] = useState({
        username: false,
        ph: false,
        cnic: false,
        email: false,
        pass: false,
        cPass: false,
    })
    const [data, setData] = useState({
        username: "",
        ph: "",
        cnic: "",
        email: "",
        pass: "",
        cPass: "",
    })
    const [error, setError] = useState({
        username: "",
        ph: "",
        cnic: "",
        email: "",
        pass: "",
        cPass: "",
    })
    const [showPassowrd, setShowPassowrd] = useState(false)
    const [showModal, setShowModal] = useState(false);

    
    

    const handleFocus = (name) => {
        setBorders(pre => (
            {
                ...pre,
                [name]: true,
            }
        ))
    }
    const handleBlur = (name) => {
        setBorders(pre => (
            {
                ...pre,
                [name]: false,
            }
        ))
        if (name === 'username')
            handleUser();
        else if (name === 'ph')
            handlePh();
        else if (name === 'cnic')
            handleCnic();
        else if (name === 'email')
            handleEmail();
        else if (name === 'pass')
            handlePassword();
        else if (name === 'cPass')
            handleCPassword();
    }

    const handleText = (text = "", name) => {
        if (name === 'ph') {
            text = addDashesInPhone(text);
        }
        else if (name === 'cnic') {
            text = addDashesInCnic(text);
        }
        setData(pre => ({
            ...pre,
            [name]: text,
        }))
    }

    const addDashesInPhone = (text = "") => {
        if (text.length > 4 && text.indexOf('-') < 0) {
            let t1 = text.slice(0, 4);
            let t2 = text.slice(4, text.length);
            return t1 + '-' + t2;
        }
        return text;

    }
    const addDashesInCnic = (text = "") => {
        let t1, t2;
        if (text.length > 5 && text.indexOf('-') < 0) {
            t1 = text.slice(0, 5);
            t2 = text.slice(5, text.length);
            return t1 + '-' + t2;
        }
        let arr = text.split('-');
        if (text.length > 13 && arr.length <= 2) {
            t1 = text.slice(0, 13);
            t2 = text.slice(13, text.length);
            return t1 + '-' + t2;
        }
        return text;
    }

    const handleUser = () => {
        if (data.username.trim().length < 5) {
            setError(pre => ({
                ...pre,
                username: 'Username must be 5 charaters long'
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                username: ''
            }))
            return true;
        }
    }
    const handlePh = () => {
        let pattern = new RegExp("^[0-9]{4}-[0-9]{7}$");

        if (!pattern.test(data.ph)) {
            setError(pre => ({
                ...pre,
                ph: 'Please enter correct phone number',
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                ph: ''
            }))
            return true;
        }

    }
    const handleCnic = () => {
        let pattern = new RegExp("^[0-9]{5}-[0-9]{7}-[0-9]$");
        if (!pattern.test(data.cnic)) {
            setError(pre => ({
                ...pre,
                cnic: 'Please enter correct cnic'
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                cnic: ''
            }))
            return true;
        }
    }
    const handleEmail = () => {
        const pattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!data.email.trim().match(pattern)) {
            setError(pre => ({
                ...pre,
                email: 'Email is not valid'
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                email: ''
            }))
            return true;
        }
    }
    const handlePassword = () => {
        if (data.pass.length < 6) {
            setError(pre => ({
                ...pre,
                pass: 'Password must be atleast 6 characters long'
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                pass: ''
            }))
            return true;
        }


    }
    const handleCPassword = () => {
        if (data.cPass.length < 6 || (data.pass != data.cPass)) {
            setError(pre => ({
                ...pre,
                cPass: 'Passwords are not matched'
            }))
            return false;
        } else {
            setError(pre => ({
                ...pre,
                cPass: ''
            }))
            return true;
        }
    }
    const handleRegister = () => {
        if (!data.username || !data.ph || !data.cnic || !data.email || !data.pass || !data.cPass) {
            handleUser(); handlePh(); handleCnic(); handleEmail(); handlePassword(); handleCPassword()
        }
        else if (handleUser() && handlePh() && handleCnic() && handleEmail() && handlePassword() && handleCPassword()) {
            setShowModal(true)

            setTimeout(() => {
                setShowModal(false)
                saveData()
                navigation.navigate(navigationStrings.Login)
            }, 3000);
        }
    }
    const saveData=async()=>{
        try {
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem('MyData',jsonValue)
        } catch (error) {
            console.warn(error);
        }
    }

    const SuccesModal = () => {
        return (
            <Modal visible={showModal} transparent={true} animationType='fade' >
                <View style={styles.modalContainer}>
                    <View style={styles.modalInner} >
                        <Text style={styles.modalText}>Register Successfully</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAwareScrollView extraHeight={120} enableOnAndroid={true} style={styles.container} >
                    <Animitable.View style={styles.header} animation="fadeInDownBig" >
                        <TouchableOpacity style={styles.headerIconContainer} onPress={() => navigation.goBack()}>
                            <Ionicons name="ios-arrow-back-outline" style={styles.headerIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Registration</Text>
                    </Animitable.View>

                    <Animitable.View animation="bounceInUp" style={styles.mainContainer}>

                        <TextInput placeholder="Username" placeholderTextColor={colors.gray}
                            style={[styles.input, borders.username && { borderColor: colors.primary, borderWidth: 3 }]}
                            onFocus={() => handleFocus('username')}
                            onBlur={() => handleBlur('username')}
                            value={data.username}
                            onChangeText={text => handleText(text, 'username')}
                        />
                        {error.username ? <Text style={styles.errors}>{error.username}</Text> : <></>}

                        <TextInput placeholder="Ph No. xxxx-xxxxxxx" placeholderTextColor={colors.gray}
                            style={[styles.input, borders.ph && { borderColor: colors.primary, borderWidth: 3 }]}
                            onFocus={() => handleFocus('ph')}
                            onBlur={() => handleBlur('ph')}
                            value={data.ph}
                            onChangeText={text => handleText(text, 'ph')}
                            keyboardType={'decimal-pad'}
                            maxLength={12}
                        />
                        {error.ph ? <Text style={styles.errors}>{error.ph}</Text> : <></>}

                        <TextInput placeholder="CNIC xxxxx-xxxxxxx-x" placeholderTextColor={colors.gray}
                            style={[styles.input, borders.cnic && { borderColor: colors.primary, borderWidth: 3 }]}
                            onFocus={() => handleFocus('cnic')}
                            onBlur={() => handleBlur('cnic')}
                            value={data.cnic}
                            onChangeText={text => handleText(text, 'cnic')}
                            keyboardType={'decimal-pad'}
                            maxLength={15}
                        />
                        {error.cnic ? <Text style={styles.errors}>{error.cnic}</Text> : <></>}
                        <TextInput placeholder="Email" placeholderTextColor={colors.gray}
                            style={[styles.input, borders.email && { borderColor: colors.primary, borderWidth: 3 }]}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            value={data.email}
                            onChangeText={text => handleText(text, 'email')}
                        />
                        {error.email ? <Text style={styles.errors}>{error.email}</Text> : <></>}
                        <View style={styles.passContainer}>
                            <TextInput placeholder="Password" placeholderTextColor={colors.gray} secureTextEntry={!showPassowrd ? true : false}
                                style={[styles.input, styles.passwordPadding, borders.pass && { borderColor: colors.primary, borderWidth: 3 }]}
                                onFocus={() => handleFocus('pass')}
                                onBlur={() => handleBlur('pass')}
                                value={data.pass}
                                onChangeText={text => handleText(text, 'pass')}
                            />
                            {
                                showPassowrd ?
                                    <Ionicons name="eye-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                                    : <Ionicons name="eye-off-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                            }
                        </View>
                        {error.pass ? <Text style={styles.errors}>{error.pass}</Text> : <></>}

                        <View style={styles.passContainer}>
                            <TextInput placeholder="Confirm Password" placeholderTextColor={colors.gray} secureTextEntry={!showPassowrd ? true : false}
                                style={[styles.input, styles.passwordPadding, borders.cPass && { borderColor: colors.primary, borderWidth: 3 }]}
                                onFocus={() => handleFocus('cPass')}
                                onBlur={() => handleBlur('cPass')}
                                value={data.cPass}
                                onChangeText={text => handleText(text, 'cPass')}
                            />
                            {
                                showPassowrd ?
                                    <Ionicons name="eye-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                                    : <Ionicons name="eye-off-outline" style={styles.eye} onPress={() => { setShowPassowrd(!showPassowrd); }} />
                            }
                        </View>
                        {error.cPass ? <Text style={styles.errors}>{error.cPass}</Text> : <></>}

                        <TouchableOpacity style={styles.btnContainer} onPress={handleRegister}>
                            <LinearGradient colors={colors.gradientColor} style={styles.btnContainer}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                                <Text style={styles.btn}>Register</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                    </Animitable.View>
                </KeyboardAwareScrollView>
            </SafeAreaView>

            <SuccesModal />
        </>
    );
};


export default Register;
