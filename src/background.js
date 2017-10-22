chrome.browserAction.onClicked.addListener(function(tab) {

    chrome.tabs.executeScript(tab.id, {
        file: "content.script.js",
        allFrames: true
    });

});