import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Skeleton from './Skeleton';
import colors from '../../colors/colors';
import { BoxShadow } from 'react-native-shadow';

const widthOfScreen = Dimensions.get('window').width

const FeaturedFlatlistSkeleton = () => {

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
        <View style={{ flexDirection: 'row', marginBottom: 13 }}>
            <View>

                <Skeleton
                    height={210}
                    width={widthOfScreen}
                    lHeight={'100%'}
                    lWidth={'200%'}
                    duration={1200}
                    backgroundColor={'rgba(0,0,0,0.05)'}
                    style={[{ marginTop: 17 }]}
                />
            </View>
        </View>
    )
}

export default FeaturedFlatlistSkeleton

const styles = StyleSheet.create({})