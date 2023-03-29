import {View, Text, ScrollView, Dimensions, StyleSheet} from 'react-native';
import React from 'react';
import {Circle, G, Line, Rect, Svg, Text as TextSVG} from 'react-native-svg';
const {width: WIDTH_WD, height: HEIGHT_WD} = Dimensions.get('window');
const BarChart = ({
  width = 400,
  height = 500,
  backgroundColor = 'white',
  paddingLeft = 50,
  paddingRight = 40,
  paddingTop = 20,
  paddingBottom = 30,
  data = [],
  gap_xAxis = 40,
  barWidth = 20,
  barColor = '#59e012',
  barRadius = 10,
}) => {
  const y1 = height - paddingBottom;
  const y2 = y1;
  const y3 = paddingTop;
  const gap_Between_xAxis = gap_xAxis + barWidth / 2;
  const x1 = paddingLeft;
  const x3 = x1;

  const x2 = data.length * gap_Between_xAxis + gap_Between_xAxis;
  const maxDataValue = Math.max(...data.map(item => item.value));
  const gap_yAxis = (y1 - y3) / maxDataValue;
  return (
    <View
      style={{
        backgroundColor: 'white',
        flexDirection: 'row',
      }}>
      <View style={StyleSheet.absoluteFillObject}>
        <Svg>
          <Line x1={x1} y1={y1} x2={x3} y2={y3} stroke="black" key={'y_Axis'} />
          {[...new Array(7)].map((_, index) => {
            return (
              <G key={index}>
                <TextSVG
                  fill={'black'}
                  fontSize={14}
                  x={x1 - 10}
                  y={y1 - ((y1 - y3) / 6) * index}
                  textAnchor="end">
                  {Math.floor((maxDataValue / 6) * index)}
                </TextSVG>
                {index !== 0 && (
                  <Line
                    x1={x1}
                    y1={y1 - ((y1 - y3) / 6) * index}
                    x2={x1 - 5}
                    y2={y1 - ((y1 - y3) / 6) * index}
                    stroke="black"
                  />
                )}
              </G>
            );
          })}
        </Svg>
      </View>
      <ScrollView
        style={{marginLeft: x1}}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          width: x2 + paddingRight,

          height,
        }}
        bounces={0}
        onScroll={e => console.log(e.nativeEvent.contentOffset)}>
        <Svg>
          <Line x1={0} y1={y1} x2={x2} y2={y2} stroke="black" key={'x_Axis'} />

          {data.map((item, index) => {
            return (
              <G key={index}>
                <Line
                  x1={gap_Between_xAxis * (index + 1)}
                  y1={y1}
                  x2={gap_Between_xAxis * (index + 1)}
                  y2={y1 + 5}
                  stroke="black"
                />
                <TextSVG
                  fontSize={14}
                  fill="black"
                  x={gap_Between_xAxis * (index + 1)}
                  y={y1 + 20}
                  textAnchor="middle">
                  {item.month}
                </TextSVG>
              </G>
            );
          })}
          {data.map((item, index) => {
            return (
              <G key={index}>
                <Rect
                  x={gap_Between_xAxis * (index + 1) - barWidth / 2}
                  y={y1 - gap_yAxis * item.value}
                  height={gap_yAxis * item.value}
                  width={barWidth}
                  rx={barRadius}
                  ry={barRadius}
                  fill={barColor}
                />
                <TextSVG
                  fontSize={14}
                  fill="black"
                  x={gap_Between_xAxis * (index + 1) - barWidth / 2}
                  y={y1 - gap_yAxis * item.value - 20}>
                  {item.value}
                </TextSVG>
              </G>
            );
          })}
        </Svg>
      </ScrollView>
    </View>
  );
};

export default BarChart;
