import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title } from './Title';
import { useContext } from 'react';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { UserProfileIcon } from './UserProfileIcon';
import { AuthContext } from '@Noble/contexts/AuthContext';

interface Props {
  toProfile: () => void;
}

export function Header({ toProfile }: Props) {
  const { strings, design } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  return (
    <View style={[styles.content, { backgroundColor: design.primary }]}>
      <Title font="Poppins" titleType="normal" style={styles.title}>
        {strings.hello}, {user?.name.split(' ')[0] || ''}
      </Title>
      <TouchableOpacity style={styles.touch} onPress={toProfile}>
        <UserProfileIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingHorizontal: 16,
    paddingTop: (StatusBar.currentHeight || 32) / 2,
    marginBottom: 0,
    fontWeight: '400',
  },
  touch: {
    marginEnd: 16,
  },
});
