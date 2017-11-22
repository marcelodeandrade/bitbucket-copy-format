/*jshint esversion: 6 */

(browser => {
    "use strict";
    
    function loadOptions() {
        browser.storage.local.get({
            autoclose: 'autoclose'
        }, function(items) {

            const id = (items.autoclose) ? "on" : "off";
            const radio = document.getElementById(id);
            radio.setAttribute("checked", "checked");
            parent = radio.parentNode;
            parent.classList.add('active');
        });
    }
    
    function saveOptions() {
        
        const autoclose = document.querySelector('[name="autoclose"').checked;
        
        browser.storage.local.set({
            autoclose: autoclose
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