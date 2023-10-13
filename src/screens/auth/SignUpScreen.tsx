import { Backdrop } from '@Noble/components/Backdrop';
import { Button } from '@Noble/components/Button';
import { Input } from '@Noble/components/Input';
import { Snippet } from '@Noble/components/Snippet';
import { Title } from '@Noble/components/Title';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { RootStackParamList } from '@Noble/routes/LoggedOutRouteHandler';
import { emailIsValid, getNumber } from '@Noble/utils/validation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ToastHandler } from '@Noble/handlers/ToastHandler';
import { launchImageLibrary } from 'react-native-image-picker';
import { getUser, signUpWithEmailPassword } from '@Noble/firebase/auth';
import { User } from '@Noble/models/User';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const profilePlaceholderDT = require('@Noble/resources/images/profile-placeholder-dt.png');
const currentYear = new Date().getFullYear();
const minAge = 14;
const maxAge = 55;
const profileSize = Math.floor(Dimensions.get('screen').width / 6);

const toast = new ToastHandler();

const getYearIsValid = (y: number) =>
  !Number.isNaN(y) && y <= currentYear - minAge && y >= currentYear - maxAge;

export function SignUpScreen({
  navigation,
  route: {
    params: { email, password },
  },
}: Props) {
  const { design, strings } = useContext(GlobalContext);

  const nameRef = useRef<TextInput>(null);
  const birthYearRef = useRef<TextInput>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [image, setImage] = useState('');
  const [takingImage, setTakingImage] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [birthYear, setBirthYear] = useState((currentYear - minAge).toString());
  const [birthYearError, setBirthYearError] = useState(false);
  const [gender, setGender] = useState<Gender>('M');

  const getSignUpIsValid = () => {
    if (takingImage) return false;
    if (!nameRef.current || !birthYearRef.current) return;
    if (nameError || name.length < 2) {
      nameRef.current.focus();
      setNameError(true);
      toast.showDefault(strings.nameIsRequired);
      return false;
    }
    const y = Number(birthYear);
    if (!birthYearRef.current || !getYearIsValid(y)) {
      birthYearRef.current.focus();
      setBirthYearError(true);
      toast.showDefault(strings.birthYearInvalid);
      return false;
    }
    if (password.length < 8 || !emailIsValid(email)) {
      navigation.goBack();
      return false;
    }
    return true;
  };

  const pickImage = () => {
    setTakingImage(true);
    launchImageLibrary({ mediaType: 'photo', quality: 0.5 })
      .then(result => {
        if (!result.didCancel && result.assets && result.assets[0].uri)
          setImage(result.assets[0].uri);
      })
      .catch(e => console.log(e))
      .finally(() => setTakingImage(false));
  };

  const signUp = () => {
    if (!getSignUpIsValid()) return;
    const user = new User(email, name, Number(birthYear), gender, image);
    user.definePrivatePassword = password;
    signUpWithEmailPassword(user).then(() => {
      getUser().then(u => console.log(u));
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Backdrop>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.container,
            keyboardVisible
              ? {}
              : { minHeight: Dimensions.get('window').height, justifyContent: 'center' },
          ]}>
          <Title style={styles.title}>{strings.signUpTitle}</Title>
          <Snippet style={styles.welcome}>{strings.welcomeSignUp}</Snippet>
          <View style={styles.profileContainer}>
            <TouchableOpacity onPress={pickImage} style={styles.profileButton}>
              <Image
                source={image ? { uri: image } : profilePlaceholderDT}
                style={{ width: profileSize, height: profileSize, borderRadius: profileSize / 2 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setImage('')}>
              <Snippet snippetType="link">{strings.remove}</Snippet>
            </TouchableOpacity>
          </View>
          <Snippet style={styles.label}>{strings.name}</Snippet>
          <Input
            value={name}
            typoError={nameError}
            onChangeText={txt => {
              setName(txt);
              setNameError(txt.length < 2);
            }}
            autoComplete="name"
            maxLength={40}
            textContentType="name"
            autoCapitalize="words"
            returnKeyType="next"
            inputMode="text"
            keyboardType="default"
            ref={nameRef}
            placeholder={strings.namePlaceholder}
            onSubmitEditing={() => (birthYearRef.current ? birthYearRef.current.focus() : null)}
          />
          <Snippet snippetType="small-alert">{strings.nameSmall}</Snippet>
          <Snippet style={styles.label}>{strings.birth}</Snippet>
          <Input
            typoError={birthYearError}
            maxLength={4}
            keyboardType="decimal-pad"
            value={birthYear}
            onChangeText={y => {
              const n = Number(getNumber(y));
              setBirthYear(getNumber(y));
              setBirthYearError(!getYearIsValid(n));
            }}
            placeholder="2003"
            ref={birthYearRef}
          />
          <Snippet snippetType="small-alert">{strings.birthSmall}</Snippet>
          <View style={styles.genderContainer}>
            <TouchableOpacity onPress={() => (gender === 'M' ? null : setGender('M'))}>
              <Snippet
                style={{
                  color: gender !== 'M' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}>
                {strings.male}
              </Snippet>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (gender === 'F' ? null : setGender('F'))}>
              <Snippet
                style={{
                  color: gender !== 'F' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}>
                {strings.female}
              </Snippet>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => (gender === 'O' ? null : setGender('O'))}>
              <Snippet
                style={{
                  color: gender !== 'O' ? design.textPlaceholder : design.title,
                  fontWeight: 'bold',
                }}>
                {strings.other}
              </Snippet>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => (navigation.canGoBack() ? navigation.goBack() : null)}
              style={[styles.button, { borderColor: design.danger }]}>
              <Snippet style={{ color: design.danger }}>{strings.goBack}</Snippet>
            </Button>
            <Button onPress={signUp} style={[styles.button]}>
              <Snippet>{strings.createAccount}</Snippet>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
  },
  title: { marginVertical: 32 },
  welcome: {
    textAlign: 'center',
    marginBottom: 32,
  },
  profileContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    borderRadius: profileSize,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
  },
  forgotPassword: {
    marginTop: 16,
    marginBottom: 32,
  },
  forgotPasswordSnippet: {
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
    justifyContent: 'space-evenly',
  },
  button: {
    width: '45%',
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 32,
  },
});

export const signUpScreenStyles = styles;
