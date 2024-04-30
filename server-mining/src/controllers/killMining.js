import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';


export const killMining = async (req, res) => {
    try {
        const booleanValues = {
            mining: false,
        };

        // Convert the boolean values object to JSON string
        const jsonString = JSON.stringify(booleanValues);
        // console.log('maut')
        // Write the JSON string to a file
        fs.writeFileSync('./src/helper/isMining.json', jsonString);

        // console.log('into hell')

        // Respond with success message
        res.status(200).json({ message: 'Boolean values file created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
