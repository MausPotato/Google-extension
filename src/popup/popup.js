let jobList = new Vue({
  el: "#job-list",
  created() {
    chrome.storage.sync.get("savedJobs", object => {
      this.savedJobs = object.savedJobs;
    });
  },
  data: {
    savedJobs: [],
    visibility: close,
  },
  methods: {
    openList: function() {
      if (this.visibility == "close") {
        this.visibility = "open";
      } else {
        this.visibility = "close";
      }
    }
  },
});

