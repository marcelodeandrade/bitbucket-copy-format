/*jshint esversion: 6 */

(browser => {
    "use strict";
    
    browser.browserAction.onClicked.addListener(tab => {
        
        browser.tabs.executeScript(null, {file: "src/content.script.js"});
        
        browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            console.log(request);
            
            browser.notifications.create('bitbucket-copy-format', {
                type: 'basic',
                iconUrl: 'src/images/icon.png',
                title: 'bitbucket-copy-format',
                message: 'Copied'
            }, (id) => {
                sendResponse({
                    "response": "notificated"
                });
                                
                browser.storage.local.get("autoclose", (items) => {
                    
                    if (!browser.runtime.error) {

                        if(items.autoclose) {
                            browser.tabs.query({ active: true }, (tabs) => {
                                chrome.tabs.remove(tabs[0].id);
                            });
                        }

                    }

                });
                
                setTimeout(() => { browser.notifications.clear(id); }, 1000);
            });
            
        });
    });
    
})(chrome||browser);