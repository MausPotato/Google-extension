let jobList = new Vue({
  el: "#job-list",
  created() {
    chrome.storage.sync.get("list", object => {
      this.list = object.list;
    });
  },
  data: {
    list: {},
  }
});

