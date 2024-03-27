const { exec } = require('child_process');

async function executeCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${error}`);
          return;
        }
      
        if (stderr) {
          console.error(`Command STDERR: ${stderr}`);
        }
      
        console.log(`Command STDOUT: ${stdout}`);
      });
}

async function executeMultipleCommands(commands) {
  for (const command of commands) {
    await executeOneCommand(command);
}
}

function executeOneCommand(command) {
  return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
          if (error) {
              reject(`Error executing command: ${error}`);
              return;
          }

          if (stderr) {
              console.error(`Command STDERR: ${stderr}`);
          }

          console.log(`Command STDOUT: ${stdout}`);
          resolve();
      });
  });
}
module.exports = {executeCommand, executeMultipleCommands}
