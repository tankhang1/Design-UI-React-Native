import {View, Text, Button} from 'react-native';
import React from 'react';

import BarChart from './src/BarChart/BarChart';
import {useState} from 'react';
import FunnyScroll from './src/FunnyScrollView/FunnyScroll';
import Fluid_Body_Animation from './src/FluidBody/Fluid_Body_Animation';
import FluidBody_v2 from './src/FluidBody/FluidBody_v2/FluidBody_v2';
import WaveAnimation from './src/WaveAnimation/WaveAnimation';
import Example_1 from './src/Rive/Example_1';
import Rive, {Fit} from 'rive-react-native';
import WaveAnimation_v1 from './src/WaveAnimation/WaveAnimation_v1';
import Carousel from './src/Carousel_Flastlist/Carousel';
import Caculator from './src/Caculator/Caculator';
import Calander_Picker from './src/Calendar/Calendar_Picker/Calander_Picker';
import Copilot from './src/Copilot/Copilot';
import Drag_Drop_V1 from './src/Drag&Drop/Drag_Drop_V1';
import Food_Material from './src/Food_Material/Food_Material';
import NavigationBottom from './src/Funny_Tabbar/NavigationBottom';
import Funny_TextInput from './src/Funny_TextInput/Funny_TextInput';
import LineChart from './src/LineChart/LineChart';
import ScrollHeaderRive from './src/Rive/ScrollHeaderRive';
import PieCharComponent from './src/PieChart/PieChart';
import Scanner from './src/Scanner/Scanner';
import SpreadCard from './src/SpreadCard/SpreadCard';
import TeslaChargeScreen from './src/Neumorphisim/Tesla_Neumorphism/TeslaChargeScreen';
import Tesla_Neumorphism from './src/Neumorphisim/Tesla_Neumorphism/Tesla_Neumorphism';
import Logo_Neumorphism from './src/Neumorphisim/Logo_Figma/Logo_Neumorphism';
const App = () => {
  const [pressItem, setPressItem] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  return (
    // <Provider store={store}>
    <View
      style={{
        flex: 1,
        // // paddingTop: 10,
      }}>
      {/* <Carousel /> */}

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
      {/* <Caculator /> */}
      <Logo_Neumorphism />
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
      {/* <LineChart
        data={[
          {month: 'Tháng 1', value: 5},
          {month: 'Tháng 2', value: 1},
          {month: 'Tháng 3', value: 6000000},
          {month: 'Tháng 4', value: 600},
          {month: 'Tháng 5', value: 12350},
          {month: 'Tháng 6', value: 600},
          {month: 'Tháng 7', value: 700},
          {month: 'Tháng 8', value: 700},
          {month: 'Tháng 9', value: 158},
          {month: 'Tháng 10', value: 700},
          {month: 'Tháng 11', value: 700},
          {month: 'Tháng 12', value: 200},
        ]}
        pressItem={pressItem}
        setPressItem={setPressItem}
      /> */}
      {/* <ScrollHeaderRive /> */}
      {/* <Authentification /> */}
      {/* <Table
        tableHeader={['', 'Header 1', 'Header 2', 'Header 3']}
        tableTitle={['Title 1', 'Title 2', 'Title 3']}
        tableData={[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
        ]}
        width={400}
        height={300}
        borderColor="grey"
      /> */}

      {/* <BarChart
        dataIncome={[
          {month: 'Jan', value: 500},
          {month: 'Feb', value: 400},
          {month: 'Mar', value: 600},
          {month: 'Apr', value: 240},
          {month: 'Jun', value: 600},
          {month: 'Jul', value: 700},
          {month: 'Aug', value: 700},
          {month: 'Sep', value: 158},
          {month: 'Oct', value: 700},
          {month: 'Nov', value: 700},
          {month: 'Dec', value: 200},
        ]}
        dataOutcome={[
          {month: 'Jan', value: 123},
          {month: 'Feb', value: 443},
          {month: 'Mar', value: 1344},
          {month: 'Apr', value: 998},
          {month: 'Jun', value: 600},
          {month: 'Jul', value: 700},
          {month: 'Aug', value: 13},
          {month: 'Sep', value: 12},
          {month: 'Oct', value: 700},
          {month: 'Nov', value: 700},
          {month: 'Dec', value: 200},
        ]}
      /> */}
      {/* <Example_1 /> */}
      {/* <Calander_Picker /> */}
    </View>
    // </Provider>
  );
};
const signUpConfig = {
  header: 'My Customized Sign Up',
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Full name',
      key: 'name',
      required: true,
      displayOrder: 1,
      type: 'string',
    },
    {
      label: 'Email',
      key: 'email',
      required: true,
      displayOrder: 2,
      type: 'string',
    },
    {
      label: 'Username',
      key: 'preferred_username',
      required: true,
      displayOrder: 3,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      displayOrder: 4,
      type: 'password',
    },
  ],
};

export default App;
