import { promisify } from 'util';
import { exec } from 'child_process';
import terminate from 'terminate';
import fs from 'fs';


const promiseExec = promisify(exec);
export const mine = async (req, res) => {
  try {
    const children = [];
    const { difficulty, noOfBlocks, instances } = req.body;

    var termination = false;
    const booleanValues = {
      mining: true,
    };

    // Convert the boolean values object to JSON string
    const jsonString = JSON.stringify(booleanValues, null, 2);

    // Write the JSON string to a file
    fs.writeFileSync('./src/helper/isMining.json', jsonString);

    const results = [];

    const mineProcess = [];
    for (let i = 0; i < instances; i++) {
      const command = `node ./src/helper/mineBlock.js --difficulty=${difficulty} --noOfBlocks=${noOfBlocks}`;
      const child = promiseExec(command);
      children.push(child.child)
      mineProcess.push(child)
    }


    const terminationCheckInterval = setInterval(() => {
      fs.readFile('./src/helper/isMining.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return; // Continue checking for termination
        }
        const json_data = JSON.parse(data);
        if (!json_data.mining) {
          children.forEach(child => {
            terminate(child.pid, (err) => {
              if (err) {
                console.error('Error terminating process:', err);
              }
            });
          });
          clearInterval(terminationCheckInterval); // Stop checking for termination
          termination = true;
        }
      });
    }, 100)


    const values = await Promise.all(mineProcess);

    values.forEach((value, index) => {
      const result = JSON.parse(value.stdout);
      results.push(result);
    });


    // send the results
    // if (!termination)
    res.json(results);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
