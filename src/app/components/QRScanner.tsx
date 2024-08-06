import React, { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import { t } from 'i18next';

import { useLazyCompleteStationQuery } from '../../services/stationService';
import { useAppSelector } from '../../utils/hooks';
import globalStyles from '../styles/globalStyles';

export const QRScanner = ({ stationId }) => {
  const [hasPermission, setHasPermission] = useState<boolean>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [showScanner, setShowScanner] = useState<boolean>(false);
  const [stationCompleteSuccess, setStationCompleteSuccess] = useState<boolean>(false);

  const user = useAppSelector((state) => state.auth.user.User);

  const [completeStation, { isLoading: completeStationLoading, isUninitialized: completeStationUninitialized }] =
    useLazyCompleteStationQuery();

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (data === stationId) {
      handleCompleteStation(data);
    } else {
      alert(`Wrong station.`);
    }
  };

  const handleCompleteStation = async (QRStationId: string) => {
    const completeStationResponse = await completeStation({
      stationId: QRStationId,
      userId: user.id,
      complete: true,
    }).unwrap();
    setShowScanner(false);
    setStationCompleteSuccess(completeStationResponse);
    return completeStationResponse;
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getBarCodeScannerPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return stationCompleteSuccess ? (
    <View></View>
  ) : !showScanner ? (
    <TouchableOpacity style={styles.checkInContainer} onPress={() => setShowScanner(true)}>
      <Text style={[globalStyles?.h2, globalStyles?.bold, globalStyles?.colorWhite]}>{t('STATION_PAGE.CHECK_IN')}</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.scannerPopup}>
      <View style={styles.scannerOverlay}></View>
      <View style={styles.scannerContainer}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} style={[styles.scanner]} />
      </View>
      <TouchableOpacity style={styles.cancelContainer} onPress={() => setShowScanner(false)}>
        <Image style={styles.cancelImage} source={require('./../assets/images/remove.png')}></Image>
      </TouchableOpacity>
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
    width: '100%',
    height: '100%',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 300,
    height: 300,
    backgroundColor: 'red',
    overflow: 'hidden',

    shadowColor: 'rgba(0,0,0,0.9)',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 5,
    shadowOpacity: 0.25,
    elevation: 10,
    borderRadius: 20,
    borderColor: globalStyles?.colorPrimary.color,
    borderWidth: 5,
  },
  scanner: {
    width: 300,
    height: 400,
  },
  cancelContainer: {
    width: 55,
    height: 55,
    marginTop: 15,
  },
  cancelImage: {
    width: 55,
    height: 55,
  },
});
