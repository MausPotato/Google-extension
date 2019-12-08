let jobList = new Vue({
  el: "#job-list",
  created() {
    chrome.storage.sync.get("savedJobs", object => {
      this.savedJobs = object.savedJobs;
    });
  },
  data: {
    savedJobs: [],
  },
  methods: {
    openList: function() {

    }
  },
});

