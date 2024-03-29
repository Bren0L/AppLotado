import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useState, useEffect, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions, Text, View } from 'react-native';
import socket from '../wsServer/websocketServer';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { MAP_API_KEY } from "@env";
import BUS_STOP_ICON from "../assets/bus_stop_icon.png";
import BUS_ICON from "../assets/bus_icon.png";



const defaultCoordinate = {
    latitude: -1.450495,
    longitude: -48.468129,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
};

export default function Map(){
  const sheetRef = useRef(null);
  const snapPoints = [150, 400]

    const [buses, setBuses] = useState([]);
    const [getBus, setBus] = useState(null);
    const [getBusStop, setbusStop] = useState(null);
    const [distance, setDistance] = useState('');
    const [time, setTime] = useState('');
    

    useEffect(() => {
        
        socket.emit("getBusesLocation");
        socket.on("busesLocation", location => {
            setBuses(location);
            console.log("Buses: ", location);
        });
        

        
        
        /*async() => {
            await Location.enableNetworkProviderAsync();
            const {status} = await Location.requestForegroundPermissionsAsync();
            
            if(status == "granted"){
                const location = await Location.getCurrentPositionAsync();
                setOrigin({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421
                });
            } else {
                throw new Error("Localização não garantida");
            }
        };*/
        
        socket.on("locationStopped", () => setBuses(null));
            
    }, []);

    

    return(
        <View>
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: Dimensions.get("window").width, height: Dimensions.get("window").height}}
            showsUserLocation={true}
            showsTraffic={true}
            followsUserLocation={true}
            loadingEnabled={true}
            initialRegion={defaultCoordinate}
        >   
            {require("../routes/Mosqueiro.json").map((busStop, keys) => (
                <Marker
                    coordinate={{latitude: busStop.latitude, longitude: busStop.longitude}}
                    key={keys}
                    title={busStop.name}
                    image={BUS_STOP_ICON}
                    onPress={() => {
                        busStop.key = keys;
                        setbusStop(busStop);
                        console.log(getBusStop);
                    }}
                />
                
            ))}
            
            {buses && buses.map((bus, busIndex) => (
                //console.log("Index: ", busIndex),
                <Marker 
                    coordinate={{latitude: bus.latitude, longitude: bus.longitude}} 
                    key={-busIndex-1} 
                    description={bus.status} 
                    image={BUS_ICON}
                    title='Mosqueiro' 
                    onPress={() => {
                        setBus({latitude: bus.latitude, longitude: bus.longitude});
                        console.log(busIndex)
                    }}
                />
            ))}

            
            {getBus && getBusStop && 
                <MapViewDirections 
                mode="DRIVING"
                origin={getBus}
                destination={{latitude: getBusStop.latitude, longitude: getBusStop.longitude}}
                timePrecision="now"
                apikey={MAP_API_KEY}
                strokeColor="#88E"
                onReady={(props) => {
                    setDistance(props.distance);
                    setTime(props.duration);
                    console.log("Data set");
                }}
                strokeWidth={4}/>
            }
            
        </MapView>
        <BottomSheet
            ref={sheetRef}
            snapPoints={snapPoints}
        >
            <BottomSheetView style={{display: 'flex', flexDirection: 'row'}}>
                <View style={{width: "50%"}}>
                <Text style={{fontSize: 20, paddingBottom: 10}}>Onibus:</Text>
                <Text style={{fontSize: 20, paddingBottom: 10}}>Parada:</Text>
                <Text style={{fontSize: 20, paddingBottom: 10}}>Tempo:</Text>
                <Text style={{fontSize: 20, paddingBottom: 10}}>Distância:</Text>
                </View>
                <View style={{width: "50%", flex: 1}}>
                    <Text style={{fontSize: 20, paddingBottom: 10}}>Mosqueiro</Text>
                    <Text style={{fontSize: 12, paddingBottom: 10}}>{getBusStop && getBusStop.name}</Text>
                    <Text style={{fontSize: 20, paddingBottom: 10}}>{Math.trunc(time)} minutos</Text>
                    <Text style={{fontSize: 20, paddingBottom: 10}}>{distance}</Text>
                </View>
            </BottomSheetView>
        </BottomSheet>
        
        </View>
    );
}
