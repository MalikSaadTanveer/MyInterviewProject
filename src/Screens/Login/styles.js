import React from 'react';
import {StyleSheet} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters';
import colors from '../../Constants/colors';

const styles = ScaledSheet.create({
    container:{
        flex:1,
    },
    header:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    headerLogo:{
        color:'white',
        fontSize:"30@s",
        opacity:1
    },
    card:{
        flex:3,
        width:'100%',
        backgroundColor:'white',
        borderTopLeftRadius:40,
        borderTopRightRadius:40,
        elevation:10,
    },
    cardHeader:{
        margin:'24@s',
        marginTop:'30@s',
        color:colors.primary,
        fontSize:'24@s',
    },
    cardContainer:{
        paddingHorizontal:'20@s',
    },
    input:{
        color:colors.primary,
        borderWidth:1,
        borderColor:'black',
        padding:'12@s',
        fontSize:'16@s',
        borderRadius:"6@s",
        marginTop:'16@s',
        width:'100%',
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
    errors:{
        color:'red',
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
    text:{
        color:'black',
        fontSize:'18@s',
        alignSelf:'center',
        marginTop:'40@s',
    },
    accountContainer:{
        flexDirection:'row',
        marginTop:'40@s',

    },
    need:{
        color:'black',
        fontSize:'14@s',
        marginRight:'6@s',
        marginTop:'5@s',
    },
    reg:{
        color:'#159957',
        fontSize:'18@s',

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
        color:colors.primary,
        fontSize:"18@s"
    }
    
})
export default styles;