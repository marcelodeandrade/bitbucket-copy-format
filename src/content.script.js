(browser => {
    "use strict";

    const commitQuery = document.querySelector(".commit-message").textContent.split(/(?=[\d]{5,7})/);
    const commitMessage = commitQuery[0] || "Sem informações";
    const commitTask = commitQuery[1] || "";
    const commitLink = document.querySelector("span.changeset-hash");
    const commitBranch = document.querySelector(".commit-branches > a");

    const toCopy = [
        `${commitMessage}`,
        `"task: #${commitTask}":http://tickets.id5.com.br:3001/issues/${commitTask}`,
        `"commit: ${commitLink.textContent.trim()}":https://bitbucket.org/id5-web/websad-extranet/commits/${commitLink.textContent}`,
        `"branch: ${commitBranch.textContent.trim()}":${commitBranch.href}`
    ].join('\n');

    const dummyElement = document.createElement("textArea");

    dummyElement.setAttribute("name", "dummyElement");
    dummyElement.value = toCopy;

    document.body.appendChild(dummyElement);

    dummyElement.select();

    document.execCommand("copy");

    document.body.removeChild(dummyElement);

    browser.runtime.sendMessage({"message": toCopy}, function(response) {
        console.log(response);
    });

})(chrome||browser);