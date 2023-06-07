import { Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import styles from "./styles/ConfigBusStyle";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import socket from "../wsServer/websocketServer";
import { useState } from "react";



const LOCATION_TASK = "expo-location-task";


export default function ConfigBus({ route }){
    const user = route.params.params.userId;
    const [hasStarted, setHasStarted] = useState(false);
    
    
    /*const setBreakReason = async() => {
        try{
            const docRef = await addDoc(collection(firebase.firestore(), 'offBus'), {tittle: 'ônibus inativo', description: 'Problemas tecnicos'});
            console.log('document created with id ', docRef.id);
        }catch(e){
            console.error('error addind document', e);
        }
    };*/

    const stopSendData = () => {
        socket.emit("stopSendingLocation", user);
        TaskManager.isTaskRegisteredAsync(LOCATION_TASK).then((tracking) => {
            if(tracking){
                Location.stopLocationUpdatesAsync(LOCATION_TASK);
            }
        })
        setHasStarted(false);
    }

    const startSendData = async() => {
        if(hasStarted){
            console.log("Task is already in use");
            return;
        }
        await Location.enableNetworkProviderAsync();
        await Location.requestForegroundPermissionsAsync();
        await Location.requestBackgroundPermissionsAsync();
        
        const providerStatus = await Location.getProviderStatusAsync();

        if(providerStatus.locationServicesEnabled && 
            providerStatus.gpsAvailable && 
            providerStatus.backgroundModeEnabled && 
            providerStatus.networkAvailable){
                await Location.startLocationUpdatesAsync(LOCATION_TASK, {
                    accuracy: Location.LocationAccuracy.BestForNavigation, 
                    deferredUpdatesInterval: 2000, 
                    showsBackgroundLocationIndicator: true, 
                    foregroundService: { notificationTitle: "Localização", notificationBody:"Transmitindo localização de fundo" }
                });
                setHasStarted(await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK));
                console.log("Task registered");
            }
        
    };

    TaskManager.defineTask(LOCATION_TASK, ({data: { locations }, error}) => {
        if(locations){
            const lat = locations[0].coords.latitude;
            const long = locations[0].coords.longitude;
            const data = {user, lat, long};
            socket.emit("sendLocation", data);
        }
        
        if(error){
            console.error(error);
        }
    });

    return(
        <View style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity style={styles.TOStart} onPress={() => startSendData()}>
                <Text style={styles.Text}>COMEÇAR VIAGEM</Text>
            </TouchableOpacity>
            

            <TouchableOpacity style={styles.TOStop} onPress={() => stopSendData()}>
                <Text style={styles.Text}>FINALIZAR VIAGEM</Text>
            </TouchableOpacity>
            
            
            <TouchableOpacity style={styles.TOBreak} onPress={() => setBreakReason()}>
                <Text style={styles.Text}>INTERROMPER VIAGEM</Text>
            </TouchableOpacity>
        </View>
    );

}




