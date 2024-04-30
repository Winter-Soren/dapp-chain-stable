import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from codecarbon import track_emissions, EmissionsTracker
import csv

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# function to get the carbon footprint
@track_emissions
def calculate_carbon_footprint():
    tracker = EmissionsTracker()
    tracker.start()
    # time.sleep(2)

    # Get the carbon footprint value

    tracker.stop()
    return tracker
    

@app.get("/carbon-footprint")
def get_carbon_footprint():
    return calculate_carbon_footprint()

def read_csv_data(filename):
    with open(filename, newline='') as csvfile:
        csv_reader = csv.DictReader(csvfile)
        return [row for row in csv_reader]


@app.get('/carbon-data')
def get_emission_data():
    csv_data = read_csv_data('./emissions.csv')
    return csv_data

if __name__ == "__main__":
    import uvicorn
    import pynvml
    uvicorn.run(app, host="0.0.0.0", port=8080)
