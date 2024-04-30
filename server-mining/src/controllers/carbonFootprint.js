import NodeCarbon from 'node-carbon';

export const getCarbonFootprint = async (req, res) => {
    try {
        // Initialize NodeCarbon instance
        const nodeCarbon = new NodeCarbon();

        // Wait for 1 second before stopping carbon logging
        setTimeout(async () => {
            // Stop carbon logging of current process
            const carbon = await nodeCarbon.stop();

            // Extract required values for response
            const responseData = {
                'CPU Usage (watts)': carbon.cpuUsageInfo.cpuUsage,
                'Total Time (s)': carbon.elapsedTime,
                'RSS Delta (Mb)': carbon.memoryUsageInfo.rssDeltaMB,
                'Heap Total Delta (Mb)': carbon.memoryUsageInfo.heapTotalDeltaMB,
                'Heap Used Delta (Mb)': carbon.memoryUsageInfo.heapUsedDeltaMB,
                'Carbon Consumption (gCO2e/kWh)': carbon.carbonEmission
            };

            // Send the response
            res.status(200).json(responseData);
        }, 1000);
    } catch (error) {
        // Send a JSON response with error message if an error occurs
        res.status(500).json({ message: error.message });
    }
};
