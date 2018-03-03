// 
'use strict'

// Listen to keyboard shortcuts
chrome.commands.onCommand.addListener(sendMessage)

// Open popup on icon click
chrome.browserAction.onClicked.addListener(sendMessage)

// Talk to the DOM
function sendMessage () {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {})
  })
}