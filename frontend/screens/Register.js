import { View, Text, TextInput, TouchableOpacity } from "react-native"
import styles from './styles/RegisterStyle'
import { useState } from "react";
import { firebase } from "../important_files/FirebaseConfig";
import * as Animatable from 'react-native-animatable';


export default function Register({ navigation }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const handleSingUp = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredencials => {
            const user = userCredencials.user;
            alert("conta criada com sucesso");
            navigation.navigate("Home");

        }).catch(error => alert(error.message))
    }


    return(
        <View style={styles.conteiner}>
            <Animatable.View animation="fadeInUp" style={styles.conteinerForm}>
            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} placeholder="Digite seu email." placeholderTextColor="#bbb" value={email} onChangeText={(email) => setEmail(email)}/>
            
            <Text style={styles.title}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Digite uma senha" placeholderTextColor="#bbb" value={password} onChangeText={(password) => setPassword(password)}/>
            
            <TouchableOpacity style={styles.button} onPress={handleSingUp}>
                <Text style={styles.buttonText}>Criar Conta</Text>
            </TouchableOpacity>
            </Animatable.View>
            
        </View>
    )
}

