import { AuthContext } from '@Noble/contexts/AuthContext';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { Image, StyleSheet } from 'react-native';

const profilePlaceholderDT = require('@Noble/resources/images/profile-placeholder-dt.png');

interface Props {
  width?: number;
  height?: number;
  radius?: number;
}

export function UserProfileIcon({ height, width, radius }: Props) {
  const { design } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);

  return (
    <Image
      style={[
        styles.image,
        {
          borderColor: design.title,
          width: width ? width : 46,
          height: height ? height : 46,
          borderRadius: radius ? radius : 24,
        },
      ]}
      source={
        user && typeof user.photoURL === 'string' ? { uri: user.photoURL } : profilePlaceholderDT
      }
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
  },
});
