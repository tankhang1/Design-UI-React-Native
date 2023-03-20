import {View, Text} from 'react-native';
import React from 'react';
// import Reflectly_Tabbar from './src/Reflectly_Tabbar/Reflectly_Tabbar';
// import Funny_TextInput from './src/Funny_TextInput/Funny_TextInput';
// import Food_Material from './src/Food_Material/Food_Material';
// import NavigationBottom from './src/Funny_Tabbar/NavigationBottom';
// import Caculator from './src/Caculator/Caculator';
// import CanvasUI from './src/RNSkia_Example/CanvasUI';
// import PaintingUI from './src/RNSkia_Example/PaintingUI';
// import GroupUI from './src/RNSkia_Example/GroupUI';
// import PathUI from './src/RNSkia_Example/PathUI';
// import PolygonsUI from './src/RNSkia_Example/PolygonsUI';
// import EllipsesUI from './src/RNSkia_Example/EllipsesUI';
// import VerticesUI from './src/RNSkia_Example/VerticesUI';
// import PatchUI from './src/RNSkia_Example/PatchUI';
// import BoxUI from './src/RNSkia_Example/BoxUI';
// import ImageUI from './src/RNSkia_Example/ImageUI';
// import TextUI from './src/RNSkia_Example/TextUI';
// import TextPathUI from './src/RNSkia_Example/TextPathUI';
// import SpreadCard from './src/SpreadCard/SpreadCard';
// import Drag_Drop_V1 from './src/Drag&Drop/Drag_Drop_V1';
// import Images from './src/RNSkia_Example/Images';
// import LinearGradientUI from './src/RNSkia_Example/LinearGradient';
// import RadialGradientUI from './src/RNSkia_Example/RadialGradientUI';
// import Two_Point_Conical_GradientUI from './src/RNSkia_Example/Two_Point_Conical_GradientUI';
// import SweepGradientUI from './src/RNSkia_Example/SweepGradientUI';
// import ShadowsUI from './src/RNSkia_Example/ShadowsUI';
// import BlurUI from './src/RNSkia_Example/BlurUI';
// import OffsetUI from './src/RNSkia_Example/OffsetUI';
// import MorphologyUI from './src/RNSkia_Example/MorphologyUI';
// import MaskFilterUI from './src/RNSkia_Example/MaskFilterUI';
// import MaskUI from './src/RNSkia_Example/MaskUI';
// import Tesla_Neumorphism from './src/Neumorphisim/Tesla_Neumorphism/Tesla_Neumorphism';
// import ActivityIndicatorUI from './src/RN_Component_Example/ActivityIndicatorUI';
// import ButtonUI from './src/RN_Component_Example/ButtonUI';
import TeslaChargeScreen from './src/Neumorphisim/Tesla_Neumorphism/TeslaChargeScreen';
import ImageUI from './src/RN_Component_Example/ImageUI';
import Example_1 from './src/Rive/Example_1';
import Rive, {Alignment, Fit, RiveRef} from 'rive-react-native';
import PieCharComponent from './src/PieChart/PieChart';

const App = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
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
      <PieCharComponent outRadius={80} inRadius={45} width={250} height={250} />
    </View>
  );
};

export default App;
