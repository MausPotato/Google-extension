// createButton
// parent.append(button)
// button.onclick() > post.Message
// event listener.. port > chrome.runtime.connect
// bg.js > onConnect onMessage..
// bg.js > chrome.storage..
// content script..

function checkAllButtons() {
  document.querySelectorAll("article.js-job-item").forEach((el) => {
    if(!el.querySelector(".gj-add-btn")) {
      createButton(el);
    }
  });
}

function createButton(el) {
  let jobId = el.getAttribute("data-job-no");
  let name = el.getAttribute("data-job-name");
  let company = el.getAttribute("data-cust-name");
  let industry = el.getAttribute("data-indcat-desc");
  let address= el.querySelector(".b-block__left > .b-list-inline > li > a").getAttribute("title");
  let pay = el.querySelector(".b-block__left > .job-list-tag > span").innerText;
  let button = document.createElement("button");
  button.dataset.jobId = jobId;
  button.dataset.name = name;
  button.dataset.company = company;
  button.dataset.industry = industry;
  button.dataset.address = address.substr(address.lastIndexOf("：") + 1);
  button.dataset.pay = pay;
  let span = document.createElement("span");
  span.innerText = "加入比較";
  button.appendChild(span);
  button.classList.add("b-btn", "b-btn--default", "gj-add-btn");
  el.querySelector(".b-block__right").appendChild(button);
  button.addEventListener("click", function() {
    let button = this.dataset;
    let message = {
      "jobId": button.jobId,
      "name": button.name,
      "company": button.company,
      "industry": button.industry,
      "address": button.address,
      "pay": button.pay,
    };
    chrome.runtime.sendMessage(message);
  });
}

let lastURL = document.URL;
window.addEventListener("mousewheel", function() {
  if(lastURL != document.URL) {
    checkAllButtons();
    lastURL = document.URL;
  }
});

window.onload = function() {
  checkAllButtons();
}
// window.onpopstate = function(event) {
//   alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
// };