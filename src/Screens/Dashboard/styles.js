import React from 'react';
import {StyleSheet} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../Constants/colors';

const styles = ScaledSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        width:'100%',
    },
    header:{
        // flex:1,
        position: 'relative',
        alignItems:'center',
        marginVertical:'20@s',
        marginHorizontal:'20@s',
    },
    headerIconContainer:{
        position:'absolute',
        right:'0@s',
        top:'6@s',
    },
    headerIcon:{
        color:colors.white,
        fontSize:'26@s',
    },
    headerText:{
        color:colors.white,
        fontSize:'30@s',
        marginTop:'30@s',
    },
    mainContainer:{
        borderRadius:'20@s',
        paddingVertical:'20@s',
        backgroundColor:colors.white,
        justifyContent :'center',
        alignItems:'center',
        flexDirection:'column',
        marginHorizontal:'20@s',
        marginVertical:'20@s'

        
        
    },
    containerInner:{
        
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        width:'100%',
        paddingHorizontal:'10@s',
        marginBottom:'6@s',
    },
    mainText:{
        flex:1,
        color:colors.primary,
        fontSize:'18@s',
        fontWeight:'400',
        backgroundColor:'white',
    },
    mainInput:{
        flex:3,
        paddingHorizontal:'6@s',
        borderRadius:'6@s',
        backgroundColor:colors.primary,
        fontSize:'16@s',
        color:colors.white,  
    },
    person:{
        color:colors.primary,
        fontSize:'120@s'
    },
})
export default styles;