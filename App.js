import HomeScreen from './screens/HomeScreen';
import ListaPratosScreen from './screens/ListaPratosScreen';
import DetalhesPratoScreen from './screens/DetalhesPratoScreen';
import ListaMesasScreen from './screens/ListaMesasScreen';
import ListaPedidosScreen from './screens/ListaPedidosScreen';
import CadastroClienteScreen from './screens/CadastroClienteScreen';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const Drawer = createDrawerNavigator();

  function DrawerNavigation(){
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="Cardápio" component={ListaPratosScreen}/>
        <Drawer.Screen name="Mesas" component={ListaMesasScreen}/>
        <Drawer.Screen name="Pedidos" component={ListaPedidosScreen}/>
        <Drawer.Screen name="Clientes" component={CadastroClienteScreen}/>
        <Drawer.Screen name="DetalhesPrato" component={DetalhesPratoScreen}
          options={{
            drawerItemStyle: {display: 'none'},
          }}/>
      </Drawer.Navigator>
    );
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <DrawerNavigation/>
      </NavigationContainer>
    </PaperProvider>
  );
}
