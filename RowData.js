import React from 'react';
import { Dimensions, AppRegistry, View, Text, StyleSheet, Image } from 'react-native';

const RowData = (props) => (
  <View>
  <Image
  onPress ={() => navigate('ImageView')}
  style={styles.item}
  resizeMode={'contain'}
  source={{uri: rowData.image_url}}/>
  </View>
);

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  item: {
    width: (width / 2) - 15,
    height: 150,
    margin: 5,
    backgroundColor: '#383838',
  },
});

AppRegistry.registerComponent('RowData', () => RowData);
