import {View, Animated, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useRef, useState, memo, useCallback} from 'react';
import {
  Circle,
  Defs,
  G,
  Line,
  Marker,
  Path,
  Rect,
  Svg,
  Text as TextSVG,
} from 'react-native-svg';
import {useMemo} from 'react';
const moneyUnit = ['trăm', 'triệu', 'tỷ', 'nghìn tỷ'];
const LineChart = ({
  heightChart = 400,
  paddingLeft = 45,
  paddingBottom = 30,
  paddingRight = 10,
  paddingTop = 50,
  backgroundColor = 'white',
  axisColor = 'black',
  data = [],
  colorMarker = '#FF5C00',
  lineColor = '#FF5C00',
  lineWidth = 2,
  markerWidth = 1.5,
  gapItem = 70,
  strokeColor = 'hsl(0,0%,73%)',
  labelFontSize = 12,
  buttonBackColor = 'hsl(44,99%,50%)',
  buttonLabelColor = 'black',
  buttonRadius = 5,
  label_xAxis = 'Month',
  showStrokeBack = true,
  pressItem,
  setPressItem,
}) => {
  const x1 = paddingLeft;
  const y1 = heightChart - paddingBottom;
  const x2 = data.length * gapItem - paddingRight + x1 + 30;
  const y2 = heightChart - paddingBottom;
  const x3 = paddingLeft;
  const y3 = paddingTop;
  const gapBetweenPoint_xAxis = gapItem;
  const x_Axis_Animated = useRef(new Animated.Value(x1)).current;
  const y_Axis_Animated = useRef(new Animated.Value(y1)).current;
  const line_Animated = useRef(new Animated.Value(0)).current;
  const max_Data_Value = useMemo(
    () => Math.max(...data.map(item => item.value)),
    [],
  );
  const gapBetweenPoint_yAxix = (y1 - y3) / data.length;
  const valueBetweenPoint_yAxix = max_Data_Value / data.length;
  const computeValue_yAxis = useCallback(() => {
    if (max_Data_Value > Math.pow(10, 11)) {
      return {
        reduce: Math.pow(10, 9),
        title_yAxis: 'nghìn tỷ',
      };
    }
    if (max_Data_Value > Math.pow(10, 6)) {
      return {
        reduce: Math.pow(10, 6),
        title_yAxis: 'tỷ',
      };
    }
    if (max_Data_Value > Math.pow(10, 3)) {
      return {
        reduce: Math.pow(10, 3),
        title_yAxis: 'triệu',
      };
    }
    return {
      reduce: 1,
      title_yAxis: 'nghìn',
    };
  }, []);
  const value_yAxis = useMemo(() => computeValue_yAxis(), []);
  const computeValue = useCallback(value => {
    if (value > Math.pow(10, 11)) {
      return (
        Math.round((value / Math.pow(10, 11) + Number.EPSILON) * 100) / 100 +
        ' ' +
        moneyUnit[3]
      );
    }
    if (value > Math.pow(10, 6)) {
      return (
        Math.round((value / Math.pow(10, 6) + Number.EPSILON) * 100) / 100 +
        ' ' +
        moneyUnit[2]
      );
    }
    if (value > Math.pow(10, 3)) {
      return (
        Math.round((value / Math.pow(10, 3) + Number.EPSILON) * 100) / 100 +
        ' ' +
        moneyUnit[1]
      );
    }
    if (value > Math.pow(10, 2)) {
      return (
        Math.round((value / Math.pow(10, 2) + Number.EPSILON) * 100) / 100 +
        ' ' +
        moneyUnit[0]
      );
    }
    return value;
  }, []);
  useEffect(() => {
    initialAnimation();
    line_Animated.setValue(pathLength);
    Animated.timing(line_Animated, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  const initialAnimation = useCallback(() => {
    Animated.parallel(
      Animated.timing(x_Axis_Animated, {
        toValue: x2,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
      Animated.timing(y_Axis_Animated, {
        toValue: y3 - 20,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
    );
  }, []);

  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const createPathLine = useCallback(() => {
    let d = '';
    data.map((item, index) => {
      const y = y1 - ((y1 - y3) / max_Data_Value) * item.value;
      if (index === 0) {
        d += `M ${x1 * 2} ${y}`;
      } else {
        d += `L ${x1 * 2 + gapBetweenPoint_xAxis * index} ${y}`;
      }
    });
    return d;
  }, [data]);
  const line = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        flexDirection: 'row',
      }}>
      <View style={[StyleSheet.absoluteFillObject]}>
        <Svg>
          <G key="y_Axis">
            <AnimatedLine
              x1={x1}
              x2={x3}
              y1={y1}
              y2={y_Axis_Animated}
              stroke={axisColor}
            />
            <Path
              d={`M  ${x1 - 5} ${y3 - 20}L ${x1 + 5} ${y3 - 20} L ${x1} ${
                y3 - 25
              } z`}
              fill={axisColor}
            />
            <TextSVG
              x={x1}
              y={y3 - 30}
              textAnchor={'middle'}
              fontSize={labelFontSize}>
              {value_yAxis.title_yAxis}
            </TextSVG>
          </G>
          {[...new Array(data.length + 1)].map((_, index) => {
            const value =
              Math.round(
                ((valueBetweenPoint_yAxix * index) / value_yAxis.reduce +
                  Number.EPSILON) *
                  100,
              ) / 100;
            return (
              <G key={`y_Axis_Lable_Line_${index}`}>
                <Line
                  x1={x1}
                  x2={x1 - 5}
                  y1={y1 - gapBetweenPoint_yAxix * index}
                  y2={y1 - gapBetweenPoint_yAxix * index}
                  stroke={axisColor}
                />
                <TextSVG
                  textAnchor="middle"
                  x={x1 - 25}
                  y={y1 - gapBetweenPoint_yAxix * index}
                  fontSize={labelFontSize}>
                  {value}
                </TextSVG>
              </G>
            );
          })}
        </Svg>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginLeft: x1,
        }}
        contentContainerStyle={{
          width: x2 + paddingRight,
          height: heightChart,
          marginLeft: -x1,
        }}
        removeClippedSubviews={true}>
        <Svg>
          <Defs>
            <Marker id="marker">
              <Circle x={0} y={0} r={markerWidth} fill={colorMarker} />
            </Marker>
          </Defs>
          <G key="x_Axis">
            <AnimatedLine
              x1={x1}
              x2={x_Axis_Animated}
              y1={y1}
              y2={y2}
              stroke={axisColor}
            />
            <Path
              d={`M  ${x2} ${y1 - 5}L ${x2 + 5} ${y1} L ${x2} ${y1 + 5} z`}
              fill={axisColor}
            />
            <TextSVG
              x={x2 - 10}
              y={y1 - 15}
              textAnchor={'middle'}
              fontSize={labelFontSize}>
              {label_xAxis}
            </TextSVG>
          </G>
          {data.map((item, index) => {
            return (
              <G key={`x_Axis_Lable_Line_${index}`}>
                <Line
                  x1={gapBetweenPoint_xAxis * index + x1 * 2}
                  x2={gapBetweenPoint_xAxis * index + x1 * 2}
                  y1={y1}
                  y2={y1 + 5}
                  stroke={axisColor}
                />

                {showStrokeBack && (
                  <G>
                    <Path
                      d={`M ${x1} ${
                        y1 -
                        gapBetweenPoint_yAxix * index -
                        gapBetweenPoint_yAxix
                      } h ${x2 - x1}`}
                      stroke={strokeColor}
                      strokeDasharray={[5]}
                      key={`stroke_y_Axis_${index}`}
                    />

                    <Path
                      d={`M ${gapBetweenPoint_xAxis * index + x1 * 2} ${y3} v ${
                        y1 - y3
                      }`}
                      stroke={strokeColor}
                      strokeDasharray={[5]}
                      key={`stroke_x_Axis_${index}`}
                    />
                  </G>
                )}

                <TextSVG
                  textAnchor="middle"
                  x={gapBetweenPoint_xAxis * index + x1 * 2}
                  y={y1 + 25}
                  fontWeight={pressItem?.month === item.month ? '700' : '400'}
                  fontSize={labelFontSize}>
                  {item.month}
                </TextSVG>
              </G>
            );
          })}
          <G>
            <AnimatedPath
              ref={line}
              d={createPathLine()}
              stroke={lineColor}
              fill={'none'}
              marker={'url(#marker)'}
              strokeLinejoin="round"
              strokeLinecap={'round'}
              onLayout={() => setPathLength(line.current?.getTotalLength())}
              strokeDasharray={pathLength}
              strokeDashoffset={line_Animated}
              strokeWidth={lineWidth}
            />
            {data.map((item, index) => {
              const y = y1 - ((y1 - y3) / max_Data_Value) * item.value;
              const value = computeValue(item.value);
              if (index === 0) {
                return (
                  <G key={index}>
                    <Rect
                      width={(labelFontSize / 2) * value.toString().length + 10}
                      height={30}
                      x={
                        x1 * 2 +
                        gapBetweenPoint_xAxis * index -
                        ((labelFontSize / 2) * value.toString().length + 10) / 2
                      }
                      y={y - 50}
                      rx={buttonRadius}
                      ry={buttonRadius}
                      fill={buttonBackColor}
                    />
                    <TextSVG
                      x={x1 * 2 + gapBetweenPoint_xAxis * index}
                      y={y - 30}
                      textAnchor="middle"
                      fontSize={labelFontSize}
                      fill={buttonLabelColor}>
                      {value}
                    </TextSVG>
                  </G>
                );
              } else {
                return (
                  <G key={index} onPress={() => setPressItem(item)}>
                    <Rect
                      width={(labelFontSize / 2) * value.toString().length + 10}
                      height={30}
                      x={
                        x1 * 2 +
                        gapBetweenPoint_xAxis * index -
                        ((labelFontSize / 2) * value.toString().length + 10) / 2
                      }
                      y={y - 50}
                      rx={buttonRadius}
                      ry={buttonRadius}
                      fill={buttonBackColor}></Rect>
                    <TextSVG
                      x={x1 * 2 + gapBetweenPoint_xAxis * index}
                      y={y - 30}
                      textAnchor="middle"
                      fill={buttonLabelColor}
                      fontSize={labelFontSize}>
                      {value}
                    </TextSVG>
                  </G>
                );
              }
            })}
          </G>
        </Svg>
      </ScrollView>
    </View>
  );
};

export default memo(LineChart);
