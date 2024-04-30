import { Block } from "@ethereumjs/block";
import { Ethash } from "@ethereumjs/ethash";
import { DBObject, MapDB, bytesToHex } from "@ethereumjs/util";

const block = Block.fromBlockData(
  {
    header: {
      difficulty: BigInt(1000),
      number: BigInt(1),
    },
  },
  { setHardfork: true, skipConsensusFormatValidation: true }
);

const cacheDB = new MapDB<number, DBObject>();

const e = new Ethash(cacheDB);
const miner = e.getMiner(block.header);

async function main() {
  const startTime = Date.now(); // Start time
  const solution = await miner.iterate(-1); // iterate until solution is found
  const endTime = Date.now(); // End time

  const timeDifference = endTime - startTime; // Difference in milliseconds
  console.log(`Time taken: ${timeDifference} milliseconds`);

  console.log(bytesToHex(solution!.mixHash)); // 0x892177e7bbb1f31ade0610707c96c6bf86e1415b26073d17b2da2dbd2daefd1e
}

main();
