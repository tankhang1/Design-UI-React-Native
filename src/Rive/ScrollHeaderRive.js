import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Rive, {Alignment, Fit, RiveRef} from 'rive-react-native';
import {useRef} from 'react';

const DATA = [...new Array(20)].fill(Math.floor(Math.random() * 2000));
const ScrollHeaderRive = () => {
  const riveRef = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '100%',
          height: 300,
        }}>
        <Rive
          ref={riveRef}
          resourceName={'earth_interaction'}
          artboardName="Space Reload"
          stateMachineName="Reload"
          autoplay={true}
          style={{
            width: '100%',
            height: 300,
          }}
          fit={Fit.Cover}
          alignment={Alignment.TopCenter}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,
        }}
        onScroll={e =>
          riveRef.current?.setInputState(
            'Reload',
            'Pull Amount',
            e.nativeEvent.contentOffset.y,
          )
        }>
        {DATA.map((item, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 10,
                borderWidth: 1,
              }}>
              <Text style={{color: 'black'}}>{item}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ScrollHeaderRive;
