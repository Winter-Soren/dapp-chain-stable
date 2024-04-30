import si from 'systeminformation';

export const getCpuMetrics = async (req, res) => {
    try {
        const cpuData = await si.cpu();
        const cpuCurrentSpeedData = await si.cpuCurrentspeed;
        const cpuTemperatureData = await si.cpuTemperature();
        const currentLoadData = await si.currentLoad();
        const memory = await si.mem();

        res.status(200).json({
            cpuData,
            cpuCurrentSpeedData,
            cpuTemperatureData,
            currentLoadData,
            memory
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};