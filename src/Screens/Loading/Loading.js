import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import styles from './styles';
import * as Animitable from 'react-native-animatable'

const MyComponent = () => {
    return (
        <View style={styles.container}>
            <Animitable.Text iterationCount="infinite" animation="tada" easing="ease-out" 
            style={styles.text}>Loading...</Animitable.Text>
            
        </View>
    
    );
};

export default MyComponent;
