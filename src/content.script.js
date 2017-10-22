
const commitQuery = document.querySelector(".commit-message").textContent.split(/(?=[\d]{5,7})/);
const commitMessage = commitQuery[0] || "Sem informações";
const commitTask = commitQuery[1] || "";
const commitLink = document.querySelector("a.changeset-hash");
const commitBranch = document.querySelector(".commit-branches > a");

const toCopy = `
${commitMessage}

"task: #${commitTask}":http://tickets.id5.com.br:3001/issues/${commitTask}
"commit: ${commitLink.textContent}":${commitLink.href}
"branch: ${commitBranch.textContent.trim()}":${commitBranch.href}
`;

const dummyElement = document.createElement("textArea");

dummyElement.setAttribute("name", "dummyElement");
dummyElement.value = toCopy;

document.body.appendChild(dummyElement);

dummyElement.select();

document.execCommand("copy");

document.body.removeChild(dummyElement);
