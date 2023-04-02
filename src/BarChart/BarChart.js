import {View, ScrollView, StyleSheet} from 'react-native';
import React from 'react';
import {G, Line, Path, Rect, Svg, Text as TextSVG} from 'react-native-svg';
const BarChart = ({
  height = 500,
  backgroundColor = 'white',
  paddingLeft = 50,
  paddingRight = 40,
  paddingTop = 50,
  paddingBottom = 30,
  dataIncome = [],
  dataOutcome = [],
  gap_xAxis = 80,
  barWidth = 30,
  barColorIncome = '#59e012',
  barColorOutcome = '#FF5C00',
  barRadius = 2,
  title_xAxis = 'VND',
  title_yAxis = 'Month',
}) => {
  const y1 = height - paddingBottom;
  const y2 = y1;
  const y3 = paddingTop;
  const gap_Between_xAxis = gap_xAxis + barWidth / 2;
  const x1 = paddingLeft;
  const x3 = x1;

  const x2 = dataIncome.length * gap_Between_xAxis + gap_Between_xAxis;
  const maxDataIncomeValue = Math.max(...dataIncome.map(item => item.value));
  const maxDataOutcomeValue = Math.max(...dataOutcome.map(item => item.value));
  const maxDataValue =
    maxDataIncomeValue >= maxDataOutcomeValue
      ? maxDataIncomeValue
      : maxDataOutcomeValue;
  const gap_yAxis = (y1 - y3) / maxDataValue;
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flexDirection: 'row',
      }}>
      <View style={StyleSheet.absoluteFillObject}>
        <Svg>
          <Line
            x1={x1}
            y1={y1}
            x2={x3}
            y2={y3 - 20}
            stroke="black"
            key={'y_Axis'}
          />

          <Path
            d={`M ${x1 - 5} ${y3 - 20} L ${x1} ${y3 - 25} L ${x1 + 5} ${
              y3 - 20
            } z `}
          />
          <TextSVG
            font={14}
            fill={'black'}
            x={x1}
            y={y3 - 30}
            textAnchor="middle">
            {title_xAxis}
          </TextSVG>
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
                  <G>
                    <Line
                      x1={x1}
                      y1={y1 - ((y1 - y3) / 6) * index}
                      x2={x1 - 5}
                      y2={y1 - ((y1 - y3) / 6) * index}
                      stroke="black"
                    />
                  </G>
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
          <Path d={`M ${x2} ${y2 - 5} L ${x2} ${y2 + 5} L ${x2 + 5} ${y2} z`} />
          <TextSVG
            font={14}
            fill={'black'}
            x={x2 - 10}
            y={y2 + 15}
            textAnchor="middle">
            {title_yAxis}
          </TextSVG>
          {dataIncome.map((item, index) => {
            return (
              <G key={index}>
                {index !== 0 && (
                  <Line
                    x1={0}
                    y1={y1 - ((y1 - y3) / 6) * index}
                    x2={x2}
                    y2={y1 - ((y1 - y3) / 6) * index}
                    stroke={'grey'}
                    strokeDasharray={[2]}
                  />
                )}
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
          {dataIncome.map((item, index) => {
            return (
              <G key={index}>
                <Rect
                  x={gap_Between_xAxis * (index + 1) + 2}
                  y={y1 - gap_yAxis * item.value}
                  height={gap_yAxis * item.value}
                  width={barWidth}
                  rx={barRadius}
                  ry={barRadius}
                  fill={barColorIncome}
                />

                <TextSVG
                  fontSize={14}
                  fill="black"
                  x={gap_Between_xAxis * (index + 1) + 2 + barWidth / 2}
                  y={y1 - gap_yAxis * item.value - 20}
                  textAnchor="middle">
                  {item.value}
                </TextSVG>
              </G>
            );
          })}
          {dataOutcome.map((item, index) => {
            return (
              <G key={index}>
                <Rect
                  x={gap_Between_xAxis * (index + 1) - barWidth - 2}
                  y={y1 - gap_yAxis * item.value}
                  height={gap_yAxis * item.value}
                  width={barWidth}
                  rx={barRadius}
                  ry={barRadius}
                  fill={barColorOutcome}
                />

                <TextSVG
                  fontSize={14}
                  fill="black"
                  x={
                    gap_Between_xAxis * (index + 1) -
                    barWidth -
                    2 +
                    barWidth / 2
                  }
                  y={y1 - gap_yAxis * item.value - 20}
                  textAnchor="middle">
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
