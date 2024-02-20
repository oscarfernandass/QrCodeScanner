import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Linking } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import LottieView from 'lottie-react-native';
import ModalView from './ModalView'; 
const { width ,height} = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [scanner, setScanner] = useState(false);
  const [visible, setVisible] = useState(false);
  const [data,setData]=useState('');
  const openQr = () => {
    setScanner(true);
  };

  const closeQr = () => {
    setScanner(false);
  };

  const openner = async (data) => {
    try {
      const qrData = data['data'];
      console.log(qrData);
      setData(qrData);
      setVisible(true);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const [link, setLink] = useState('');

  const addLink = async () => {
    try {
      const existingLinks = await AsyncStorage.getItem('links');
      let links = [];
      if (existingLinks) {
        links = JSON.parse(existingLinks);
      }
      links.push(link);
      await AsyncStorage.setItem('links', JSON.stringify(links));
      setLink('');
      alert('Link added successfully!');
    } catch (error) {
      console.error('Error adding link:', error);
    }
  };

  return (
    <View style={styles.outer}>
      <ModalView
        style={styles.uploadbox}
        visible={visible}
        name="scan"
        title={"Scan Details"}
        onDismiss={() => setVisible(false)}
        onSubmit={async () => {
          Linking.openURL(data);
  try {
    const existingData = await AsyncStorage.getItem('scannedData');
    let scannedData = [];
    if (existingData) {
      scannedData = JSON.parse(existingData);
    }
    scannedData.push(data);
    await AsyncStorage.setItem('scannedData', JSON.stringify(scannedData));
    console.log(JSON.stringify(scannedData));
    setVisible(false);
    setScanner(false);
  } catch (error) {
    console.error('Error storing scanned data:', error);
  }
        }}
        cancelable
      >
        <Text style={styles.data}>
            {data}
        </Text>
      </ModalView>
      
      

      {!scanner ? (
        <View style={styles.infoContainer}>
          <LottieView
            source={require('./scan.json')}
            autoPlay
            loop
            onError={console.error}
            style={styles.lottie}
          />
          <Text style={styles.para}>
          React Native Camera and React Native QR Scanner streamline QR code scanning in mobile apps. With React Native Camera, developers access device cameras for real-time scanning, while React Native QR Scanner simplifies QR code decoding. Integration of these libraries empowers efficient QR code scanning in React Native applications, enhancing user experiences across iOS and Android platforms.
          </Text>
          <TouchableOpacity style={styles.button} onPress={openQr}>
            <Text style={styles.scanText}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.scannerContainer}>
          <QRCodeScanner
            flashMode={RNCamera.Constants.FlashMode.auto}
            onRead={(data) => openner(data)}
            cameraStyle={styles.cameraStyle}
            reactivate={true}
            reactivateTimeout={4000}
            bottomContent={
              <TouchableOpacity style={styles.button} onPress={closeQr}>
                <Text style={styles.scanText}>Close</Text>
              </TouchableOpacity>
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lottie: {
    height: 300,
    width: 300,
  },
  para: {
    textAlign: 'center',
    marginVertical: 20,
    color:'black'
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  scanText: {
    color: 'white',
    fontSize: 20,
    padding:10,
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    width: width,
    height: width,
  },
  data: {
    fontSize:20,
    color:'blue',
    marginBottom: 10,
    alignSelf:'center',
  },
});

export default Home;
