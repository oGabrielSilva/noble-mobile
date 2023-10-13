import { Backdrop } from '@Noble/components/Backdrop';
import { Button } from '@Noble/components/Button';
import { Input, PasswordInput } from '@Noble/components/Input';
import { Snippet } from '@Noble/components/Snippet';
import { Title } from '@Noble/components/Title';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { signInWithGoogle } from '@Noble/firebase/auth';
import { getUserData } from '@Noble/firebase/firestore';
import { ToastHandler } from '@Noble/handlers/ToastHandler';
import { RootStackParamList } from '@Noble/routes/LoggedOutRouteHandler';
import { emailIsValid } from '@Noble/utils/validation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Keyboard,
  Platform,
  TextInput,
  Image,
} from 'react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const googleImage = require('@Noble/resources/images/google.png');

const toast = new ToastHandler();

export function SignInScreen({ navigation }: Props) {
  const { design, strings } = useContext(GlobalContext);

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const signInIsValid = () => {
    if (!emailRef.current || !passwordRef.current) return false;
    if (emailError || !emailIsValid(email)) {
      emailRef.current.focus();
      setEmailError(true);
      toast.showDefault(strings.emailInvalid);
      return false;
    }
    if (passwordError || password.length < 8 || password.includes(' ')) {
      passwordRef.current.focus();
      setPasswordError(true);
      toast.showDefault(strings.passwordInvalid);
      return false;
    }
    return true;
  };

  const googleSignIn = async () => {
    const user = await signInWithGoogle();
    if (!user) return console.log('Error: user null');
    const userData = await getUserData(user.uid);
    if (!userData) return navigation.navigate('CompleteSignUpByProvider');
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
          <Title titleType="large" style={styles.title}>
            {strings.appName}
          </Title>
          <Snippet style={styles.welcome}>{strings.welcome}</Snippet>
          <Title titleType="small">{strings.loginNow}</Title>
          <Snippet style={styles.label}>{strings.email}</Snippet>
          <Input
            ref={emailRef}
            typoError={emailError}
            value={email}
            onChangeText={txt => {
              const t = txt.trim();
              setEmail(t);
              setEmailError(!emailIsValid(t));
            }}
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
            returnKeyType="next"
            inputMode="email"
            keyboardType="email-address"
            placeholder={strings.emailPlaceholder}
            onSubmitEditing={() => {
              if (passwordRef.current) passwordRef.current.focus();
            }}
          />
          <Snippet snippetType="small-alert">{strings.emailSmall}</Snippet>
          <Snippet style={styles.label}>{strings.password}</Snippet>
          <PasswordInput
            typoError={passwordError}
            value={password}
            onChangeText={txt => {
              const t = txt.trim();
              setPassword(t);
              setPasswordError(t.length < 8 || t.includes(' '));
            }}
            autoComplete="off"
            textContentType="password"
            autoCapitalize="none"
            returnKeyType="done"
            ref={passwordRef}
            placeholder={strings.passwordPlaceholder}
            onSubmitEditing={() => {}}
          />
          <Snippet snippetType="small-alert">{strings.passwordSmall}</Snippet>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity style={styles.forgotPassword}>
              <Snippet style={[styles.forgotPasswordSnippet, { color: design.link }]}>
                {strings.forgotPassword}
              </Snippet>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <Button onPress={() => {}} style={[styles.button, styles.buttonSignIn]}>
              <Snippet>{strings.enter}</Snippet>
            </Button>
            <Button
              onPress={() =>
                signInIsValid() ? navigation.navigate('SignUp', { email, password }) : null
              }
              style={[styles.button, styles.buttonSignUp]}>
              <Snippet>{strings.signUp}</Snippet>
            </Button>
          </View>
          <View style={styles.googleContainer}>
            <Button style={styles.googleButton} onPress={() => googleSignIn()}>
              <View style={styles.googleButtonView}>
                <Image style={styles.googleIcon} source={googleImage} />
                <Snippet style={styles.googleButtonText}>Entrar com Google</Snippet>
              </View>
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
  },
  button: {
    width: '50%',
  },
  buttonSignIn: {
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
    borderEndWidth: 1,
  },
  buttonSignUp: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderEndWidth: 1,
  },
  googleContainer: {
    width: '50%',
    alignSelf: 'center',
  },
  googleButton: {
    marginVertical: 32,
    borderWidth: 0,
  },
  googleButtonView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
