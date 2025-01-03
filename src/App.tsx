import { useState } from "react";
import axios from "axios";

function App() {
  const [info, setData] = useState<any>({});
  const [location, setLocation] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d806e087165246bbcd13b7d22e06bc3e`;

  const searchLocation = (event: { key: string }) => {
    if  (event.key === "Enter") {
      axios.get(url).then((response) => {
          setData(response.data);
          setError(null);
        })
        .catch(() => {
          setError("Unable to find the location. Please try again.");
          setData({});
        });

      setLocation("");
    }
  };

  return (
    <>
    <div className="app" >
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
         onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      
      {error && <h2 style={{ color: "red", textAlign:"center" }}>{error}</h2>}
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{info.name}</p>
          </div>
          <div className="temp">
            {info.main ? (
              <h2>
                Temperature &nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {(info.main.temp - 273.15).toFixed()}°C
              </h2>
            ) : null}
          </div>
          <div>
            {info.main ? (
              <h2>
                Humidity &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {info.main.humidity.toFixed()}%
              </h2>
            ) : null}
          </div>
          <div>
            {info.wind ? (
              <h2>
                WindSpeed &nbsp;&nbsp;&nbsp;&nbsp; {info.wind.speed}
                &nbsp;meter/sec
              </h2>
            ) : null}
          </div>
          <div>
            {info.wind ? (
              <h2>Degree &nbsp;&nbsp;&nbsp;&nbsp; {info.wind.deg}</h2>
            ) : null}
          </div>
          <div>
            {info.coord ? <h2>Lattitude&nbsp;&nbsp;&nbsp;{info.coord.lat}</h2> : null}
          </div>
          <div>
            {info.coord ? <h2>Longitude&nbsp;&nbsp;&nbsp;{info.coord.lon}</h2> : null}
          </div>
          <div className="description">
          {info.weather ? <p>  Weather {info.weather[0].main}</p> : null}
          </div>
        </div>
      </div>
      <div>
      <h4 style={{ textAlign:"right" }} > WeatherApp &#169; 2024 Md Mozzafar Ahmed.</h4>
      </div>
    </div >
    </>
  );
}

export default App;
