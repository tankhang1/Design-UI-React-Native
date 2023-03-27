import {View, Text, Button} from 'react-native';
import React from 'react';
import NavigationBottom from './src/Funny_Tabbar/NavigationBottom';
import Food_Material from './src/Food_Material/Food_Material';
import Drag_Drop_V1 from './src/Drag&Drop/Drag_Drop_V1';
import Reflectly_Tabbar from './src/Reflectly_Tabbar/Reflectly_Tabbar';
import SpreadCard from './src/SpreadCard/SpreadCard';
import Copilot from './src/Copilot/Copilot';
import Scanner from './src/Scanner/Scanner';
import LineChart from './src/LineChart/LineChart';
const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
      }}>
      {/* <Rive
        resourceName={'login_screen_character'}
        artboardName="Artboard"
        stateMachineName="State Machine 1"
        autoplay={true}
        style={{width: '100%', height: 200}}
        fit={Fit.Contain}
      />
      <View>
        <Text style={{color: 'black'}}>Run time</Text>
      </View> */}
      {/* <SpreadCard /> */}
      {/* <PieCharComponent
        outRadius={80}
        inRadius={25}
        width={250}
        height={250}
        radius={5}
        fontSize={14}
        fontWeight={'400'}
        color={'black'}
      /> */}
      <LineChart
        data={[
          {month: 'Jan', value: 500},
          {month: 'Feb', value: 400},
          {month: 'Mar', value: 600},
          {month: 'Apr', value: 240},
          {month: 'Jun', value: 600},
          {month: 'Jul', value: 700},
        ]}
      />
    </View>
  );
};

export default App;
