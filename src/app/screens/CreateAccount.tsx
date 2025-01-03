import React from 'react';
import { Image, Keyboard, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';



import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { SubmitButton } from '~components';
import { ILoginResponse, IRegister, IRegisterResponse } from '~interfaces';
import { useLoginUserMutation, useRegisterUserMutation } from '~services';
import { login } from '~slices';
import { createAccountStyles, globalStyles } from '~styles';

import PATHS from '.PATHS';

export const CreateAccount = () => {
  const [loginUser, { data: loginUserData, isSuccess: loginUserIsSuccess }] = useLoginUserMutation();
  const [registerUser, { data: registerUserData, isSuccess: registerUserIsSuccess }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t('FORM_VALIDATION.REQUIRED'))
      .min(6, t('FORM_VALIDATION.TOO_SHORT'))
      .max(20, t('FORM_VALIDATION.TOO_LONG')),
    email: yup.string().required(t('FORM_VALIDATION.REQUIRED')).email(t('FORM_VALIDATION.INVALID_EMAIL')),
    password: yup.string().required(t('FORM_VALIDATION.REQUIRED')).min(8, t('FORM_VALIDATION.TOO_SHORT')),
    confirmPassword: yup
      .string()
      .required(t('FORM_VALIDATION.REQUIRED'))
      .oneOf([yup.ref('password')], t('FORM_VALIDATION.PASSWORD_MATCH')),
  });

  const handleSubmit = async (values: IRegister) => {
    const { username, email, password } = values;

    await registerUser({
      username: username,
      email: email,
      password: password,
    })
      .unwrap()
      .then((registerResponse: IRegisterResponse) => {
        if (registerResponse) {
          loginUser({ email, password })
            .unwrap()
            .then((loginResponse: ILoginResponse) => {
              const { token, User } = loginResponse;
              dispatch(
                login({
                  user: { ...User },
                  token: token,
                }),
              );
            });
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={createAccountStyles.content}>
        <View style={createAccountStyles.header}>
          <Text style={globalStyles?.h1}>{t('SIGN_UP.HEADING')}</Text>
        </View>
        <View style={createAccountStyles.signUpContainer}>
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              actions.resetForm();
              await handleSubmit(values);
            }}
          >
            {(props) => (
              <View>
                <TextInput
                  style={createAccountStyles.input}
                  placeholder={t('SIGN_UP.FORM.USERNAME')}
                  onChangeText={props.handleChange('username')}
                  onBlur={props.handleBlur('username')}
                  value={props.values.username}
                />
                <Text style={globalStyles?.errorText}>{props.touched.username && props.errors.username}</Text>

                <TextInput
                  style={createAccountStyles.input}
                  placeholder={t('SIGN_UP.FORM.EMAIL')}
                  onChangeText={props.handleChange('email')}
                  onBlur={props.handleBlur('email')}
                  value={props.values.email}
                />
                <Text style={globalStyles?.errorText}>{props.touched.email && props.errors.email}</Text>

                <TextInput
                  style={createAccountStyles.input}
                  placeholder={t('SIGN_UP.FORM.PASSWORD')}
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                  secureTextEntry={true}
                />
                <Text style={globalStyles?.errorText}>{props.touched.password && props.errors.password}</Text>

                <TextInput
                  style={createAccountStyles.input}
                  placeholder={t('SIGN_UP.FORM.REPEAT_PASSWORD')}
                  onChangeText={props.handleChange('confirmPassword')}
                  onBlur={props.handleBlur('confirmPassword')}
                  value={props.values.confirmPassword}
                  secureTextEntry={true}
                />
                <Text style={globalStyles?.errorText}>
                  {props.touched.confirmPassword && props.errors.confirmPassword}
                </Text>

                <SubmitButton style={globalStyles?.buttonPrimary} onPress={() => props.handleSubmit()}>
                  <Text style={createAccountStyles.buttonTextPrimary}>{t('SIGN_UP.FORM.SUBMIT')}</Text>
                </SubmitButton>
              </View>
            )}
          </Formik>

          <View style={createAccountStyles.orContainer}>
            <View style={createAccountStyles.horizontalLine}></View>
            <Text style={createAccountStyles.horizontalLineText}>{t('SIGN_UP.OR')}</Text>
            <View style={createAccountStyles.horizontalLine}></View>
          </View>

          <View>
            <SubmitButton
              style={createAccountStyles.buttonFacebook}
              onPress={function () {
                throw new Error('Function not implemented.');
              }}
            >
              <Image
                style={createAccountStyles.buttonImageFacebook}
                source={require('./../assets/images/facebook.png')}
              ></Image>
              <Text style={createAccountStyles.buttonSocialTextLight}>{t('SIGN_UP.FACEBOOK')}</Text>
            </SubmitButton>

            <SubmitButton
              style={createAccountStyles.buttonTwitter}
              onPress={function () {
                throw new Error('Function not implemented.');
              }}
            >
              <Image
                style={createAccountStyles.buttonImageTwitter}
                source={require('./../assets/images/twitter.png')}
              ></Image>
              <Text style={createAccountStyles.buttonSocialTextLight}>{t('SIGN_UP.TWITTER')}</Text>
            </SubmitButton>

            <SubmitButton
              style={createAccountStyles.buttonGoogle}
              onPress={function () {
                throw new Error('Function not implemented.');
              }}
            >
              <Image
                style={createAccountStyles.buttonImageGoogle}
                source={require('./../assets/images/google.png')}
              ></Image>
              <Text style={createAccountStyles.buttonSocialTextDark}>{t('SIGN_UP.GOOGLE')}</Text>
            </SubmitButton>
          </View>

          <View style={[globalStyles?.flexCenter, globalStyles?.w100, globalStyles?.mt32]}>
            <Text style={globalStyles?.light}>
              {t('SIGN_UP.MEMBER')}
              {` `}

              <TouchableWithoutFeedback
                style={[globalStyles?.flexCenter, globalStyles?.w100, globalStyles?.mt32]}
                onPress={() => {
                  navigation.navigate(PATHS.LOGIN_SCREEN.key as never);
                }}
              >
                <Text style={globalStyles?.bold}>{t('SIGN_UP.SIGN_IN')}</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};