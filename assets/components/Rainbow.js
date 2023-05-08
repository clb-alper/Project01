import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../colors/colors'

// başlangıç noktasını parametre olarak ver ve diğer her yerde düzenle.
const Rainbow = ({ width, height, style, backgroundColor, duration, toValue, fromValue }) => {




    const translateX = useRef(new Animated.Value(fromValue)).current;
    const translateY = useRef(new Animated.Value(fromValue)).current;

    useEffect(() => {

        Animated.loop(
            Animated.timing(translateX, {
                toValue: toValue,
                useNativeDriver: true,
                duration: duration,
            })
        ).start()

        Animated.loop(
            Animated.timing(translateY, {
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
            <Animated.View style={{ transform: [{ translateX: translateX }, { translateY: translateY }] }}>
                <LinearGradient
                    style={{ width: 200, height: 200, borderRadius: 999 }}
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


                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.purpleRegular,
                        colors.yellowRegular,
                        colors.blueRegular,
                       
                    ]}

                    //start={{ x: 1, y: 1 }}

                    start={{ x: 1, y: 1 }}
                    end={{ x: 0, y: 0 }}
                //locations={[0.25, 0.50, 0.75]}
                >

                </LinearGradient>
            </Animated.View>

        </View>

    )
}

export default Rainbow
