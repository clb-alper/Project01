import axios from 'axios';


const Translator = async (word) => {

    const url = 'https://api.mymemory.translated.net/get';

      const response = await axios.get(url, {
        params: {
          q: word,
          langpair: `tr|en`,
        },
      });

      console.log(word, ' -> ', response.data.responseData.translatedText)
      if (response.data && response.data.responseData && response.data.responseData.translatedText) {
        const translatedText = response.data.responseData.translatedText;
        // show on modal
        return translatedText;
      } else {
        throw new Error('Translation API response format is not as expected.');
      }

}

export {Translator}

