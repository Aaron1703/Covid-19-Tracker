import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
 

const MapBox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiYW5kcmVzYWFyb24iLCJhIjoiY2tjaGFhdzRrMGJkNzJ0bzMwZHVrZjV0biJ9.Up8Lr2xc4R2sCBVDMeHQrA'
});
 
// in render()

function Map(props){

  console.log(props)
  
return(
  <MapBox
    style="mapbox://styles/mapbox/dark-v9"
    zoom={[5]}
    containerStyle={{
        height: "100%",
        width: "100%",
    }}
    center={[props.longitude,props.latitude]}
>
    <Layer
        type="symbol"
        id="marker"
        layout={{ "icon-image": "marker-15" }}>

    </Layer>
    <Feature coordinates={[props.longitude,props.latitude]}/>
</MapBox>
    
);
}


export default Map;


