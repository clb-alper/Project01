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
            <Animated.View style={{ transform: [{ translateY: translateY }] }}>
                <LinearGradient
                    style={{ width: 200, height: 800 }}
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


                        colors.purpleRegular,
                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.blueRegular,
                        colors.yellowRegular,
                        colors.purpleRegular,
                        colors.blueRegular,
                        colors.yellowRegular,



                    ]}

                    //start={{ x: 1, y: 1 }}

                    start={{ x: 0, y: 1 }}
                    end={{ x: 0, y: 0 }}
                //locations={[0.25, 0.50, 0.75]}
                >

                </LinearGradient>
            </Animated.View>

        </View>

    )
}

export default Rainbow
