import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import React from 'react';
import booksListData from '../data/booksListData';
import { firebase } from '../../firebase'

var widthOfScreen = Dimensions.get('window').width; //full width

export const LibraryContext = React.createContext();

const LibraryProvider = ({ children }) => {

    const [categorySwitch, setCategorySwitch] = useState(true);

    const bookWidth = (widthOfScreen - 55) / 3;

    const [DATA, setDATA] = useState();
    const [dataLetters, setDataLetters] = useState();


    const indexingBooks = (booksListData) => {

        const DATA = [];

        const dataLetters = [];

        for (let i = 0; i < booksListData.length; i++) {

            const index = dataLetters.findIndex((letter) => letter == booksListData[i].title.substring(0, 1));

            if (index > -1) {
                DATA[index].books.push(booksListData[i]);
            }
            else {
                dataLetters.push(booksListData[i].title.substring(0, 1))
                DATA.push({
                    condition: booksListData[i].title.substring(0, 1),
                    condition2: booksListData[i].themeTag,
                    books: [{
                        id: booksListData[i].id,
                        title: booksListData[i].title,
                        image: booksListData[i].image,
                        itemColor: booksListData[i].itemColor,
                        itemBorder: booksListData[i].itemBorder,
                        itemColorBG: booksListData[i].itemColorBG,
                        itemTextColor: booksListData[i].itemTextColor,
                        itemDesc: booksListData[i].itemDesc,
                        bookProgress: booksListData[i].bookProgress,
                        themeTag: booksListData[i].themeTag,
                        ageTag: booksListData[i].ageTag,
                        contentTag: booksListData[i].contentTag,
                        rewardTag: booksListData[i].rewardTag,

                    }]
                })
            }
        }
        return DATA

    }


    const [bookList, setBookList] = React.useState([]);
    const todoRef = firebase.firestore().collection('storyBooks');

    useEffect(() => {
        todoRef
            .onSnapshot(
                querySnapshot => {
                    const bookList = []
                    querySnapshot.forEach((doc) => {
                        const { ageTag, bookProgress, contentTag, image, itemBorder, itemColor, itemColorBG, itemDesc, itemDescColor, rewardTag, themeTag, title } = doc.data()
                        bookList.push({
                            id: doc.id,
                            ageTag,
                            bookProgress,
                            contentTag,
                            image,
                            itemBorder,
                            itemColor,
                            itemColorBG,
                            itemDesc,
                            itemDescColor,
                            rewardTag,
                            themeTag,
                            title,
                        })
                    })

                    const indexedBooks = indexingBooks(bookList); 
                    setDATA(indexedBooks);
                    setBookList(bookList);


                }
            )

    }, [])






    const contextData = {
        DATA,
        dataLetters,
        categorySwitch,
        setCategorySwitch,
        bookWidth,
        bookList,
        setBookList
    }

    return (
        <LibraryContext.Provider value={contextData}>
            {children}
        </LibraryContext.Provider>
    )
}

export default LibraryProvider;