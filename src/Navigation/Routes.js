import React, { useEffect, useState } from 'react';
import { View, Text, } from 'react-native';
import {
    Login,
    Register,
    Dashboard,
    Loading
} from '../Screens'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import navigationStrings from '../Constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Routes = () => {
    const [showDashboard, setshowDashboard] = useState(false)
    const [showNavigation, setshowNavigation] = useState(false)
    useEffect(() => {
      checkScreen()
    }, [])

    let checkScreen = async () => {
        let flag = await AsyncStorage.getItem('MyFlag');
        if(flag === 'true'){
            setshowDashboard(true)
        }
        else{
            setshowDashboard(false)
        }
        setshowNavigation(true)
    }
    
    const Stack = createNativeStackNavigator();
    return (
        <>  
        {
            showNavigation ?
        
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName={showDashboard? navigationStrings.Dashboard: navigationStrings.Login}
                    screenOptions={{ headerShown: false, }}
                    >
                    <Stack.Screen name={navigationStrings.Login} component={Login} />
                    <Stack.Screen name={navigationStrings.Register} component={Register} />
                    <Stack.Screen name={navigationStrings.Dashboard} component={Dashboard} />
                </Stack.Navigator>
            </NavigationContainer>
            :
            <>
                <Loading/>
            </>
        }
        </>
    );
};


export default Routes;
