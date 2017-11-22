(browser => {
    "use strict";
    
    function saveOptions() {
        
        const autoclose = document.querySelector('[name="autoclose"').checked;
        console.log(autoclose);
        
        browser.storage.sync.set({
            autoclose: autoclose
        }, 
        () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        });
    }
    
    document.getElementById('save').addEventListener('click', saveOptions);
    
})(chrome||browser);