// receiver

console.log("HERE!!");

// popup.html清單出現網域
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostSuffix: '104.com.tw'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

// 儲存content script抓取的資料
let jobs = [];
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log(message, sender);
    jobs.push(message);
    chrome.storage.sync.set({"list": jobs});
    chrome.storage.sync.get("list", object => console.log(object));
  }
);