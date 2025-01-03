import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';

interface ISubmitButtonProps {
  onBlur?(): () => void;
  onPress: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const SubmitButton = (props: ISubmitButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} onBlur={props.onBlur}>
      <View style={props.style}>{props.children}</View>
    </TouchableOpacity>
  );
};
