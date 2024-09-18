import { useRef, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { t } from 'i18next';

import { uploadUserImage, useLazyCompleteStationQuery } from '~services';
import { globalStyles } from '~styles';
import { useAppSelector } from '~utils';

interface IQRScannerProps {
  stationId: string;
}

export const QRScanner = ({ stationId }: IQRScannerProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const cameraRef = useRef();
  const [initCamera, setInitCamera] = useState<boolean>(false);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  const [image, setImage] = useState<any>();
  const [showImage, setShowImage] = useState<boolean>(false);

  const [scanned, setScanned] = useState<boolean>(false);

  const user = useAppSelector((state) => state?.auth?.user);
  const token = useAppSelector((state) => state?.auth?.token);

  let ScreenHeight = Dimensions.get('window').height;
  let ScreenWidth = Dimensions.get('window').width;

  const [completeStation, { isLoading: completeStationLoading, isUninitialized: completeStationUninitialized }] =
    useLazyCompleteStationQuery();

  const handleCheckIn = () => {
    if (permission?.granted) {
      setInitCamera(true);
      return;
    }
    if (!permission?.granted && permission?.canAskAgain) {
      requestPermission().then((v) => {
        if (v) setInitCamera(true);
      });
    }
  };

  const handleTakePhoto = async () => {
    const imageResult = await (cameraRef as any).current.takePictureAsync();
    setImage(imageResult.uri);

    // await uploadUserImage(token, {
    //   stationId: stationId,
    //   userId: user?.id as string,
    //   imageUri: imageResult.uri,
    // });

    // await completeStation({
    //   stationId: stationId,
    //   userId: user?.id as string,
    //   complete: true,
    // }).unwrap();

    setShowCamera(false);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  // if (image) {
  //   return (
  //     <View>
  //       <Image style={styles.takePhotoImage} source={{ uri: image }}></Image>
  //     </View>
  //   );
  // }
  return !initCamera ? (
    <TouchableOpacity style={styles.checkInContainer} onPress={() => handleCheckIn()}>
      <Text style={[globalStyles?.h2, globalStyles?.bold, globalStyles?.colorWhite]}>{t('STATION_PAGE.CHECK_IN')}</Text>
    </TouchableOpacity>
  ) : (
    <View style={{ ...styles.scannerContainer, width: ScreenWidth, height: ScreenHeight }}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={facing}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
        onBarcodeScanned={(result) => {
          console.log(result);
        }}
        onCameraReady={() => {
          setShowCamera(true);
        }}
      >
        <View style={{ ...styles.buttonContainer }}>
          <TouchableOpacity style={styles.takePhotoContainer} onPress={() => handleTakePhoto()}>
            <Image style={styles.takePhotoImage} source={require('./../assets/images/circlePrimary.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={{ ...styles.flipCameraButtonContainer }}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Image style={styles.flipCameraImageBg} source={require('./../assets/images/circlePrimary.png')}></Image>
            <Image style={styles.flipCameraImage} source={require('./../assets/images/flipCamera.png')}></Image>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  checkInContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 25,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: globalStyles?.colorPrimary.color,
  },
  complete: {
    width: 35,
    height: 35,
  },
  scannerPopup: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  scannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  scannerContainer: {
    overflow: 'hidden',
  },
  scanner: {
    width: 300,
    height: 400,
  },
  takePhotoContainer: {
    width: 65,
    height: 65,
    marginBottom: 15,
    zIndex: 99,
  },
  takePhotoImage: {
    width: 65,
    height: 65,
    zIndex: 99,
  },
  flipCameraContainer: {
    width: 55,
    height: 55,
    marginBottom: 15,
    zIndex: 99,
  },
  flipCameraImageBg: {
    top: -7.5,
    left: -7.5,
    width: 55,
    height: 55,
    zIndex: 98,
    position: 'absolute',
  },
  flipCameraImage: {
    width: 40,
    height: 40,
    zIndex: 99,
  },

  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  flipCameraButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 45,
    right: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
