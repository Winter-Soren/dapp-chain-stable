#!/bin/bash

# Define the number of instances to spawn
NUM_INSTANCES=20

# Loop to spawn instances
for ((i=1; i<=$NUM_INSTANCES; i++)); do
    ts-node index.ts &  # Execute ts-node in the background
    sleep 1  # Optional: add a delay between spawning each instance
done
