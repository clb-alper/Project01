import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, VirtualizedList, Dimensions } from 'react-native';
import { BackHandler } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import colors from '../assets/colors/colors';

const widthOfScreen = Dimensions.get('window').width
const heightOfScreen = Dimensions.get('window').height

const PuzzlePage = () => {

    const puzzleArray = ["alper", "ömer", "yusuf", "tarot", "tarik", "araba"];
    const [quizIndex, setQuizIndex] = useState(0);

    const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
    const [currentShuffledSelections, setCurrentShuffledSelections] = useState([]);
    const [isCurrentFinished, setIsCurrentFinished] = useState(false);

    const flRef = useRef();

    const handleBackButtonPress = () => {
        return true;
    }

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonPress);
    }, [])

    let onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        if (pageNum != quizIndex) {
            setQuizIndex(pageNum);
        }
    };

    const scrollToOffset = (index) => {
        if (flRef.current) {
            setCurrentReplyIndex(0)
            setIsCurrentFinished(false);
            flRef.current.scrollToOffset({ offset: index * Dimensions.get('window').width, animated: false });
            setQuizIndex(index);
        }
    };

    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    const handleCurrentAnswer = (char, ans) => {
        console.log("char", char)
        console.log("ans", ans)
        console.log("currentWaitingIndex", currentReplyIndex)

        // if(ans.split("")[ans.length - 1] === char) {
        //     setCurrentReplyIndex(0)
        // }

        if (ans.charAt(currentReplyIndex) === char) {
            setCurrentReplyIndex(currentReplyIndex + 1)
            const removedIndex = currentShuffledSelections[quizIndex].indexOf(char);

            if (removedIndex > -1) {
                currentShuffledSelections[quizIndex].splice(removedIndex, 1);

            }

            if(currentReplyIndex === ans.length-1) {
                setIsCurrentFinished(true);
            }
        }
    };

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    useEffect(() => {
        let shuffledArrays = [];
        puzzleArray.forEach((puzzle) => {
            const shuffled = shuffle(puzzle.split(""))
            console.log(shuffled)
            shuffledArrays.push(shuffled)
        })
        setCurrentShuffledSelections(shuffledArrays)
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            <SafeAreaView>
                <View style={styles.innerContainer}>

                    <View style={styles.quizHeader}>
                        <TouchableOpacity
                            onPress={handleGoBack}>
                            <Octicons name="arrow-left" size={38} color="#000" style={styles.goBackIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{"Kelime Karmaşası"}</Text>
                    </View>

                    <FlatList
                        overScrollMode={'never'}
                        keyExtractor={(item, index) => index.toString()}
                        data={puzzleArray}
                        horizontal
                        pagingEnabledf
                        scrollEnabled={false}
                        ref={flRef}
                        onMomentumScrollEnd={onScrollEnd}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <View key={index} style={{ width: widthOfScreen, height: heightOfScreen * 0.57, alignItems: 'center' }}>
                                <Text>{item}</Text>
                                <Text>{"Quiz bittimi " + isCurrentFinished.toString()}</Text>
                                {/* User Result View */}
                                <View style={styles.userSelectionView}>
                                    {item.split("").map((el, index) => {
                                        return (
                                            <View style={index === currentReplyIndex ? styles.wordBoxCurrentReply : index < currentReplyIndex ? styles.wordBoxCorrectAns : styles.wordBox2}>
                                                {currentReplyIndex > index &&
                                                    <Text>{el.toUpperCase()}</Text>

                                                }
                                            </View>
                                        )
                                    })}
                                </View>

                                <View style={styles.userSelectionView}>
                                    {currentShuffledSelections[quizIndex] && currentShuffledSelections[quizIndex].map((item2, index) => (
                                        <View key={index.toString()} style={styles.wordBox}>
                                            <TouchableOpacity
                                                onPress={() => { handleCurrentAnswer(item2, item) }}
                                                activeOpacity={0.8}
                                            >
                                                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                                    <Text>{item2.toUpperCase()}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>


                                { isCurrentFinished ?
                                <TouchableOpacity
                                    onPress={() => { scrollToOffset(index + 1); }}
                                    activeOpacity={0.8}
                                >
                                    <View style={styles.contButton}>
                                        <Text style={{ fontSize: 20, fontFamily: 'Comic-Regular' }}>Devam</Text>
                                    </View>
                                </TouchableOpacity>
                                : null}
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

export default PuzzlePage;


const styles = StyleSheet.create({

    container: {
        backgroundColor: colors.blueLight,
        alignItems: 'center',
    },

    userSelectionView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },

    wordBox: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        width: 50
    },

    wordBox2: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        width: 40
    },

    wordBoxCurrentReply: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        width: 40,
        backgroundColor: '#eab676'
    },
    wordBoxCorrectAns: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        width: 40,
        backgroundColor: '#3CC465'
    },

    innerContainer: {
        marginTop: 40,
        alignItems: 'center'
    },

    quizHeader: {
        width: widthOfScreen * 0.88,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    headerText: {
        marginRight: '18.5%',
        fontFamily: 'Comic-Regular',
        fontSize: 30
    },

    contButton: {
        backgroundColor: colors.blueRegular,
        width: widthOfScreen * 0.3,
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.blueBorder
    },
});
