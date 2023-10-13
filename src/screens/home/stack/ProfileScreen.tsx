import { useEffect, useState, useContext, useRef } from 'react';
import { Backdrop } from '@Noble/components/Backdrop';
import { StackHeader } from '@Noble/components/StackHeader';
import { UserProfileIcon } from '@Noble/components/UserProfileIcon';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { Input, PasswordInput } from '@Noble/components/Input';
import { AuthContext } from '@Noble/contexts/AuthContext';
import { Snippet } from '@Noble/components/Snippet';
import { emailIsValid, getNumber } from '@Noble/utils/validation';

const currentYear = new Date().getFullYear();
const minAge = 14;
const maxAge = 55;

const getYearIsValid = (y: number) =>
  !Number.isNaN(y) && y <= currentYear - minAge && y >= currentYear - maxAge;

export function ProfileScreen() {
  const { user } = useContext(AuthContext);
  const { strings, design } = useContext(GlobalContext);

  const nameRef = useRef<TextInput>(null);
  const birthYearRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [name, setName] = useState((user && user.name) || '');
  const [nameError, setNameError] = useState(false);
  const [birthYear, setBirthYear] = useState((currentYear - minAge).toString());
  const [birthYearError, setBirthYearError] = useState(false);
  const [gender, setGender] = useState<Gender>((user && user.gender) || 'M');
  const [email, setEmail] = useState((user && user.email) || '');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            styles.container,
            keyboardVisible
              ? {}
              : { minHeight: Dimensions.get('window').height, justifyContent: 'center' },
          ]}>
          <StackHeader title={strings.editProfile} />
          <View style={styles.container}>
            <View style={styles.iconContainer}>
              <TouchableOpacity>
                <UserProfileIcon width={70} height={70} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Snippet style={styles.label}>{strings.name}</Snippet>
              <Input
                iconName="badge"
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
              <Snippet style={styles.label}>{strings.email}</Snippet>
              <Input
                iconName="mail"
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
              <Snippet style={styles.label}>{strings.birth}</Snippet>
              <Input
                typoError={birthYearError}
                maxLength={4}
                iconName="calendar-month"
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
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Backdrop>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
  },
  inputContainer: {
    marginTop: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginTop: 32,
  },
});
