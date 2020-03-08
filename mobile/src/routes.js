import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator({
          Deliveries,
          Profile,
        }),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
