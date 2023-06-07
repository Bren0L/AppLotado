import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import styles from './styles/WelcomeStyle';



export default function Welcome(){

const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.containerLogo}>
        <Animatable.Image
        delay={2000}
        animation="flipInY"
        source={require("./img/logo2.png")}
        style={{ width: "50%", height: "39%" }}
        resizeMode="contain"
        borderTopLeftRadius={100}
        borderTopRightRadius={10}
        borderBottomLeftRadius={100}
        borderBottomRightRadius={100}
        />
      </View>

      <Animatable.View delay={2600} animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Encontre os ônibus da linha 970-mosqueiro!</Text>
        <Text style={styles.text}>Faça o login para começar</Text>

        <TouchableOpacity style={styles.button}
        onPress={ () => navigation.navigate("Login") }>
            <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
}
