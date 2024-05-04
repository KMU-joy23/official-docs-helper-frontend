// 웹페이지의 모든 텍스트 요소를 가져오는 함수
function getAllTextNodes() {
  let walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false,
  );

  let textNodes = [];
  let node = walker.nextNode();
  while (node) {
    // 노드가 존재하는 동안 반복합니다.
    textNodes.push(node.textContent);
    node = walker.nextNode(); // 다음 노드로 이동합니다.
  }
  return textNodes;
}
// 추출한 외국어 텍스트를 백그라운드 스크립트로 전송하는 함수
function sendForeignTextToBackground(textNodes) {
  let gotTexts = textNodes.map(function (node) {
    return node.textContent;
  });
  chrome.runtime.sendMessage({ type: 'Text', data: gotTexts });
}

// 메인 작업: 영어 텍스트 추출 후 백그라운드 스크립트로 전송

textNodes = getAllTextNodes();
sendForeignTextToBackground(textNodes);
