const cron = require("node-cron");
const { spawn } = require("child_process");

function executeJob(jobLocation) {
  console.log(executeJob);
  const ls = spawn("node", [jobLocation]);

  ls.stdout.on("data", data => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on("data", data => {
    console.error(`stderr: ${data}`);
  });

  ls.on("close", code => {
    console.log(`child process exited with code ${code}`);
  });
}

async function tryCell(model, input) {
  executeJob("../functions/try.js");
}

async function trainCell(input) {
  executeJob("../functions/train.js");
}

async function examineCell(req, res) {
  executeJob("../functions/examine.js");
}

async function useCell(req, res) {
  executeJob("../functions/use.js");
}
module.exports = {
  examineCell,
  trainCell,
  tryCell,
  useCell
};
