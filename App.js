import HomeScreen from './screens/HomeScreen';
import ListaUsuarioScreen from './screens/ListaUsuarioScreen'
import DetalhesUsuarioScreen from './screens/DetalhesUsuarioScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

export default function App() {

  const Drawer = createDrawerNavigator();

  function DrawerNavigation(){
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Lista de Usuarios" component={ListaUsuarioScreen}/>
        <Drawer.Screen name="DetalhesUsuario" component={DetalhesUsuarioScreen}
          options={{
            drawerItemStyle: {display: 'none'},
          }}/>
      </Drawer.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <DrawerNavigation/>
    </NavigationContainer>
  );
}

