import {View, Text} from 'react-native';
import React from 'react';
import Reflectly_Tabbar from './src/Reflectly_Tabbar/Reflectly_Tabbar';
import Funny_TextInput from './src/Funny_TextInput/Funny_TextInput';
import Food_Material from './src/Food_Material/Food_Material';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Food_Material />
    </View>
  );
};

export default App;
