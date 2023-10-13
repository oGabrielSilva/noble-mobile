import { Backdrop } from '@Noble/components/Backdrop';
import { Header } from '@Noble/components/Header';
import { HomeTabHandler } from '../../../routes/HomeTabHandler';
import { StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@Noble/routes/LoggedRouteHandler';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  return (
    <Backdrop style={styles.backdrop}>
      <Header toProfile={() => navigation.navigate('Profile')} />
      <HomeTabHandler />
    </Backdrop>
  );
}

const styles = StyleSheet.create({
  backdrop: { paddingHorizontal: 0 },
});
