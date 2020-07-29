import React, { useState, useEffect } from 'react';
import './App.css';
//import axios from 'axios';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import InfoBox from './Components/InfoBox';
import Map from './Components/Map/map';
function App() {
  // All Countrys show state
  const [ countries, setCountries ] = useState([]);
  // Individual Country Code show sate
  const [ country, setCountry ] = useState('worldwide');
  // Individual Country Information state
  const [ countryInfo, setCountryInfo ] = useState({});

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
           const countries = data.map(country =>({
             name: country.country,
             value: country.countryInfo.iso2,
           }))
           setCountries(countries)
         })
         
    }
    getCountriesData();
  }, [])

  // Country Change Handler
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    //setCountry(countryCode);
    const url = countryCode === 'worldwide' 
    ? "https://disease.sh/v3/covid-19/all"
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
       .then(response => response.json())
       .then(data => {
         setCountry(countryCode);

         setCountryInfo(data)
       })
  }

  console.log('Country Info Data: ', countryInfo);
  

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
              <MenuItem value={country.value}>{country.name}</MenuItem>
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
        <Map/>
      </div>
      
      <Card className="app_right">
         <CardContent>
            <h3>Live cases by country</h3>
            <h3>Worldwide new cases</h3>
         </CardContent>
      </Card>
    </div>
  );
}

export default App;