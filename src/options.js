/*jshint esversion: 6 */

(browser => {
    "use strict";
    
    function loadOptions() {

        browser.storage.local.get({
            autoclose: 'autoclose',
        }, function(items) {

            const id = (items.autoclose) ? "on" : "off";
            const radio = document.getElementById(id);
            radio.setAttribute("checked", "checked");
            parent = radio.parentNode;
            parent.classList.add('active');

        });

        browser.storage.local.get({
            filesummary: 'filesummary',
        }, function (items) {

            const id = (items.filesummary) ? "on_filesummary" : "off_filesummary";
            const radio = document.getElementById(id);
            radio.setAttribute("checked", "checked");
            parent = radio.parentNode;
            parent.classList.add('active');

        });

        browser.storage.local.get({
            urlredmine: 'urlredmine',
        }, function (items) {

            const id = "urlredmine";
            const field = document.getElementById(id);
            field.value = items.urlredmine;

        });
        
    }
    
    function saveOptions() {
        
        const autoclose = document.querySelector('[name="autoclose"').checked;
        
        const filesummary = document.querySelector('[name="filesummary"').checked;

        const urlredmine = document.querySelector('[name="urlredmine"').value;

        browser.storage.local.set({
            autoclose: autoclose,
            filesummary: filesummary,
            urlredmine: urlredmine,
        }, 
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            
            setTimeout(function() {
                status.textContent = '';
            }, 1000);
        });
    }
    
    document.addEventListener('DOMContentLoaded', loadOptions);
    document.getElementById('save').addEventListener('click', saveOptions);
    
})(chrome||browser);