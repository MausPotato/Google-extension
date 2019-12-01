let jobList = new Vue({
  el: "#job-list",
  created() {
    chrome.storage.sync.get("savedJobs", object => {
      this.list = object.savedJobs;
    });
  },
  data: {
    list: {},
  }
});

