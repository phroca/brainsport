import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProgresScreen from '../screens/ProgresScreen';
import ProfilScreen from '../screens/ProfilScreen';

const Stack = createNativeStackNavigator();


const ProfilNavigator = () => {

        return (
            
            <Stack.Navigator initialRouteName="Profil Home" screenOptions={{ headerShown: false }}>
              
                    <Stack.Screen name="Profil Home" component={ProfilScreen} />
                    <Stack.Screen name="Progres" component={ProgresScreen} />
     
            </Stack.Navigator>
        );
}

export default ProfilNavigator