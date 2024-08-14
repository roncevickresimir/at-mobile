import { StyleSheet } from 'react-native';


export const globalStyles = StyleSheet.create({
  colorPrimary: {
    color: '#FF9254',
  },
  colorSecondary: {
    color: '#101236',
  },
  colorGrey: {
    color: '#F7F7F8',
  },
  colorWhite: {
    color: '#FFFFFF',
  },
  colorBackground: {
    color: '#EEEEEE',
  },
  h1: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'WalsheimProBold',
  },
  h2: {
    fontSize: 18,
    color: '#101236',
    fontFamily: 'WalsheimProBold',
  },
  p20: {
    padding: 20,
  },
  font14: {
    fontSize: 14.99,
  },
  buttonPrimary: {
    backgroundColor: '#FF9254',
    borderRadius: 12,
    paddingTop: 16,
    paddingBottom: 18,
    paddingHorizontal: 22,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  w100: {
    width: '100%',
  },
  bottom: {
    position: 'absolute',
    bottom: 18,
  },
  mt32: {
    marginVertical: 32,
  },
  bold: {
    fontFamily: 'WalsheimProBold',
  },
  regular: {
    fontFamily: 'WalsheimProRegular',
  },
  light: {
    fontFamily: 'WalsheimProLight',
  },
  errorText: {
    color: 'red',
    fontFamily: 'WalsheimProThin',
    marginTop: 18,
    marginBottom: 8,
    marginLeft: 12,
    fontSize: 12,
  },
  lightText: {
    color: '#9FA0AF',
    fontFamily: 'WalsheimProLight',
    fontSize: 17,
  },
  normalText: {
    color: '#101236',
    fontFamily: 'WalsheimProLight',
    fontSize: 18,
  },
  font18: {
    fontSize: 28,
  },
  mb2: {
    marginBottom: 4,
  },
});