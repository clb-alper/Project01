import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Skeleton from './Skeleton';
import colors from '../../colors/colors';
import { BoxShadow } from 'react-native-shadow';

const widthOfScreen = Dimensions.get('window').width

const ContReadingFlatlistSkeleton = () => {

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
        <View style={{ flexDirection: 'row', marginBottom: 37 }}>
            <View>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />

                    <Skeleton
                        height={8}
                        width={112}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 12, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>

            <View style={{ marginLeft: 25, }}>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />

                    <Skeleton
                        height={8}
                        width={112}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 12, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>

            <View style={{ marginLeft: 25 }}>
                <BoxShadow setting={shadowOpt}>
                    <Skeleton
                        height={188}
                        width={113}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 10, marginLeft: 25 }]}
                    />

                    <Skeleton
                        height={8}
                        width={112}
                        lHeight={'100%'}
                        lWidth={'300%'}
                        duration={1200}
                        backgroundColor={'rgba(0,0,0,0.05)'}
                        style={[{ borderRadius: 12, marginTop: 12, marginLeft: 25 }]}
                    />
                </BoxShadow>
            </View>
        </View>
    )
}

export default ContReadingFlatlistSkeleton

const styles = StyleSheet.create({})