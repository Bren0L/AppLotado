import { Text, TextInput, View, TouchableOpacity, ToastAndroid } from 'react-native';
import styles from './styles/LoginStyle';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import socket from '../wsServer/websocketServer';


export default function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    
    
    const handleLogIn = () => {
        const login = { email: email, password: password };

        socket.emit("login", login, (response) => response? navigation.navigate("Home", {userId: response.userId }) : ToastAndroid.show("Email Inválido", ToastAndroid.SHORT));
    };
    


    return(
        <View style={styles.conteiner}>

            <Animatable.View animation="fadeInLeft" delay={500} style={styles.conteinerHeader}>
                <Text style={styles.message}>Bem-vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.conteinerForm}>
            <Text style={styles.title}>Email</Text>
            <TextInput style={styles.input} inputMode="email" placeholder="Digite seu email" placeholderTextColor="#bbb" value={email} onChangeText={(email) => setEmail(email)}/>
            
            <Text style={styles.title}>Senha</Text>
            <TextInput style={styles.input} secureTextEntry={true} placeholder="Sua senha" placeholderTextColor="#bbb" value={password} onChangeText={(password) => setPassword(password)}/>
            
            <TouchableOpacity style={styles.button} onPress={handleLogIn}>
                <Text style={styles.buttonText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonRegister}>
            <Text style={styles.registerText} onPress={() => navigation.navigate("Register")}>Não possui uma conta? Cadastre-se</Text>
            </TouchableOpacity>

            </Animatable.View>
        </View>
    );
}

