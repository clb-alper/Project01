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

import { Translate } from '@google-cloud/translate';


const projectId = "static-beach-383414"

const translate = new Translate({ projectId });



const Translator = async (word) => {
    const target = 'tr';
    const [translation] = await translate.translate(word, target);
    console.log(`Text: ${word}`);
    console.log(`Translation: ${translation}`);

    return translation

}

export { Translator }

