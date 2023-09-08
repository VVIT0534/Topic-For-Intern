document.addEventListener('DOMContentLoaded', function () {
  let copyButton = document.getElementById('copyButton')
  let reg_pattern = /^(https?:\/\/(([a-zA-Z0-9]+-?)+[a-zA-Z0-9]*\.)+[a-zA-Z]+)(:\d+)?(\/.+)+$/;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0]
    const url = activeTab.url
    let res
    //let body = document.querySelector('body')
    var flag = reg_pattern.test(url)
    let tempDiv = document.createElement('div')
    tempDiv.style.position = 'absolute'
    tempDiv.style.left = '-9999px'
    tempDiv.style.top = '-9999px'
    tempDiv.id = 'linkContainer'
    document.body.appendChild(tempDiv)
    let linkContainer = document.querySelector('#linkContainer')
    if (flag == true) {
      let tmp = url.match(reg_pattern)[5].split("/")
      res = tmp[tmp.length - 1]
      tempDiv.innerHTML = `<a href="${url}" target="_blank">${res}</a>`
    }
    else {
      res = url
      tempDiv.innerHTML = `<a href="${url}" target="_blank">${res}</a>`
    }
    tempDiv.querySelector('a').style.fontSize = '18px'
    tempDiv.querySelector('a').style.background = 'transparent'
    let myClipboard = new ClipboardJS('#copyButton', {
      target: function () {
        return linkContainer
      }
    })
    myClipboard.on('success', function (e) {
      alert('copy success')
      //body.removeChild(tempDiv);
      window.close()
    })
    myClipboard.on('error', function (e) {
      alert('copy failed')
      //body.removeChild(tempDiv);
      window.close()
    })
  })
})



