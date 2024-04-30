// index.js

import { Block } from "@ethereumjs/block";
import { Ethash } from "@ethereumjs/ethash";
import { MapDB, bytesToHex } from "@ethereumjs/util";

async function mineBlock(difficulty, noOfBlocks) {
    
    const block = Block.fromBlockData(
        {
            header: {
                difficulty: BigInt(difficulty),
                number: BigInt(noOfBlocks),
            },
        },
        { setHardfork: true, skipConsensusFormatValidation: true }
    );

    const cacheDB = new MapDB();

    const e = new Ethash(cacheDB);
    const miner = e.getMiner(block.header);

    const startTime = Date.now(); // Start time
    const solution = await miner.iterate(-1); // iterate until solution is found
    const endTime = Date.now(); // End time

    const timeDifference = endTime - startTime; // Difference in milliseconds

    return {
        blockNumber: noOfBlocks,
        difficulty: difficulty,
        timeTaken: timeDifference,
        mixHash: bytesToHex(solution.mixHash),
    };
}

async function main() {
    // Parse command line arguments
    const args = process.argv.slice(2); // Remove the first two elements (node and script name)

    let difficulty = 100; // Default difficulty
    let noOfBlocks = 1; // Default number of blocks

    // Loop through arguments to find difficulty and noOfBlocks
    args.forEach(arg => {
        const parts = arg.split('=');
        if (parts[0] === '--difficulty') {
            difficulty = parseInt(parts[1]); // Parse the value as an integer
        } else if (parts[0] === '--noOfBlocks') {
            noOfBlocks = parseInt(parts[1]); // Parse the value as an integer
        }
    });

    // Call mineBlock function with arguments
    const result = await mineBlock(difficulty, noOfBlocks);
    console.log(JSON.stringify(result));
}

main();

