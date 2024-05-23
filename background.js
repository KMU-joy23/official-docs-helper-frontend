// 번역 API 호출 함수
async function callTranslationAPI(text) {
  const response = await fetch('https://api.example.com/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }),
  });
  if (!response.ok) {
    throw new Error('Translation API failed');
  }
  const data = await response.json();
  return data.translatedText;
}

// 텍스트 번역 함수
async function translateTexts(texts) {
  const translatedTexts = [];
  for (const text of texts) {
    try {
      const translatedText = await callTranslationAPI(text);
      translatedTexts.push(translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
      translatedTexts.push('Translation failed');
    }
  }
  return translatedTexts;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'Text') {
    const texts = message.data;
    translateTexts(texts).then((translatedTexts) => {
      chrome.tabs
        .sendMessage(sender.tab.id, {
          type: 'TranslatedText',
          data: translatedTexts,
        })
        .catch((error) => {
          console.error('Error sending translated texts:', error);
        });
    });
  }
});
