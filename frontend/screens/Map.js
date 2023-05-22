import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect, useRef } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import MAP_API_KEY from '../important_files/map_api_key';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import { Dimensions, Text } from 'react-native';
import { Mosqueiro } from '../routes/Mosqueiro';
import { firebase } from '../important_files/FirebaseConfig';



const defaultCoordinate = {
    latitude: -1.450495,
    longitude: -48.468129,
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00421
};

export default function Map(){
    
    const [buses, setBuses] = useState([]);
    const [origin, setOrigin] = useState({
        latitude: -1.450495,
        longitude: -48.468129,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00421
    });

    useEffect(() => {
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
        
        firebase.database()
            .ref('users/')
            .on('child_changed', snapshot => {
                const coords = snapshot.val();
                setBuses([coords]);

                console.log("Coords: ", coords);
            });
        
        firebase.database()
            .ref('users/')
            .on('child_removed', () => {
                setBuses(null);
            });
            
    }, []);

    

    return(
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
            showsUserLocation={true}
            showsTraffic={true}
            followsUserLocation={true}
            loadingEnabled={true}
            initialRegion={defaultCoordinate}
        >   
            
            {buses && buses.map((coords) => {
                let cont = 0;
                return(
                    <Marker coordinate={coords} key={cont++}>
                        <Ionicons name='bus-outline' size={20}/>
                            <Callout style={{minWidth: 120}}>
                                <Text>Bus</Text>
                            </Callout>
                    </Marker>
                )
            })}
            
            <MapViewDirections 
                mode='DRIVING'
                timePrecision='now'
                apikey="AIzaSyA0mRDQaXehkmPBi0l0KN4QLnr0A5KYGXk"
                strokeColor="#8E8"
                strokeWidth={4}/>
        </MapView>
        
    );
}

/*{Mosqueiro.map( (point) => {
    return(
        <Marker coordinate={point} key={point.key}>
            <Ionicons name='bus-outline' size={20}/>
            <Callout style={{minWidth: 120}}>
                <Text>Parada Sao-Bras</Text>
            </Callout>
        </Marker>
    );
})}*/