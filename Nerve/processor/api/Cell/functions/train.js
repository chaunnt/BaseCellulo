async function executeTrain() {
  var child_process = require('child_process');
  let commandString =
    'python3 ' +
    process.env.LEARNING_CELL +
    ' --train ' +
    console.log('command string: ' + commandString);

  child_process.exec(commandString, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
  });
}

executeTrain();
