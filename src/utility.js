export default {
  addJob: function(jobInfo, folderIndex) {
    chrome.runtime.sendMessage({action: "addJob", jobInfo: jobInfo, folderIndex: folderIndex});
  },
  removeJob: function(jobId, folderIndex) {
    chrome.runtime.sendMessage({action: "removeJob", jobId: jobId, folderIndex: folderIndex});
  }
}