(browser => {
    "use strict";

    browser.storage.local.get({
        filesummary: 'filesummary',
        urlredmine: 'urlredmine',

    }, function (items) {

        const urlRedmine = items.urlredmine;
        alert(urlRedmine);

        const commitQuery = document.querySelector(".commit-message").textContent.split(/(?=[\d]{5,7})/);
        const commitMessage = commitQuery[0].replace("#", "") || "";
        const commitTask = commitQuery[1] || "";
        const commitLink = document.querySelector("span.changeset-hash");
        const commitBranch = document.querySelector(".commit-branches > a");

        var commitSummary = "";
        var commitFilesSumary = "";
        
        var id = (items.filesummary) ? "on_filesummary" : "off_filesummary";

        if (id == "on_filesummary") {

            commitSummary = "files changed " + document.querySelector("#commit-summary h1 span").textContent + ":";

            $("#commit-summary #commit-files-summary .iterable-item").each(function () {
                $(this).each(function (index, value) {

                    commitFilesSumary += '"';
                    commitFilesSumary += value.querySelector('div .lines-added').textContent.trim();
                    commitFilesSumary += '  ';
                    commitFilesSumary += value.querySelector('div .lines-removed').textContent.trim();
                    commitFilesSumary += '  ';
                    commitFilesSumary += value.querySelector('.diff-summary-lozenge').textContent.trim();
                    commitFilesSumary += '  ';
                    commitFilesSumary += $(value).attr('data-file-identifier');
                    commitFilesSumary += '"';
                    commitFilesSumary += ':' + value.querySelector('a');
                    commitFilesSumary += '\n';

                });

            });
        
        }

        const toCopy = [
            `${commitMessage}`,
            `"task: #${commitTask}":${urlRedmine}/issues/${commitTask}`,
            `"commit: ${commitLink.textContent.trim()}":${location.href}`,
            `"branch: ${commitBranch.textContent.trim()}":${commitBranch.href}`,
            ``,
            `${commitSummary}`,
            `${commitFilesSumary}`,
            ``,
        ].join('\n');

        const dummyElement = document.createElement("textArea");

        dummyElement.setAttribute("name", "dummyElement");
        dummyElement.value = toCopy;

        document.body.appendChild(dummyElement);

        dummyElement.select();

        document.execCommand("copy");

        document.body.removeChild(dummyElement);

        browser.runtime.sendMessage({ "message": toCopy }, function (response) {
            console.log(response);
        });


    });

})(chrome||browser);