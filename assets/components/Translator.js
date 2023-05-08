// import axios from 'axios';


// const Translator = async (word) => {

//     const url = 'https://api.mymemory.translated.net/get';

//       const response = await axios.get(url, {
//         params: {
//           q: word,
//           langpair: `tr|en`,
//         },
//       });

//       console.log(word, ' -> ', response.data.responseData.translatedText)
//       if (response.data && response.data.responseData && response.data.responseData.translatedText) {
//         const translatedText = response.data.responseData.translatedText;
//         // show on modal
//         return translatedText;
//       } else {
//         throw new Error('Translation API response format is not as expected.');
//       }

// }

// export {Translator}

import axios from 'axios';

const apiKey = "AIzaSyAcVAX56qkbvT2OfgLll5nLdZ4u50RbQjI";

const Translator = async (word) => {
    const targetLanguage = 'en';

    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    try {
        const response = await axios.post(apiUrl, {
            q: word,
            target: targetLanguage,
        });
        const translation = response.data.data.translations[0].translatedText;
        return translation;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

module.exports = {
    Translator
};

