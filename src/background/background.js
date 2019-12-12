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
addFolder("default1234567890987654321");
addFolder("default2");
chrome.storage.sync.get("savedJobs", object => {
  if (object.savedJobs != undefined) {
    savedJobs = object.savedJobs;
  }
});

// message: {
//   action: addJob/removeJob/addFolder/renameFolder/renameFolder,
//   jobInfo: {job: id...etc},
//   folderName: XXXXX,
//   folderIndex: XXX,
// }

chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    switch (message.action) {
      case "addJob":
           addJob(message.jobInfo, message.folderIndex);
      break;
      case "removeJob":
           removeJob(message.jobId, message.folderIndex);
      break;
      case "addFolder":
           addFolder(message.folderName);
      break;
      case "removeFolder":
           removeFolder(message.folderIndex);
      break;
      case "renameFolder":
           renameFolder(message.folderName, message.folderIndex);
      break;
    }
  }
);

function setInfo() {
  chrome.storage.sync.set({savedJobs: savedJobs});
}

function hasJob(jobId) {
  return savedJobs.some(folder => {
    return folder.list.some(job => {
      return job.jobId == jobId;
    });
  });
}

function addJob(job, folderIndex) {
  if (folderIndex >= savedJobs.length) {
    throw new RangeError("index out of range");
  }
  if (hasJob(job.jobId)) {
    throw "這工作已經存過了";
  }
  if (savedJobs[folderIndex].length >= 9) {
    throw "這裡滿了";
  } else {
    savedJobs[folderIndex].list.push(job);
  }
  setInfo();
}

function removeJob(jobId, folderIndex) {
  if (folderIndex >= savedJobs.length) {
    throw new RangeError("index out of range");
  }
  savedJobs[folderIndex].list = savedJobs[folderIndex].list.filter(job => job.jobId != jobId);
  setInfo();
}

function hasFolder(name) {
  return savedJobs.some(folder => folder.name == name);
}

function addFolder(name) {
  if (hasFolder(name)) {
    throw "資料夾同名是不允許的，念在你有創意，再想一個吧";
  } else {
    savedJobs.push({name: name, list: []});
  }
  setInfo();
}

function removeFolder(folderIndex) {
  if (folderIndex >= savedJobs.length) {
    throw new RangeError("index out of range");
  } else {
    savedJobs.splice(folderIndex, 1);
  }
  setInfo();
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
  setInfo();
}