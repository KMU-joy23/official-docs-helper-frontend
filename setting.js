// setting.js 파일: 확장 프로그램의 설정을 관리합니다.
document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('saveButton');
    var inputOption = document.getElementById('inputOption');
  
    // 저장 버튼 클릭 시 설정을 저장합니다.
    saveButton.addEventListener('click', function() {
      var selectedOption = inputOption.value;
      // 설정을 Chrome 로컬 스토리지에 저장합니다.
      chrome.storage.local.set({ 'selectedOption': selectedOption }, function() {
        // 저장이 완료되면 알림을 표시합니다.
        alert('설정이 저장되었습니다.');
      });
    });
  
    // 페이지가 로드될 때 저장된 설정을 불러옵니다.
    chrome.storage.local.get('selectedOption', function(data) {
      var savedOption = data.selectedOption;
      if (savedOption) {
        inputOption.value = savedOption;
      }
    });
  });
  