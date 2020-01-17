/**
 * No React Native, o onClick é substituído por onPress.
 * 
 * Por padrão, sempre que uma página for definida nas rotas, é referenciada uma 
 * propriedade relacionada à navegação das páginas, como se fosse um gancho que 
 * unisse cada página. Ou seja, já que é uma propriedade de componente, basta 
 * desestruturar ele no parâmetro do componente, e assim pode-se usar ele para 
 * referenciar outra página em algum clique ou circunstância qualquer.
 * 
 * Junto com o navigate, é usada uma função denominada "navigate()", em que ela 
 * necessita de dois argumentos. O primeiro deles (que nesse caso é 'Profile'), 
 * é o nome da página (definido no arquivo de rotas) em que, ao clicar, seremos 
 * direcionados, e o segundo argumento, passado como objeto, são os dados que 
 * desejamos passar à outra página, ou seja, são os dados que pegaremos da página 
 * atual e levaremos para a página que seremos direcionados (mais ou menos como 
 * o comportamento do submit, de um form HTML).
 * 
 * Quando deseja-se colocar algo em cima de algo, ou nesse caso, do mapa, é 
 * recomendado colocar o código desse conteúdo depois do código do elemento já 
 * existente, e não antes.
 */

import React, { useEffect, useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import api from '../../services/api';
import styles from './styles';

function Main({ navigation }) {
  const [ devs, setDevs ] = useState([]);
  const [ currentRegion, setCurrentRegion ] = useState(null);

  useEffect( () => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;
        
        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.04,
        });
      }
    }

    loadInitialPosition();
  }, [] );

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: 'ReactJS'
      }
    });

    console.log( response.data );

    setDevs( response.data );
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <MapView 
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
        style={ styles.map }
      >
        <Marker coordinate={{ latitude: -26.4500233, longitude: -48.6295809 }}>
          <Image 
            source={{ uri: 'https://avatars0.githubusercontent.com/u/48127848?s=460&v=4' }} 
            style={ styles.avatar }
          />

          <Callout onPress={ () => {
            navigation.navigate('Profile', { github_username: 'AlemaoProchnow' });
          } }>
            <View style={ styles.callout }>
              <Text style={ styles.devName }>Cristian Prochnow</Text>
              <Text style={ styles.devBio }>Desenvolvedor PHP durante o período letivo e aprendiz de JavaScript e suas tecnologias nas horas vagas.</Text>
              <Text style={ styles.devTechs }>React JS, React Native, Node.js</Text>
            </View>
          </Callout>
        </Marker>

        { devs.map( dev => {
          <Marker
            key={ dev._id } 
            coordinate={{
              longitude: dev.location.coordinate[0],
              latitude: dev.location.coordinate[1],
            }}
          >
            <Image 
              source={{ uri: dev.avatar_url }} 
              style={ styles.avatar }
            />

            <Callout onPress={ () => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            } }>
              <View style={ styles.callout }>
                <Text style={ styles.devName }>{ dev.name }</Text>
                <Text style={ styles.devBio }>{ dev.bio }</Text>
                <Text style={ styles.devTechs }>{ dev.techs.join(', ') }</Text>
              </View>
            </Callout>
          </Marker>
        } ) }
      </MapView>

      <View style={ styles.searchForm }>
        <TextInput 
          style={ styles.searchInput }
          placeholder="Buscar Devs por techs..."
          placeholderTextColor="#999999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={loadDevs} style={ styles.loadButton }>
          <MaterialIcons name="my-location" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  );
}

export default Main;