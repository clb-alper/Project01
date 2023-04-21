import { Animated, StyleSheet, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from './assets/colors/colors';

const Skeleton = ({ width, height, style, backgroundColor }) => {
    const translateX = useRef(new Animated.Value(-width)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(translateX, {
                toValue: width,
                useNativeDriver: true,
                duration: 1300,
            })
        ).start()
    }, [width])



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
                    style={{ width: "180%", height: "100%" }}
                    colors={[
                        'transparent',
                        colors.blueLight,
                        colors.blueRegular,
                        colors.pinkRegular,
                        colors.pinkLight,
                        'transparent'
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

export default Skeleton
