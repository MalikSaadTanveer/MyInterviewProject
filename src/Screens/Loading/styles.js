import React from 'react';
import {StyleSheet} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../Constants/colors';

const styles = ScaledSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.white,
        justifyContent:'center',
        alignItems:'center',  
    },
    text:{
        color:colors.primary,
        fontSize:'24@s'
    }
    
})
export default styles;