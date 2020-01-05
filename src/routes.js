import { createAppContainer } from 'react-navigation'

import { createStackNavigator } from 'react-navigation-stack';
import Main from './pages/Main'
import User from './pages/User'

const Routes = createStackNavigator({
  Main, User
},
{
  headerLayoutPreset: 'center',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#7159c1'
    },
    headerTintColor: '#fff'
  }
}) ;

export default createAppContainer(Routes);
