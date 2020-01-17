import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import Profile from './pages/Profile';

const Routes = createAppContainer(
  createStackNavigator({
    Main : {
      screen: Main,
      navigationOptions: {
        headerTitle: 'DevRadar',
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        headerTitle: 'Perfil no GitHub',
      }
    },
  }, {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerTintColor: '#FFFFFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerStyle: {
        backgroundColor: '#7D40E7',
      },
    }
  })
);

export default Routes;