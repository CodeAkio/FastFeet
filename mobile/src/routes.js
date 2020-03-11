import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';

import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';

import Details from '~/pages/Delivery/Details';
import ReportProblems from '~/pages/Delivery/ReportProblems';
import ShowProblems from '~/pages/Delivery/ShowProblems';
import Confirm from '~/pages/Delivery/Confirm';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createBottomTabNavigator(
          {
            Deliveries: {
              screen: createStackNavigator(
                {
                  Deliveries,
                  Details,
                  ReportProblems,
                  ShowProblems,
                  Confirm,
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: true,
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 16,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarLabel: 'Entregas',
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={25} color={tintColor} />
                ),
              },
            },
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999',
              style: {
                backgroundColor: '#fff',
                height: 60,
                paddingTop: 10,
              },
              labelStyle: {
                fontSize: 14,
              },
            },
          }
        ),
        Delivery: createStackNavigator(
          {
            Deliveries,
            Details,
            ReportProblems,
            ShowProblems,
            Confirm,
          },
          {
            defaultNavigationOptions: {
              headerTransparent: true,
              headerTintColor: '#fff',
              headerLeftContainerStyle: {
                marginLeft: 16,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
