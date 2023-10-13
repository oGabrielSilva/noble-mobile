import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useNavigation } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Title } from './Title';

interface Props {
  title?: string;
}

export function StackHeader({ title }: Props) {
  const nav = useNavigation();
  const { design } = useContext(GlobalContext);

  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        onPress={() => {
          if (nav.canGoBack()) nav.goBack();
        }}>
        <Ionicons size={24} name="chevron-back" color={design.title} />
      </TouchableOpacity>
      <Title titleType="evenSmaller" font="Poppins">
        {title ?? ''}
      </Title>
      <View style={{ width: containerWidth }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
