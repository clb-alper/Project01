import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Image, VirtualizedList, Dimensions } from 'react-native';
const widthOfScreen = Dimensions.get('window').width

const PuzzlePage = () => {

    const puzzleArray = ["alper", "ömer", "yusuf", "tarot", "tarik", "araba"];
    const [quizIndex, setQuizIndex] = useState(0);

    const [currentReplyIndex, setCurrentReplyIndex] = useState(0);
    const [currentShuffledSelections, setCurrentShuffledSelections] = useState([])
    const flRef = useRef();

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
        }
    };


    useEffect(() => {
        let shuffledArrays = [];
        puzzleArray.forEach((puzzle) => {
            const shuffled = shuffle(puzzle.split(""))
            console.log(shuffled)
            shuffledArrays.push(shuffled)
        })
        setCurrentShuffledSelections(shuffledArrays)
    }, [])

    return (
        <View>
            <StatusBar style="auto" />
            <SafeAreaView>
                <Text>{"BULMACA ÇÖZ ULAN"}</Text>
                <FlatList
                    overScrollMode={'never'}
                    keyExtractor={(item, index) => index.toString()}
                    data={puzzleArray}
                    horizontal
                    pagingEnabled
                    scrollEnabled={true}
                    ref={flRef}
                    onMomentumScrollEnd={onScrollEnd}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <View style={{ width: Dimensions.get('window').width }}>
                            <Text>{item}</Text>

                            {/* User Result View */}
                            <View style={styles.userSelectionView}>
                                {item.split("").map((el, index) => {
                                    return (
                                        <View style={index === currentReplyIndex ? styles.wordBoxCurrentReply : index < currentReplyIndex ? styles.wordBoxCorrectAns : styles.wordBox}>
                                            {currentReplyIndex > index &&
                                                <Text>{el}</Text>

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
                                            <View>
                                                <Text>{item2}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>


                            <TouchableOpacity
                                onPress={() => { scrollToOffset(index + 1); }}
                                activeOpacity={0.8}
                            >
                                <View>
                                    <Text>Devam</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </SafeAreaView>
        </View>
    );
};

export default PuzzlePage;


const styles = StyleSheet.create({
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
});
