import { createDrawerNavigator } from '@react-navigation/drawer';
import Map from './Map';
import ConfigBus from './ConfigBus';



const Drawer = createDrawerNavigator();

export default function Home({ route }){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="Map" component={Map}/>
            <Drawer.Screen name="ConfigBus" component={ConfigBus} initialParams={{userId: route.params}}/>
      </Drawer.Navigator>
    )
}