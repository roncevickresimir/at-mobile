import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { t } from 'i18next';

import { ICategory, useLazyGetCategoriesQuery } from '~services';
import { globalStyles } from '~styles';

interface ICategorySelectProps {
  setCategory: (value: string) => void;
}

export const CategorySelect = (props: ICategorySelectProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<ICategory[] | null>([]);
  const { setCategory } = props;

  const [getCategories, { isLoading: categoriesLoading, isUninitialized: categoriesUninitialized }] =
    useLazyGetCategoriesQuery();

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
          style={[CategorySelectStyles.category, CategorySelectStyles.firstCategory]}
          onTouchEnd={() => {
            setActiveIndex(null);
            setCategories(null);
          }}
        >
          <Text style={activeIndex === null ? globalStyles?.normalText : globalStyles?.lightText}>
            {t('LANDING.ALL')}
          </Text>
        </View>
        {categories?.map((category, index) => {
          return (
            <View
              style={[CategorySelectStyles.category]}
              key={index}
              onTouchEnd={() => {
                setActiveIndex(index);
                setCategory(category.id);
              }}
            >
              <Text style={activeIndex === index ? globalStyles?.normalText : globalStyles?.lightText}>
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
