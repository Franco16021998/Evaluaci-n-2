
import {
  TouchableOpacity,
  Button,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,    
  ImageBackground
} from 'react-native';
import { TouchableOpacity as TO } from 'react-native-gesture-handler';

import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';


const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'stretch',
  },
  containerSignIn:{
    height: 60,
    marginLeft:'6%',
    marginRight:'6%',
    paddingTop:'2%'
  },
  containerUserName:{
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    marginLeft:'10%',
    marginRight:'10%',
  },
  containerPassword:{
    height: 60,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    marginLeft:'10%',
    marginRight:'10%',
  },
  containerRegister:{
    height: 60,
    marginLeft:'6%',
    marginRight:'6%',
    alignItems: 'center',
  },
  icon:{
    flex:1
  },
  textInput:{
    backgroundColor:'transparent',
    flex:5,
    color:'black',
    paddingLeft:'25%'
  },
  contenedor: {
      width:430,
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderColor: 'gray',
      paddingBottom: 10,
      marginBottom: 20
  },
  texto: {
      width:250,
      marginLeft:10,
  },
  imagen: {
      height:100,
      width: 100,
      borderRadius: 50
  },
  contenedorImagen: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  contenedorFlecha: {
      width: 70,
      justifyContent: 'center',
      alignItems: 'center'
  },
  imagenFlecha: {
      height: 20,
      width: 20,
      borderRadius: 50,
      backgroundColor: 'gray'
  }
})

function Item(props, navigation){
  return(
      <View style={styles.contenedor}>
          <View style={styles.contenedorImagen}>
              <Image style={styles.imagen} source={{uri: props.image}}/>
          </View>

          <View style={styles.texto}>
              <Text style={{ flex: 1, fontSize:25 }}>{props.titulo}</Text>
              <Text numberOfLines={4} style={{ textAlign: 'left' }}>{props.resumen}</Text>
              <Button
                  title="Go to Details"
                  onPress={() => {
        /* 1. Navigate to the Details route with params */
                  props.navigation.navigate('Details', {
                      titulo: props.titulo,
                      imagen: props.image,
                      texto: props.resumen,
                   });
                   }}
              />
          </View>
          
      </View>
  )
}

function DetailsScreen({ route, navigation }) {

  const { titulo, imagen, texto } = route.params;
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize:30, marginBottom: 15 }}>{titulo}</Text>
      <Image style={{ width: 200, height: 200, marginBottom: 15}} source={{uri: imagen}}></Image>
      <Text style={{ fontSize: 20, width: 380 }}>{texto}</Text>
    </View>
  );
}
const imgbg = require('./assets/Fondo-pantalla-8.jpg');

function LoginScreen({ navigation }){
  
  return (
    <ImageBackground source={imgbg} style={{width: '100%', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.containerUserName}>
          <Icon type="font-awesome" name="user" color="gray" containerStyle={styles.icon}/>
          <TextInput placeholder="Username" placeholderTextColor="gray"
          style={styles.textInput}/> 
        </View>

        <View style={styles.containerPassword}>
          <Icon type="entypo" name="key" color="gray" containerStyle={styles.icon}/>
          <TextInput placeholder="Password" placeholderTextColor="gray"
          style={styles.textInput} secureTextEntry={true}/> 
        </View>

        <View style={styles.containerSignIn}>
          <Button title='SIGN IN' backgroundColor='#ffa100'  onPress={() => {
                     navigation.navigate('Home');  
                   }} />
        </View>
       
        
      </View>
      </ImageBackground>        
  );
  
}
function Home({ navigation }) {
  const [lista, setLista] = useState([])

  useEffect(() => {
      fetch(
        "https://yts.mx/api/v2/list_movies.json"
      )
      .then(res => res.json())
      .then(
          result => {
              setLista(result.data.movies)
          },
      )}
  )
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FlatList
              data={lista.length > 0 ? lista : []} renderItem={({item})=>{
                  return(
                  <Item image={item.medium_cover_image} titulo={item.title} resumen={item.summary} navigation={navigation}/>)
              }}
              keyExtractor = {item => item.id}
          />
      </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App