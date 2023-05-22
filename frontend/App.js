import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './screens/Home';
import Login from './screens/Login';
import Register from './screens/Register';
import ConfigBus from './screens/ConfigBus';
import Welcome from './screens/Welcome';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
       initialRouteName="Welcome"
       useLegacyImplementation={true}
       screenOptions={{headerStyle:{backgroundColor: "#38a69d"}, statusBarStyle: 'light', statusBarColor: "#000", headerTitle: "", headerTintColor: "#FFF"}}>
        <Stack.Group>
          <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="ConfigBus" component={ConfigBus}/>
          <Stack.Screen name='Register' component={Register}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
