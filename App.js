import React,{useEffect, useState} from 'react'
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData,prettyPrintStat } from './util';
import LineGraph from './LineGraph';



function App() {

  const [countries, setcountries]= useState([]);           {/*this use state was made first  */}
  const [country,setcountry]=useState("worldwide");         {/*this use state was made to fill in the default value world wide  */}
  const [countryInfo,setCountryInfo]=useState({countryInfo:{lat: -27, long: 133}});
  const [tableData,setTableData]=useState([]);
  const [casesType, setCasesType] = useState("cases");


  
  useEffect(()=>{
    
    fetch('https://disease.sh/v3/covid-19/all').then((response)=>{
      return response.json()}).then((data)=>{
        data.countryInfo={lat: -27, long: 133}
        console.log(data);
        setCountryInfo(data);
        


      })
  },[])

  useEffect(()=>{

    const getCountriesData= async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>
      response.json()).then((data)=>{
        const countries=data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
          }

        ));

        

        const sortedData=sortData(data);
        setTableData(sortedData);
        setcountries(countries);
        console.log(data);
       
       

      });
    };
    getCountriesData();

  },[]);

  const onCountryChange=async (event) =>{
    const countryCode=event.target.value;
    setcountry(countryCode);

    const url= countryCode==='worldwide' ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url).then((response) =>{
      return response.json()}).then((data)=>{
        setcountry(countryCode);
        setCountryInfo(data);


        console.log("hello world");
        console.log(country);
        
      });

    };

    console.log(countryInfo);



  return (
    <div className="App">
      <div className="App__left">
        <div className="app__header">
          <h1>COVID 19 TRACKER</h1>
          <FormControl className="app__dropdown">   {/*FormControl is a material ui component. also class name is given according to BEM naming convention */}
            <Select onChange={onCountryChange}  variant="outlined" value={country}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) =>(
                  <MenuItem value={country.value}>{country.name}</MenuItem> 
                  
                )
                )
                

              }
            

              {/* <MenuItem value="worldwide">Worldwide</MenuItem> 
              <MenuItem value="worldwide">Option two</MenuItem>
              <MenuItem value="worldwide">Option 3</MenuItem>
              <MenuItem value="worldwide">Forcaaa</MenuItem>
              */}
            </Select>

          </FormControl>

        </div>

        <div className="app__stats">
          <InfoBox active={casesType === 'cases'} onClick={(e) => setCasesType('cases')} title="coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)}  total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox active={casesType === 'recovered'}onClick={(e) => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)}  total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox active={casesType === 'recovered'} onClick={(e) => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/>

        </div>
        < Map latitude={countryInfo.countryInfo.lat} longitude={countryInfo.countryInfo.long}/>

     

      
    
      </div>
      <Card className="App__right">
        <CardContent>
          <h3>Live Cases By Country</h3>
          <Table countries={tableData}/>

          <h3>World Wide New Cases</h3>
          <LineGraph casesType={casesType} />
        </CardContent>

      </Card>
    </div>

      
  );
}

export default App;
