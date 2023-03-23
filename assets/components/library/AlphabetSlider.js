import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import colors from '../../colors/colors';

var heightOfScreen = Dimensions.get('window').height; //full width

const AlphabetSlider = () => {
    return (
        <ScrollView
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            style={[styles.alphabetScrollStyle, styles.boxShadow]}>


            <View style={[styles.alphabetViewStyle, styles.boxShadow]}>

                <Text onPress={() => console.log("A")}
                    style={[styles.alphabetLettersStyle, { marginTop: 15 }]}>A</Text>

                <Text onPress={() => console.log("B")}
                    style={styles.alphabetLettersStyle}>B</Text>

                <Text onPress={() => console.log("C")}
                    style={styles.alphabetLettersStyle}>C</Text>

                <Text onPress={() => console.log("Ç")}
                    style={styles.alphabetLettersStyle}>Ç</Text>

                <Text onPress={() => console.log("D")}
                    style={styles.alphabetLettersStyle}>D</Text>

                <Text onPress={() => console.log("E")}
                    style={styles.alphabetLettersStyle}>E</Text>

                <Text onPress={() => console.log("F")}
                    style={styles.alphabetLettersStyle}>F</Text>

                <Text onPress={() => console.log("A")}
                    style={[styles.alphabetLettersStyle]}>G</Text>

                <Text onPress={() => console.log("B")}
                    style={styles.alphabetLettersStyle}>H</Text>

                <Text onPress={() => console.log("C")}
                    style={styles.alphabetLettersStyle}>I</Text>

                <Text onPress={() => console.log("Ç")}
                    style={styles.alphabetLettersStyle}>İ</Text>

                <Text onPress={() => console.log("D")}
                    style={styles.alphabetLettersStyle}>J</Text>

                <Text onPress={() => console.log("E")}
                    style={styles.alphabetLettersStyle}>K</Text>

                <Text onPress={() => console.log("F")}
                    style={styles.alphabetLettersStyle}>L</Text>

                <Text onPress={() => console.log("B")}
                    style={styles.alphabetLettersStyle}>M</Text>

                <Text onPress={() => console.log("C")}
                    style={styles.alphabetLettersStyle}>N</Text>

                <Text onPress={() => console.log("Ç")}
                    style={styles.alphabetLettersStyle}>O</Text>

                <Text onPress={() => console.log("D")}
                    style={styles.alphabetLettersStyle}>Ö</Text>

                <Text onPress={() => console.log("E")}
                    style={styles.alphabetLettersStyle}>P</Text>

                <Text onPress={() => console.log("F")}
                    style={styles.alphabetLettersStyle}>R</Text>

                <Text onPress={() => console.log("A")}
                    style={[styles.alphabetLettersStyle]}>S</Text>

                <Text onPress={() => console.log("B")}
                    style={styles.alphabetLettersStyle}>Ş</Text>

                <Text onPress={() => console.log("C")}
                    style={styles.alphabetLettersStyle}>T</Text>

                <Text onPress={() => console.log("Ç")}
                    style={styles.alphabetLettersStyle}>U</Text>

                <Text onPress={() => console.log("D")}
                    style={styles.alphabetLettersStyle}>Ü</Text>

                <Text onPress={() => console.log("E")}
                    style={styles.alphabetLettersStyle}>V</Text>

                <Text onPress={() => console.log("F")}
                    style={styles.alphabetLettersStyle}>Y</Text>

                <Text onPress={() => console.log("F")}
                    style={styles.alphabetLettersStyle}>Z</Text>
            </View>

        </ScrollView>
    )
}

export default AlphabetSlider;

const styles = StyleSheet.create({
    alphabetScrollStyle: {
        flex: 1,
        flexGrow: 1,
        borderTopRightRadius: 35,
        position: 'absolute',
        width: 45,
        height: heightOfScreen,
        marginTop: '15%',
        zIndex: -10
    },

    alphabetViewStyle: {
        backgroundColor: colors.blueLibraryHeader,
        borderTopRightRadius: 25,
        height: heightOfScreen * 1.70,
        borderWidth: 0.7,
        borderColor: colors.blueBorder,
        alignItems: 'center',
        paddingTop: 55,
        zIndex: -10
    },

    alphabetLettersStyle: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,

    },

    alphabetLettersStyle2: {
        fontFamily: 'Comic-Regular',
        fontSize: 35,
        marginBottom: 15

    },

    alphabetLettersStyle3: {
        fontFamily: 'Comic-Regular',
        fontSize: 75,
        marginBottom: 15

    },

    boxShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 15,
    },
})