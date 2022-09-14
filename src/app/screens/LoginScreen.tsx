import {
  View,
  Text,
  Image,
  TextInput,
  Keyboard,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Formik, validateYupSchema } from "formik";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import "./../locales/localizationService";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../services/userService";
import ILoginResponse, {
  IRegisterResponse,
} from "../interfaces/ILoginResponse";
import React, { useEffect, useState } from "react";
import { login } from "../slices/authSlice";
import ILogin from "../interfaces/ILogin";
import { useDispatch } from "react-redux";
import globalStyles from "../styles/globalStyles";
import createAccountStyles from "../styles/createAccountStyles";
import SubmitButton from "../components/SubmitButton";
import IRegister from "../interfaces/IRegister";
import PATHS from "../../paths";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [loginUser, { data: loginUserData, isSuccess: loginUserIsSuccess }] =
    useLoginUserMutation();

  const [errorMessage, setErrorMessage] = useState<string | null>();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string()
      .required(t("FORM_VALIDATION.REQUIRED"))
      .email(t("FORM_VALIDATION.INVALID_EMAIL")),
    password: yup
      .string()
      .required(t("FORM_VALIDATION.REQUIRED"))
      .min(8, t("FORM_VALIDATION.TOO_SHORT")),
  });

  const handleSubmit = async (values: IRegister) => {
    await loginUser({
      email: values.email,
      password: values.password,
    })
      .unwrap()
      .then((loginResponse: ILoginResponse) => {
        const { token, ...user } = loginResponse;
        dispatch(
          login({
            user: { ...user },
            token: token,
          })
        );
      })
      .catch((error) => {
        setErrorMessage(error.data.message);
      });
  };

  return (
    <View style={createAccountStyles.content}>
      <View style={createAccountStyles.header}>
        <Text style={[globalStyles.normalText, globalStyles.colorWhite]}>
          {t("LOG_IN.WELCOME")}
        </Text>
        <Text style={globalStyles.h1}>{t("LOG_IN.HEADING")}</Text>
      </View>
      <View style={createAccountStyles.signUpContainer}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            //actions.resetForm();
            await handleSubmit(values);
          }}
        >
          {(props) => (
            <View>
              <TextInput
                style={createAccountStyles.input}
                placeholder={t("LOG_IN.FORM.EMAIL")}
                onChangeText={props.handleChange("email")}
                onBlur={props.handleBlur("email")}
                value={props.values.email}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.email && props.errors.email}
              </Text>

              <TextInput
                style={createAccountStyles.input}
                placeholder={t("LOG_IN.FORM.PASSWORD")}
                onChangeText={props.handleChange("password")}
                onBlur={props.handleBlur("password")}
                value={props.values.password}
                secureTextEntry={true}
              />
              <Text style={globalStyles.errorText}>
                {props.touched.password && props.errors.password}
              </Text>

              {errorMessage && (
                <Text style={[globalStyles.errorText, globalStyles.flexCenter]}>
                  {t(`LOG_IN.${errorMessage}`)}
                </Text>
              )}

              <SubmitButton
                style={globalStyles.buttonPrimary}
                onPress={props.handleSubmit}
              >
                <Text style={createAccountStyles.buttonTextPrimary}>
                  {t("LOG_IN.FORM.SUBMIT")}
                </Text>
              </SubmitButton>
            </View>
          )}
        </Formik>

        <View style={createAccountStyles.orContainer}>
          <View style={createAccountStyles.horizontalLine}></View>
          <Text style={createAccountStyles.horizontalLineText}>
            {t("LOG_IN.OR")}
          </Text>
          <View style={createAccountStyles.horizontalLine}></View>
        </View>

        <View>
          <SubmitButton
            style={createAccountStyles.buttonFacebook}
            onPress={function () {
              throw new Error("Function not implemented.");
            }}
          >
            <Image
              style={createAccountStyles.buttonImageFacebook}
              source={require("./../assets/images/facebook.png")}
            ></Image>
            <Text style={createAccountStyles.buttonSocialTextLight}>
              {t("LOG_IN.FACEBOOK")}
            </Text>
          </SubmitButton>

          <SubmitButton
            style={createAccountStyles.buttonTwitter}
            onPress={function () {
              throw new Error("Function not implemented.");
            }}
          >
            <Image
              style={createAccountStyles.buttonImageTwitter}
              source={require("./../assets/images/twitter.png")}
            ></Image>
            <Text style={createAccountStyles.buttonSocialTextLight}>
              {t("LOG_IN.TWITTER")}
            </Text>
          </SubmitButton>

          <SubmitButton
            style={createAccountStyles.buttonGoogle}
            onPress={function () {
              throw new Error("Function not implemented.");
            }}
          >
            <Image
              style={createAccountStyles.buttonImageGoogle}
              source={require("./../assets/images/google.png")}
            ></Image>
            <Text style={createAccountStyles.buttonSocialTextDark}>
              {t("LOG_IN.GOOGLE")}
            </Text>
          </SubmitButton>
        </View>

        <View
          style={[
            globalStyles.flexCenter,
            globalStyles.w100,
            globalStyles.mt32,
          ]}
          onPress={() => {
            navigation.navigate(PATHS.CREATE_ACCOUNT.key);
          }}
        >
          <TouchableWithoutFeedback
            style={[
              globalStyles.flexCenter,
              globalStyles.w100,
              globalStyles.mt32,
            ]}
            onPress={() => {
              navigation.navigate(PATHS.CREATE_ACCOUNT.key, {});
            }}
          >
            <Text style={globalStyles.light}>
              {t("LOG_IN.MEMBER")}
              {` `}
              <Text style={globalStyles.bold}>{t("LOG_IN.SIGN_IN")}</Text>
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
