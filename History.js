import React, { useState, useEffect, useReducer } from 'react';
import deletee from './delete.png';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Linking, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = ({ navigation }) => {
  const [historyData, dispatch] = useReducer(historyReducer, []);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.addListener('focus',async()=>{
        retrieveHistoryData();
    })
  }, []);

  const retrieveHistoryData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('scannedData');
      if (storedData !== null) {
        dispatch({ type: 'SET_DATA', payload: JSON.parse(storedData) });
      }
    } catch (error) {
      console.error('Error retrieving history data:', error);
    }
  };

  const deleteItem = async (index) => {
    try {
      const updatedData = [...historyData];
      updatedData.splice(index, 1);
      dispatch({ type: 'SET_DATA', payload: updatedData });
      await AsyncStorage.setItem('scannedData', JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    retrieveHistoryData();
    setRefreshing(false);
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => { Linking.openURL(item) }}><Text style={styles.itemText}>{item}</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => deleteItem(index)} style={styles.deleteButton}>
          <Image style={styles.del} source={deletee} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {historyData.length > 0 ? (
        <FlatList
          data={historyData.reverse()}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#9Bd35A', '#689F38']}
              tintColor="#689F38"
              title="Loading..."
              titleColor="#00ff00"
              progressBackgroundColor="#ffffff"
            />
          }
        />
      ) : (
        <Text style={styles.emptyText}>List is empty</Text>
      )}
    </View>
  );
};

const historyReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 
18,
color: 'blue',
textDecorationLine: 'underline',
},
deleteButton: {
padding: 5,
borderRadius: 5,
},
del: {
alignSelf: 'center',
height: 28,
width: 28,
},
emptyText: {
color: 'black',
alignSelf: 'center',
fontSize: 20,
},
});

export default History;