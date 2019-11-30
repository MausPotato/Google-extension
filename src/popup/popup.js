let jobList = new Vue({
  el: "#job-list",
  created() {
    chrome.storage.sync.get("jobList", object => {
      this.list = object.jobList;
    });
  },
  data: {
    list: {},
  }
});

