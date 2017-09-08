'use strict'
import React from 'react';
import { Dimensions,
        Alert,
        AppRegistry,
        ActivityIndicator,
        ListView,
        StyleSheet,
        Image,
        Text,
        View,
        Button,
        TouchableHighlight,
       } from 'react-native';
import { StackNavigator } from 'react-navigation';


class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Gallery Grid',
  };



  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    var apiUrl = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
    var imageSize = '&image_size=6';
    var pNumber = 1;
    var pageN = '&page=' + pNumber;
    var request = apiUrl + imageSize + pageN;

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


renderFooter = () => {
  return (
    <View style={styles.buttonContainer}>
      <Button
        onPress ={() => navigate('Image')}
        title={"Press Me"}
        color="#841584"
      />
    </View>
  )
}

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
          <ListView
            contentContainerStyle={styles.listView}
            dataSource={this.state.dataSource}

          renderRow={(rowData) => {
            return (
              <TouchableHighlight onPress ={() => navigate('Image', {uri: rowData.image_url})}>
              <Image
              style={styles.item}
              resizeMode={'contain'}
              source={{uri: rowData.image_url}}
              renderFooter={this.renderFooter}/>
              </TouchableHighlight>
            )
            }
          }
          />
      </View>
    );

  }

}

//--------

class ImageScreen extends React.Component {
  static navigationOptions = {
    title: 'Gallery View',
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <Image
      style={styles.imageView}
      resizeMode={'contain'}
      source={{uri: params.uri}}
      />
    );
  }
}

//Styles

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  item: {
    width: (width / 2) - 15,
    height: 150,
    margin: 5,
    backgroundColor: '#383838',
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  imageView: {
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    margin: 20,
  },
});

//Navigation

const GalleryAppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Image: { screen: ImageScreen },
});

const AppNavigation = () => (
  <GalleryAppNavigator/>
);

export default class App extends React.Component {
  render () {
    return (
      <AppNavigation/>
    );
  }
}


AppRegistry.registerComponent('App', () => App);
