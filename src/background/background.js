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

let jobs = [];
chrome.storage.sync.get("jobList", object => {
  if (object.jobList != undefined) {
    jobs.push(...object.jobList);
  }
});
// 儲存content script抓取的資料
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    if (message.action == "add") {
      storeJobInfo(message.jobInfo);
    } 
    // chrome.storage.sync.get("list", object => console.log(object));
  }
);

function storeJobInfo(jobInfo) {
  jobs.push(jobInfo);
  chrome.storage.sync.set({"jobList": jobs});
}