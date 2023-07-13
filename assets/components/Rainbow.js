import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../colors/colors'
import { Easing } from "react-native";

// başlangıç noktasını parametre olarak ver ve diğer her yerde düzenle.
const Rainbow = ({ width, height, style, backgroundColor, duration, toValue, fromValue, lWidth, lHeight }) => {




    const translateX = useRef(new Animated.Value(fromValue)).current;
    const translateY = useRef(new Animated.Value(fromValue)).current;

    useEffect(() => {

        Animated.loop(
            Animated.timing(translateY, {
                toValue: toValue,
                useNativeDriver: true,
                duration: duration,
                easing: Easing.linear,
            })
        ).start()

        // Animasyon tam bittiği yerde başlıyor ama başlarken yavaş ondan biraz garip duruyor

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
                    style={{ width: lWidth, height: lHeight }}
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


                        // Sıra
                        // colors.purpleRegular,
                        // colors.blueRegular,
                        // colors.yellowRegular,
                        // colors.blueRegular,
                        // colors.yellowRegular,
                        // colors.purpleRegular,
                        // colors.blueRegular,
                        // colors.yellowRegular,

                        // '#FF0000',
                        // '#9400D3',
                        // '#4B0082',
                        // '#0000FF',
                        // '#00FF00',
                        // '#FFFF00',
                        // '#FF7F00',
                        // '#FF0000',
                        // '#9400D3',
                        // '#4B0082',
                        // '#0000FF',

                        '#9C4F96',
                        '#FF6355',
                        '#FBA949',
                        '#FAE442',
                        '#8BD448',
                        '#2AA8F2',
                        '#9C4F96',
                        '#FF6355',
                        '#FBA949',
                        '#FAE442',
                        '#8BD448',
                        '#2AA8F2',





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
