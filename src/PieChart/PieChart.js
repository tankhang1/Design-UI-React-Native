import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Svg} from 'react-native-svg';
const DATA_OUTCOME = [
  {
    color: '#E84242',
    title: 'Ăn uống',
    percent: 15.8,
    money: 4000000,
  },
  {
    color: '#F968D0',
    title: 'Di chuyển',
    percent: 30,
    money: 154222,
  },
  {
    color: '#E8A542',
    title: 'Sửa chữa',
    percent: 30,
    money: 123333,
  },
  {
    color: '#FF0000',
    title: 'Sức khỏe',
    percent: 10.6,
    money: 4000000,
  },
  {
    color: '#56D5FD',
    title: 'Tiền nhà',
    percent: 13.6,
    money: 12333,
  },
];
const PieCharComponent = ({
  outRadius,
  inRadius,
  radius,
  width,
  height,
  fontSize,
  fontWeight,
  color,
}) => {
  const circumference = 2 * Math.PI * (inRadius + outRadius / 2);
  const caclAngle = currIndex => {
    let angle = 0;
    DATA_OUTCOME.map((data, index) => {
      if (index < currIndex) {
        angle += data.percent;
      } else return angle;
    });
    return angle;
  };
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {/*Pie Chart*/}
      <View
        style={{
          transform: [{rotate: '-90deg'}],
          width,
          height,
        }}>
        <Svg width={width} height={height}>
          {DATA_OUTCOME.map((data, index) => (
            <Circle
              key={index}
              cx={width / 2}
              cy={height / 2}
              r={inRadius + outRadius / 2}
              fill={'transparent'}
              stroke={data.color}
              strokeWidth={outRadius - inRadius}
              strokeDasharray={circumference}
              strokeDashoffset={
                ((360 - 3.6 * data.percent) / 360) * circumference + 1.5
              }
              originX={width / 2}
              originY={height / 2}
              rotation={index === 0 ? 0 : 3.6 * caclAngle(index)}
            />
          ))}
        </Svg>
      </View>
      {/*Legend */}
      <View style={{}}>
        {DATA_OUTCOME.map((data, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 110,
              marginVertical: 10,
              paddingHorizontal: 10,
            }}>
            <View
              style={{
                width: 15,
                height: 15,
                borderRadius: radius,
                backgroundColor: data.color,
              }}
            />
            <Text
              style={{
                color: color,
                textAlign: 'left',
                width: 65,
                fontSize: fontSize,
                fontWeight: fontWeight,
              }}>
              {data.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PieCharComponent;
