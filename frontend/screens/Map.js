import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MAP_API_KEY from '../important_files/map_api_key';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { Dimensions, Image, Text } from 'react-native';
import { Mosqueiro } from '../routes/Mosqueiro';
import socket from '../wsServer/websocketServer';



const defaultCoordinate = {
    latitude: -1.450495,
    longitude: -48.468129,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
};

export default function Map(){
    
    const [buses, setBuses] = useState([]);
    const [getBus, setBus] = useState(null);
    const [stopBus, setStopBus] = useState(null);
    const [origin, setOrigin] = useState({
        latitude: -1.450495,
        longitude: -48.468129,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
    });

    useEffect(() => {
        
        socket.emit("getBusesLocation");

        socket.on("busesLocation", location => setBuses([location]));
        
        (async() => {
            
            await Location.enableNetworkProviderAsync();
            const {status} = await Location.requestForegroundPermissionsAsync();
        if(status == "granted"){
            const location = await Location.getCurrentPositionAsync();
            setOrigin({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00922,
                longitudeDelta: 0.00421
            })();
        } else {
            throw new Error("Localização não garantida");
        }
        });
        
        socket.on("locationStopped", () => setBuses(null));
            
    }, []);

    

    return(
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height}}
            showsUserLocation={true}
            showsTraffic={true}
            followsUserLocation={true}
            loadingEnabled={true}
            initialRegion={defaultCoordinate}
            onDoublePress={(stopBus) => setStopBus(stopBus.nativeEvent.coordinate)}
        >   
            
            {buses && buses.map((bus) => {
                let cont = 0;
                return(
                    <Marker 
                        coordinate={{latitude: bus.latitude, longitude: bus.longitude}} 
                        key={cont++} 
                        description={bus.status} 
                        title='Mosqueiro' 
                        onPress={() => {
                            setBus({latitude: bus.latitude, longitude: bus.longitude});
                        }}
                        >
                        <Ionicons name='bus-outline' size={20}></Ionicons>
                    </Marker>
                );
            })}
            
            {getBus && stopBus && 
                <MapViewDirections 
                mode="DRIVING"
                origin={getBus}
                destination={stopBus}
                timePrecision="now"
                apikey={MAP_API_KEY}
                strokeColor="#88E"
                onReady={(props) => console.log(props.distance)}
                strokeWidth={4}/>
            }
            
        </MapView>
        
    );
}