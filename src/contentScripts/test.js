let gj = {
  addJob: function(jobInfo, folderIndex) {
    chrome.runtime.sendMessage({action: "addJob", jobInfo: jobInfo, folderIndex: folderIndex});
  },
  removeJob: function(jobId, folderIndex) {
    chrome.runtime.sendMessage({action: "removeJob", jobId: jobId, folderIndex: folderIndex});
  }
}

window.onload = function() {
  document.querySelectorAll("article.js-job-item").forEach((article) => {
    attachButton(article);
  });
  let newArticleObserver = new MutationObserver(newArticleHandler);
  newArticleObserver.observe(document.querySelector("#js-job-content"), {childList: true});
}

function newArticleHandler(mutations) {
  mutations.forEach((mutationRecord) => {
    mutationRecord.addedNodes.forEach((node) => {
      if (node.tagName == "ARTICLE") {
        attachButton(node);
      }
    });
  });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
  console.log(changes, areaName);
});

function attachButton(article) {
  if(!article.querySelector(".gj-btn")) {
    let button = createButton(article);
    setButtonAdd(button);
    article.querySelector(".b-block__right").appendChild(button);
  }
}

function createButton(article) {
  let button = document.createElement("button");
  button.classList.add("b-btn", "b-btn--default", "gj-btn");
  button.value = "";
  button.jobInfo = parseJobInfo(article);
  let span = document.createElement("span");
  span.innerText = "";
  button.appendChild(span);
  button.addEventListener("click",() => {
    if (button.value == "add") {
      gj.addJob(button.jobInfo, 0);
    } else {
      gj.removeJob(button.jobInfo.jobId, 0);
    }
    toggleButton(button);
  });
  return button;
}

function parseJobInfo(article) {
  let jobInfo = {};
  jobInfo.jobId = article.getAttribute("data-job-no");
  jobInfo.name = article.getAttribute("data-job-name");
  let companyInfo = article.querySelector(".b-block__left > .b-list-inline > li > a").getAttribute("title");
  jobInfo.company = companyInfo.substring(companyInfo.indexOf("公司名：") + 4, companyInfo.indexOf("公司住址："));
  jobInfo.address = companyInfo.substring(companyInfo.indexOf("公司住址：") + 5);
  jobInfo.industry = article.getAttribute("data-indcat-desc");
  jobInfo.pay = article.querySelector(".b-block__left > .job-list-tag > span").innerText;
  return jobInfo;
}

function toggleButton(button) {
  if (button.value == "add") {
    setButtonRemove(button);
  } else if (button.value == "remove") {
    setButtonAdd(button);
  } else {
    console.error("toggleButton failed.");
  }
}

function setButtonAdd(button) {
  button.value = "add";
  button.querySelector("span").innerText = "加入比較";
}

function setButtonRemove(button) {
  button.value = "remove";
  button.querySelector("span").innerText = "已儲存";
}