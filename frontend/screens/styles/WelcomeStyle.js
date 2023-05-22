import { StyleSheet } from "react-native";


const WelcomeStyle = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#38A69D',
    }, 
    containerLogo:{
      flex: 2,
      backgroundColor: '#38A69D',
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerForm:{
      flex: 1,
      backgroundColor: '#FFF',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingStart: '5%',
      paddingEnd: '5%'
    },
    title:{
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 28,
      marginBottom: 12,
    },
    text:{
      color: '#a1a1a1'
    },
    button:{
      position: 'absolute',
      backgroundColor: '#38A69D',
      borderRadius: 50,
      paddingVertical: 8,
      width: '60%',
      alignSelf: 'center',
      bottom: '15%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText:{
      fontSize: 18,
      color: '#FFF',
      fontWeight: 'bold',
    }
})

export default WelcomeStyle;