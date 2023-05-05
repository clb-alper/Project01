import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../colors/colors'

// başlangıç noktasını parametre olarak ver ve diğer her yerde düzenle.
const Rainbow = ({ width, height, style, backgroundColor, duration, toValue, fromValue }) => {


 

    const translateX = useRef(new Animated.Value(fromValue )).current;
  
    useEffect(() => {
 
        Animated.loop(
            Animated.timing(translateX, {
                toValue: toValue,
                useNativeDriver: true,
                duration: duration,
            }) 
        ).start()

    }, [])

  



    return (
        <View
            style={StyleSheet.flatten([
                {
                    width: width,
                    height: height,
                    backgroundColor: backgroundColor,
                    overflow: "hidden",
                },
                style,

            ])}>
            <Animated.View style={{ width: "100%", height: "100%", transform: [{ translateX: translateX }] }}>
                <LinearGradient
                    style={{ width: "900%", height: "100%" }}
                    colors={[

                        // colors.blueLight,
                        // colors.blueRegular,
                        // colors.yellowLight,
                        // colors.yellowRegular,
                        // colors.purpleLight,
                        // colors.purpleRegular,
                        // colors.greenLight,
                        // colors.greenRegular,
                        // colors.blueRegular,
                        // colors.blueLight,
                        // colors.blueRegular,

      
                        colors.yellowRegular,             
                        colors.purpleRegular,          
                        colors.greenRegular,
                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.purpleRegular,
                        colors.greenRegular,
                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.purpleRegular,
                        colors.greenRegular,
                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.purpleRegular,
                        colors.greenRegular,
                        colors.blueRegular,

    

    
                    ]}

                    //start={{ x: 1, y: 1 }}

                    start={{ x: 0.2, y: 0.3 }}
                    end={{ x: 0.7, y: 0.8 }}
                >

                </LinearGradient>
            </Animated.View>

        </View>

    )
}

export default Rainbow
