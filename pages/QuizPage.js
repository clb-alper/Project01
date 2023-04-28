import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import colors from '../assets/colors/colors'
import { SafeAreaView } from 'react-native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen';
import { FlatList } from 'react-native'
import { TouchableOpacity } from 'react-native'
import IonIcons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { ModalContext } from '../assets/contexts/ModalContext'
import { auth, firebase } from '../firebase';
import Skeleton from '../assets/components/Skeleton'
import { ProfileContext } from '../assets/contexts/ProfileContext'

const widthOfScreen = Dimensions.get('window').width
const heightOfScreen = Dimensions.get('window').height

const QuizPage = () => {

    const [flRef, setFlRef] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    const [quizList, setQuizList] = useState([]);
    const [quizIndex, setQuizIndex] = useState(1);

    const [correct, setCorrect] = useState(0);

    const [currentAnswerIndex, setCurrenAnswerIndex] = useState();

    const [answered, setAnswered] = useState();

    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [wrongAnswers, setWrongAnswers] = useState(0);

    const [isFinished, setIsFinished] = useState(false);

    const { modalEntry } = useContext(ModalContext);
    const { userPointsData, currentProfileSelected } = useContext(ProfileContext);

    const sleep = milliseconds => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }
    const loadUserView = async () => {
        await sleep(1000)
        setIsLoaded(true)
    }

    const [fontsLoaded] = useFonts({
        'Comic-Regular': require('../assets/fonts/ComicNeue-Regular.ttf'),
        'Comic-Light': require('../assets/fonts/ComicNeue-Light.ttf'),
        'Comic-Bold': require('../assets/fonts/ComicNeue-Bold.ttf'),
    });

    const navigation = useNavigation();


    const quizRef = firebase.firestore().collection('storyBooks').doc(modalEntry.id).collection('quizContent')

    const getQuizData = async () => {
        quizRef
            .onSnapshot(
                querySnapshot => {
                    const quizList = []
                    querySnapshot.forEach((doc) => {
                        const { answers, correctAnswerIndex, question } = doc.data()

                        quizList.push({
                            id: doc.id,
                            answers,
                            correctAnswerIndex,
                            question,
                        })

                    })
                    setQuizList(quizList)
                }
            )
    }

    useEffect(() => {
        getQuizData();
        loadUserView()
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    const handleAnswerPressed = (e, b) => {
        if (b === quizList[e - 1].correctAnswerIndex) {
            setCorrectAnswers(correctAnswers + 1)
            setCorrect(1)
        } else {
            setWrongAnswers(wrongAnswers + 1)
            setCorrect(1)
        }
        setAnswered(true)
    }

    const handleQuizResults = () => {
        console.log(correctAnswers, " + ", wrongAnswers)
    }

    const handleQuizPointsReward = () => {
        firebase.firestore()
            .collection('users').doc(firebase.auth().currentUser.uid)
            .collection('userProfiles').doc(currentProfileSelected).update({
                points: userPointsData + Math.floor((correctAnswers / quizList.length) * 25) * 10,
            })
    }

    const scrollToIndex = (e) => {
        setQuizIndex(e + 1)
        flRef.scrollToIndex({ animated: false, index: e });
    }

    let onScrollEnd = (e) => {
        let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / 410 + 0.5) + 1, 0), quizList.length);
        setQuizIndex(pageNumber)
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>

            <SafeAreaView>

                <View style={styles.innerContainer}>
                    <View style={styles.quizHeader}>
                        {!isFinished ?
                            <TouchableOpacity
                                onPress={() => { navigation.goBack(); }}>
                                <Octicons name="arrow-left" size={45} color="#000" style={styles.goBackIcon} />
                            </TouchableOpacity>
                            :
                            <View>

                            </View>
                        }

                        <Text style={!isFinished ? styles.headerText : [styles.headerText, { marginLeft: 28 }]}>Quiz</Text>

                        <View>

                        </View>
                    </View>


                    {isLoaded ?
                        !isFinished ?
                            <View style={styles.progressHeader}>
                                <Progress.Bar style={styles.quizProgressBar} borderRadius={15} progress={quizIndex / quizList.length} height={12} width={270} color={colors.yellowBorder} />
                                <Text style={{ fontSize: 30, fontFamily: 'Comic-Regular' }}>{quizIndex}/{quizList.length}</Text>
                            </View>
                            :
                            <View>
                            </View>
                        :
                        <Skeleton
                            height={20}
                            width={widthOfScreen * 0.8}
                            backgroundColor={colors.grayProgressBarBG}
                            style={[{ borderRadius: 20, marginTop: 30 }]}
                        />


                    }

                    {isLoaded ?
                        !isFinished ?
                            <FlatList
                                overScrollMode={'never'}
                                keyExtractor={(item) => item.id}
                                data={quizList}
                                horizontal
                                pagingEnabled
                                scrollEnabled={false}
                                ref={(ref) => { setFlRef(ref) }}
                                onMomentumScrollEnd={onScrollEnd}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item, index }) => (

                                    <View style={{ width: widthOfScreen, height: heightOfScreen * 0.57, alignItems: 'center' }}>
                                        <Text
                                            adjustsFontSizeToFit
                                            numberOfLines={3}
                                            style={[styles.questionText, { width: widthOfScreen * 0.8 }]}>
                                            {item.question}
                                        </Text>

                                        <FlatList
                                            overScrollMode={'never'}
                                            keyExtractor={(item) => item}
                                            data={quizList[index].answers}
                                            showsHorizontalScrollIndicator={false}
                                            renderItem={({ item, index }) => (

                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => { handleAnswerPressed(quizIndex, index); setCurrenAnswerIndex(index) }}
                                                        style={[styles.answerStyle,
                                                        index === quizList[quizIndex - 1].correctAnswerIndex && correct === 1 ?
                                                            { backgroundColor: colors.greenRegular, borderColor: colors.greenBorder }
                                                            :
                                                            index != quizList[quizIndex - 1].correctAnswerIndex && currentAnswerIndex === index ?
                                                                { backgroundColor: colors.pinkRegular, borderColor: colors.pinkDarkBorder }
                                                                :
                                                                { backgroundColor: colors.yellowRegular }]}
                                                        activeOpacity={0.7}
                                                        disabled={answered}
                                                    >
                                                        <Text
                                                            adjustsFontSizeToFit
                                                            numberOfLines={1}
                                                            style={{ fontSize: 28, fontFamily: 'Comic-Regular' }}
                                                        >
                                                            {item}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                        />

                                        {index != quizList.length - 1 ?
                                            correct === 1 ?
                                                <TouchableOpacity
                                                    onPress={() => { scrollToIndex(index + 1); setCorrect(0); setCurrenAnswerIndex(); setAnswered(false) }}
                                                    activeOpacity={0.8}>
                                                    <View style={styles.contButton}>
                                                        <Text style={{ fontSize: 20, fontFamily: 'Comic-Regular' }}>Devam</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View>

                                                </View>
                                            :
                                            correct === 1 ?
                                                <TouchableOpacity
                                                    onPress={() => { setIsFinished(true) }}
                                                    activeOpacity={0.8}>
                                                    <View style={styles.contButton}>
                                                        <Text style={{ fontSize: 20, fontFamily: 'Comic-Regular' }}>Bitti</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <View>

                                                </View>
                                        }
                                    </View>

                                )}
                            />
                            :
                            <>
                                <View style={styles.resultContainer}>
                                    <Text style={styles.resultHeaderText}>Sonuç</Text>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.resultCorrectWrongText}>Dogru: {correctAnswers}</Text>
                                            <View style={styles.correctIcon}>
                                                <Octicons name="check" size={20} color={colors.greenBorder} style={{ marginBottom: 1 }} />
                                            </View>
                                        </View>

                                        <View style={{ flexDirection: 'row' }}>
                                            <Text style={styles.resultCorrectWrongText}>Yanlış: {wrongAnswers}</Text>
                                            <View style={styles.wrongIcon}>
                                                <IonIcons name="close" size={23} color={colors.pinkDarkBorder} style={{ marginBottom: 1 }} />
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                <View style={styles.rewardContainer}>
                                    <Text style={styles.rewardResultHeaderText}>Ödül</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 4 }}>
                                        <Text style={styles.rewardResultText}>{Math.floor((correctAnswers / quizList.length) * 25) * 10}</Text>
                                        <AntIcons name="star" size={23} color="#FFD600" style={styles.pointsIconStyle} />
                                    </View>

                                </View>

                                <View style={styles.finishContainer}>
                                    <TouchableOpacity
                                        onPress={() => { navigation.goBack(); handleQuizPointsReward() }}
                                        activeOpacity={0.8}>
                                        <View>
                                            <Text style={styles.finishButtonText}>Bitir</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>
                            </>
                        :
                        <>
                            <Skeleton
                                height={30}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 30 }]}
                            />
                            <Skeleton
                                height={30}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 8 }]}
                            />
                            <Skeleton
                                height={30}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 8 }]}
                            />

                            <Skeleton
                                height={45}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 35 }]}
                            />

                            <Skeleton
                                height={45}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 20 }]}
                            />

                            <Skeleton
                                height={45}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 20 }]}
                            />

                            <Skeleton
                                height={45}
                                width={widthOfScreen * 0.8}
                                backgroundColor={colors.grayProgressBarBG}
                                style={[{ borderRadius: 20, marginTop: 20 }]}
                            />
                        </>
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}

export default QuizPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.yellowLight,
        alignItems: 'center',
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

    goBackIcon: {
        marginTop: 8
    },

    progressHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        width: widthOfScreen * 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },

    quizProgressBar: {
        marginTop: 4,
        backgroundColor: colors.yellowRegular
    },

    headerText: {
        fontFamily: 'Comic-Regular',
        fontSize: 55,
        marginRight: '9.5%'
    },

    questionText: {
        fontFamily: 'Comic-Regular',
        fontSize: 45,
        marginTop: 20,
        marginBottom: 15
    },

    answerStyle: {
        backgroundColor: colors.yellowRegular,
        width: widthOfScreen * 0.8,
        height: 43,
        marginTop: 15,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.yellowBorder
    },

    contButton: {
        backgroundColor: colors.yellowRegular,
        width: widthOfScreen * 0.3,
        height: 35,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.yellowBorder
    },

    resultContainer: {
        marginTop: 45,
        backgroundColor: colors.yellowRegular,
        width: widthOfScreen * 0.8,
        height: 148,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: colors.yellowBorder,
    },

    rewardContainer: {
        marginTop: 25,
        backgroundColor: colors.yellowRegular,
        width: widthOfScreen * 0.8,
        height: 120,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: colors.yellowBorder,
        alignItems: 'center'
    },

    finishContainer: {
        marginTop: 25,
        backgroundColor: colors.yellowRegular,
        width: widthOfScreen * 0.8,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: colors.yellowBorder,
        justifyContent: 'center',
        alignItems: 'center'
    },

    resultHeaderText: {
        fontSize: 38,
        fontFamily: 'Comic-Regular',
        alignSelf: 'center',
        marginTop: 15
    },

    resultCorrectWrongText: {
        fontSize: 28,
        fontFamily: 'Comic-Regular',
        marginLeft: 20,
        marginTop: 20
    },

    correctIcon: {
        backgroundColor: colors.greenRegular,
        height: 30,
        width: 30,
        borderWidth: 2,
        borderColor: colors.greenBorder,
        borderRadius: 100,
        marginLeft: 7,
        marginTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrongIcon: {
        backgroundColor: colors.pinkRegular,
        height: 30,
        width: 30,
        borderWidth: 2,
        borderColor: colors.pinkDarkBorder,
        borderRadius: 100,
        marginRight: 20,
        marginTop: 22,
        marginLeft: 7,
        justifyContent: 'center',
        alignItems: 'center',
    },

    rewardResultHeaderText: {
        fontSize: 38,
        fontFamily: 'Comic-Regular',
        alignSelf: 'center',
        marginTop: 15
    },

    rewardResultText: {
        fontSize: 28,
        fontFamily: 'Comic-Regular',
        marginTop: 8
    },

    pointsIconStyle: {
        marginTop: 7,
        marginLeft: 5
    },

    finishButtonText: {
        fontSize: 30,
        fontFamily: 'Comic-Regular',
        alignSelf: 'center',
    },

})