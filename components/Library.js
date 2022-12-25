import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Library = () => {
    return (
        <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text> Library </Text>
        </SafeAreaView>
    )
}

export default Library

const styles = StyleSheet.create({})