import React, { useState, useEffect } from 'react';
import './App.css';
//import axios from 'axios';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import Map from './Components/Map/map';
import Table from './Sidebar/Table';
import { sortData } from './utiliy';
import LineGraph from './Sidebar/Graph';
import "leaflet/dist/leaflet.css";
function App() {
  // All Countrys show state
  const [ countries, setCountries ] = useState([]);
  // Individual Country Code show sate
  const [ country, setCountry ] = useState('worldwide');
  // Individual Country Information state
  const [ countryInfo, setCountryInfo ] = useState({});
  // 
  const [ tableData, setTableData ] = useState([]); 

  const [ mapCenter, setMapCenter ] = useState({ lat: 34.80764, lng: -40.4796 });

  const [ mapZoom, setMapZoom ] = useState(3);

  const [mapCountries, setMapCountries] = useState([]);

  // All Country Data
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
       .then(response => response.json())
       .then(data => {
         setCountryInfo(data)
       }) 
  }, [])

  // Show all countrys
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
         .then(response => response.json())
         .then((data) => {
           console.log("All country Data", data)
           const countries = data.map(country =>({
             name: country.country,
             value: country.countryInfo.iso2,
           }))

           const sortedData = sortData(data);
           setTableData(sortedData);
           setMapCountries(data);
           setCountries(countries);
         })
         
    }
    getCountriesData();
  }, [])

  // Country Change Handler
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //setCountry(countryCode);
    const url = countryCode === "worldwide" 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
       .then((response) => response.json())
       .then((data) => {
         setCountry(countryCode);
         setCountryInfo(data);
         
         setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
         setMapZoom(4); 
       })
       
  }

  //console.log('Country Info Data: ', countryInfo);
  //[data.countryInfo.lat, data.countryInfo.lng]

  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h2>COVID-19 Tracker React Js Application</h2>
          <FormControl className="app_dropdown">
          
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide" >worldwide</MenuItem>
          {
            countries.map(country => (
              <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
            ))
          }
          
          </Select>
        </FormControl>
      </div>

        <div className="app_stats">
          <InfoBox
             title="Coronavirus Cases"
             cases={countryInfo.todayCases} 
             total={countryInfo.cases}
          />
          <InfoBox 
            title="Recoverd" 
            cases={countryInfo.todayRecovered} 
            total={countryInfo.recovered}
          />
          <InfoBox 
            title="Deaths" 
            cases={countryInfo.todayDeaths} 
            total={countryInfo.deaths}
          />
        </div>
        
        <Map MapCountries={mapCountries} center={mapCenter} zoom={mapZoom}/>
      </div>
      
      <Card className="app_right">
         <CardContent>
            <h3>Live cases by country</h3>
            <Table countries={tableData}/>
            <LineGraph/>
         </CardContent>
      </Card>
      
    </div>
  );
}

export default App;