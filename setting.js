// setting.js 파일: 확장 프로그램의 설정을 관리합니다.
document.addEventListener('DOMContentLoaded', function () {
  var saveButton = document.getElementById('saveButton');
  var inputOption = document.getElementById('inputOption');
  var statusMessage = document.getElementById('statusMessage'); // 상태 메시지를 표시할 요소

  // 저장 버튼 클릭 시 설정을 저장합니다.
  saveButton.addEventListener('click', function () {
    var selectedOption = inputOption.value;
    // 설정을 Chrome 로컬 스토리지에 저장합니다.
    chrome.storage.local.set({ selectedOption: selectedOption }, function () {
      if (chrome.runtime.lastError) {
        // 저장 실패시 에러 메시지를 표시
        statusMessage.textContent =
          '설정 저장 실패: ' + chrome.runtime.lastError.message;
      } else {
        // 저장이 완료되면 상태 메시지를 표시합니다.
        statusMessage.textContent = '설정이 저장되었습니다.';
        setTimeout(() => (statusMessage.textContent = ''), 3000); // 3초 후 메시지 제거
      }
    });
  });

  // 페이지가 로드될 때 저장된 설정을 불러옵니다.
  chrome.storage.local.get('selectedOption', function (data) {
    var savedOption = data.selectedOption;
    if (savedOption) {
      inputOption.value = savedOption;
    }
  });
});
