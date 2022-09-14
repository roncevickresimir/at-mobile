import { t } from "i18next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { Text, View, Image, StyleSheet, TextInput } from "react-native";
import { useDispatch } from "react-redux";

import globalStyles from "../styles/globalStyles";
import { Formik } from "formik";

interface ISearch {
  search: string;
}
interface ISearchBarProps {}

const SearchBar = (props: ISearchBarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleSubmit = async (values: ISearch) => {};

  const validationSchema = yup.object({
    search: yup.string(),
  });

  return (
    <View style={SearchBarStyles.view}>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          //actions.resetForm();
          await handleSubmit(values);
        }}
      >
        {(props) => (
          <View style={SearchBarStyles.inputContainer}>
            <Image
              style={SearchBarStyles.icon}
              source={require("./../assets/images/search.png")}
            />
            <TextInput
              style={SearchBarStyles.input}
              placeholder={t("LANDING.SEARCH")}
              onChangeText={props.handleChange("search")}
              onBlur={props.handleBlur("search")}
              value={props.values.search}
            />
            <Text style={globalStyles.errorText}>
              {props.touched.search && props.errors.search}
            </Text>
          </View>
        )}
      </Formik>
    </View>
  );
};

const SearchBarStyles = StyleSheet.create({
  view: {
    width: "100%",
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    height: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: globalStyles.colorGrey.color,
    borderRadius: 18,
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 15,
    marginLeft: 25,
  },
  input: {
    color: "#101236",
    fontFamily: "WalsheimProLight",
    fontSize: 16,
    marginTop: 2,
  },
});

export default SearchBar;
