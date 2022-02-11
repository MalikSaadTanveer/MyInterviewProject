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
        flex:1,
        position: 'relative',
        alignItems:'center',
        marginVertical:'20@s',
        marginHorizontal:'20@s',
    },
    headerIconContainer:{
        position:'absolute',
        left:'0@s',
        top:'6@s',
    },
    headerIcon:{
        color:colors.primary,
        fontSize:'26@s',
    },
    headerText:{
        color:colors.primary,
        fontSize:'30@s',
        marginTop:'30@s',
    },
    mainContainer:{
        flex:10,
        width:'100%',
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
        paddingHorizontal:'20@s',
        // backgroundColor:'red'
    },
    input:{
        color:colors.primary,
        borderWidth:1,
        borderColor:colors.black,
        padding:'12@s',
        fontSize:'16@s',
        borderRadius:"6@s",
        marginTop:'16@s',
        width:'100%',
        
    },
    btnContainer:{
        width:'140@s',
        padding:'12@s',
        borderRadius:'6@s',
        alignSelf:'center',
        marginTop:'10@s',
    },
    btn:{
        color:'white',
        textAlign:'center',
        fontSize:'16@s',
    },
    errors:{
        color:'red',
    },
    passwordPadding:{
        paddingRight:'60@s'
    },
    passContainer:{
        position:'relative',

    },
    eye:{
        color:'black',
        fontSize:'26@s',
        width:'40@s',
        position:'absolute',
        right:'8@s',
        bottom:'10@s',
        zIndex:100,
        // backgroundColor:'white',
        paddingHorizontal:'4@s'
    },
    modalContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        paddingHorizontal:'20@s'
    },
    modalInner:{
        backgroundColor: '#fff',
        width: '100%',
        height: '80@s',
        alignItems: 'center',
        borderRadius: 10,
        elevation: 4,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    modalText:{
        color:'green',
        fontSize:"22@s"
    }
})
export default styles;