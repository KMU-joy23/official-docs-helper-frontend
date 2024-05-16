document.addEventListener('DOMContentLoaded', function() {
    var inputText = document.getElementById('inputText');
    var translateButton = document.getElementById('translateButton');
    var translatedTextDisplay = document.getElementById('translatedTextDisplay');
  
    translateButton.addEventListener('click', function() {
      var textToTranslate = inputText.value;
      chrome.runtime.sendMessage({
        type: 'Text',
        data: [textToTranslate]
      }, function(response) {
        if (response.type === 'TranslatedText') {
          translatedTextDisplay.textContent = response.data[0];
        }
      });
    });
  });
  