import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Skeleton from './Skeleton';
import colors from '../colors/colors';
import { BoxShadow } from 'react-native-shadow';

const widthOfScreen = Dimensions.get('window').width

const FlatlistSkeleton = () => {

    const shadowOpt = {
        width: 110,
        height: 183,
        color: "#000",
        border: 6,
        radius: 12,
        opacity: 0.10,
        x: 22,
        y: 20,
    }

    return (
        <View style={{ flexDirection: 'row', marginBottom: 47 }}>
            <View>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        backgroundColor={colors.grayProgressBarBG}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>

            <View style={{ marginLeft: 25, }}>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        backgroundColor={colors.grayProgressBarBG}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>

            <View style={{ marginLeft: 25 }}>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        backgroundColor={colors.grayProgressBarBG}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>
        </View>
    )
}

export default FlatlistSkeleton

const styles = StyleSheet.create({})