import React, { Component } from 'react';
import { Dimensions,
        AppRegistry,
        ActivityIndicator,
        ListView,
        StyleSheet,
        Image,
        Text,
        View,
        TouchableHighlight,
       } from 'react-native';
import {
        StackNavigator,
      } from 'react-navigation';

export default class ImageList extends Component {
        static navigationOptions = {
          title: 'Image List',
        };

        constructor(props) {
          super(props);
          this.state = {
            isLoading: true
          }
        }

        render() {
          return <Text>gribabas</Text>;
        }

        componentDidMount() {
          var apiUrl = 'https://api.500px.com/v1/photos';
          var feature = 'popular';
          var consumerKey = 'wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
          var pageSize = 42;
          var params = '?feature=' + feature + '&consumer_key=' + consumerKey + '&rpp=' + pageSize;

          params += '&image_size=6';
          var request = apiUrl + params;

          return fetch(request)
          .then((response) => response.json())
          .then((responseJson) => {
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            let currentPage = 0;
            this.setState({
              isLoading: false,
              currentPage: this.state.currentPage + 1,
              dataSource: ds.cloneWithRows(responseJson.photos),
            });
          })
          .catch((error) => {
            console.error(error);
          });
        }


        render() {
          if (this.state.isLoading) {
            return (
              <View style={{flex: 1, paddingTop: 20}}>
                <ActivityIndicator />
              </View>
            );
          }


          return (
              <ListView
                contentContainerStyle={styles.listView}
                dataSource={this.state.dataSource}
                //renderRow={(rowData) => <Text>{rowData.name}</Text>}
                renderRow={(rowData) => <Image
                style={styles.item}
                resizeMode={'contain'}
                source={{uri: rowData.image_url}}/>
              }
              />

          );

        }
      }


      const width = Dimensions.get('window').width;
      const styles = StyleSheet.create({
        listView: {
          paddingTop: 20,
          flexDirection: 'row',
          flexWrap: 'wrap',
          backgroundColor: 'black',
          justifyContent: 'center',
        },
        item: {
          width: (width / 2) - 15,
          height: 150,
          margin: 5,
          backgroundColor: '#383838',
        }
      })

AppRegistry.registerComponent('ReactNativeGallery', () => ReactNativeGallery);
