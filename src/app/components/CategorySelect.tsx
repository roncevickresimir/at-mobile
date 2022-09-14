import { t } from "i18next";
import React, { useState, useCallback, useRef, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {
  ICategory,
  useLazyGetCategoriesQuery,
} from "../../services/categoryService";
import globalStyles from "../styles/globalStyles";

interface ICategorySelectProps {
  setCategory: () => void;
}

const CategorySelect = (props: ICategorySelectProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const { setCategory } = props;

  const [
    getCategories,
    { isLoading: categoriesLoading, isUninitialized: categoriesUninitialized },
  ] = useLazyGetCategoriesQuery();

  const fetchData = async () => {
    const getCategoriesResponse = await getCategories(null).unwrap();
    setCategories(getCategoriesResponse);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={CategorySelectStyles.view}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={[
            CategorySelectStyles.category,
            CategorySelectStyles.firstCategory,
          ]}
          onTouchEnd={() => {
            setActiveIndex(null);
            setCategory(null);
          }}
        >
          <Text
            style={
              activeIndex === null
                ? globalStyles.normalText
                : globalStyles.lightText
            }
          >
            {t("LANDING.ALL")}
          </Text>
        </View>
        {categories.map((category, index) => {
          return (
            <View
              style={[CategorySelectStyles.category]}
              key={index}
              onTouchEnd={() => {
                setActiveIndex(index);
                setCategory(category.id);
              }}
            >
              <Text
                style={
                  activeIndex === index
                    ? globalStyles.normalText
                    : globalStyles.lightText
                }
              >
                {category.name}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const CategorySelectStyles = StyleSheet.create({
  view: {
    paddingVertical: 10,
    borderRadius: 20,
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  firstCategory: {
    marginLeft: 15,
  },
});

export default CategorySelect;
