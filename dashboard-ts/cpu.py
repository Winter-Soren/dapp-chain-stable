import psutil

def get_cpu_temperature():
    try:
        # Assuming the thermal zone is 0; you may need to adjust this based on your system
        thermal_zone_path = "/sys/class/thermal/thermal_zone0/temp"
        with open(thermal_zone_path, "r") as file:
            temperature = float(file.read()) / 1000.0
            return temperature
    except FileNotFoundError:
        return None

cpu_temperature = get_cpu_temperature()

if cpu_temperature is not None:
    print(f"CPU Temperature: {cpu_temperature} °C")
else:
    print("Unable to retrieve CPU temperature.")
