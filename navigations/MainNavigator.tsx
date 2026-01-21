import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PerfilScreen from '../screens/PerfilScreen';
import RegistroScreen from '../screens/RegistroScreen';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name='Registro' component={RegistroScreen}/>
      <Stack.Screen name='Perfil' component={PerfilScreen}/>
    </Stack.Navigator>
  );
}

export function MainNav(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}