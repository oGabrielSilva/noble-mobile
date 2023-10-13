import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ChatScreen } from '@Noble/screens/home/tab/ChatScreen';
import { ExploreScreen } from '@Noble/screens/home/tab/ExploreScreen';
import { FeedScreen } from '@Noble/screens/home/tab/FeedScreen';
import { useContext } from 'react';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { SettingsScreen } from '../screens/home/tab/SettingsScreen';

export type RootTabParamList = {
  Chats: undefined;
  Feed: undefined;
  Explore: undefined;
  Settings: undefined;
};

const Tab = createMaterialTopTabNavigator<RootTabParamList>();

export function HomeTabHandler() {
  const { design } = useContext(GlobalContext);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarPressColor: design.variant,
        tabBarActiveTintColor: design.title,
        tabBarInactiveTintColor: design.textPlaceholder,
        tabBarIndicatorStyle: { backgroundColor: design.link },
        tabBarStyle: { backgroundColor: design.primary },
      }}>
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
