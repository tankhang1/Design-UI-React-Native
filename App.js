import {View, Text, Button} from 'react-native';
import React from 'react';

import BarChart from './src/BarChart/BarChart';
import {useState} from 'react';
import FunnyScroll from './src/FunnyScrollView/FunnyScroll';

const App = () => {
  const [pressItem, setPressItem] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  return (
    // <Provider store={store}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // // paddingTop: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
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
      <FunnyScroll />
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
