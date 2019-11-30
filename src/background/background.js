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
let savedJobs = [];
chrome.storage.sync.get("savedJobs", object => {
  if (object.savedJobs != undefined) {
    savedJobs = object.savedJobs;
  }
});

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message) {
    }
  }
);

function addFolder(name) {
  if (hasFolder(name)) {
    throw "資料夾同名是不允許的，念在你有創意，再想一個吧";
  } else {
    savedJobs.push({name: name});
  }
}

function hasFolder(name) {
  return savedJobs.some(folder => folder.name == name);
}

function removeFolder(folderIndex) {
  if (folderIndex >= savedJobs.length) {
    throw new RangeError("index out of range");
  } else {
    savedJobs.splice(folderIndex, 1);
  }
}

function renameFolder(newName, folderIndex) {
  if (folderIndex >= savedJobs.length) {
    throw new RangeError("index out of range");
  }
  if (hasFolder(newName)) {
    throw "資料夾同名是不允許的，念在你有創意，再想一個吧";
  } else {
    savedJobs[folderIndex].name = newName;
  }
}