import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { t } from 'i18next';

import { ICategory, useLazyGetCategoriesQuery } from '~services';
import { globalStyles } from '~styles';

interface ICategorySelectProps {
  setCategory: (value: string | undefined) => void;
}

export const CategorySelect = (props: ICategorySelectProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
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
  }, [activeIndex]);

  return (
    <View style={CategorySelectStyles.view}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={[CategorySelectStyles.category, CategorySelectStyles.firstCategory]}
          onTouchEnd={() => {
            setActiveIndex(undefined);
            setCategory(undefined);
          }}
        >
          <Text style={activeIndex === undefined ? globalStyles?.normalText : globalStyles?.lightText}>
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
    paddingVertical: 0,
    borderRadius: 0,
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
