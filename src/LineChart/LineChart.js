import {View, Text, Dimensions, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
const {width: WIDTH_WD, height: HEIGHT_WD} = Dimensions.get('window');
const LineChart = ({
  widthChart = WIDTH_WD,
  heightChart = 400,
  paddingLeft = 45,
  paddingBottom = 30,
  paddingRight = 10,
  paddingTop = 50,
  backgroundColor = 'white',
  axisColor = 'gray',
  data = [],
  colorMarker = 'black',
  lineColor = 'gray',
}) => {
  const x1 = paddingLeft;
  const y1 = heightChart - paddingBottom;
  const x2 = widthChart - paddingRight;
  const y2 = heightChart - paddingBottom;
  const x3 = paddingLeft;
  const y3 = paddingTop;
  const gapBetweenPoint_xAxis = (x2 - x1) / data.length;
  const x_Axis_Animated = useRef(new Animated.Value(x1)).current;
  const y_Axis_Animated = useRef(new Animated.Value(y1)).current;
  const line_Animated = useRef(new Animated.Value(0)).current;
  const max_Data_Value = Math.max(...data.map(item => item.value));
  const gapBetweenPoint_yAxix = (y1 - y3) / data.length;
  const valueBetweenPoint_yAxix = max_Data_Value / data.length;
  useEffect(() => {
    initialAnimation();
  }, []);
  const initialAnimation = () => {
    Animated.parallel(
      Animated.timing(x_Axis_Animated, {
        toValue: x2,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
      Animated.timing(y_Axis_Animated, {
        toValue: y3 - 10,
        duration: 1000,
        useNativeDriver: true,
      }).start(),
    );
  };
  useEffect(() => {
    line_Animated.setValue(pathLength);
    Animated.timing(line_Animated, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, pathLength);
  const AnimatedLine = Animated.createAnimatedComponent(Line);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const createPathLine = () => {
    let d = '';
    data.map((item, index) => {
      const y = y1 - ((y1 - y3) / max_Data_Value) * item.value;
      if (index === 0) {
        d += `M ${x1} ${y}`;
      } else {
        d += `L ${x1 + gapBetweenPoint_xAxis * index} ${y}`;
      }
    });
    return d;
  };
  const line = useRef(null);
  const [pathLength, setPathLength] = useState(0);

  return (
    <View
      style={{
        width: widthChart,
        height: heightChart,
        backgroundColor: backgroundColor,
      }}>
      <Svg>
        <Defs>
          <Marker id="marker">
            <Circle x={0} y={0} r={2} fill={colorMarker} />
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
            stroke="black"
          />
        </G>

        <G key="y_Axis">
          <AnimatedLine
            x1={x1}
            x2={x3}
            y1={y1}
            y2={y_Axis_Animated}
            stroke={axisColor}
          />
          <Path d={`M  ${x1 + 5} ${y3 - 8} h -10 l 5 -8  z`} stroke="black" />
        </G>

        {data.map((item, index) => {
          return (
            <G key={`x_Axis_Lable_Line_${index}`}>
              <Line
                x1={gapBetweenPoint_xAxis * index + x1}
                x2={gapBetweenPoint_xAxis * index + x1}
                y1={y1}
                y2={y1 + 5}
                stroke={axisColor}
              />
              <Path
                d={`M ${gapBetweenPoint_xAxis * index + x1} ${y3} v ${y1 - y3}`}
                stroke={axisColor}
                strokeDasharray={[5]}
              />
              <TextSVG
                textAnchor="middle"
                x={gapBetweenPoint_xAxis * index + x1}
                y={y1 + 20}
                fontSize={14}>
                {item.month}
              </TextSVG>
            </G>
          );
        })}
        {[...new Array(data.length + 1)].map((_, index) => {
          return (
            <G key={`y_Axis_Lable_Line_${index}`}>
              <Line
                x1={x1}
                x2={x1 - 5}
                y1={y1 - gapBetweenPoint_yAxix * index}
                y2={y1 - gapBetweenPoint_yAxix * index}
                stroke={axisColor}
              />
              <Path
                d={`M ${x1} ${y1 - gapBetweenPoint_yAxix * index} h ${x2 - x1}`}
                stroke={axisColor}
                strokeDasharray={[5]}
              />
              <TextSVG
                textAnchor="middle"
                x={x1 - 20}
                y={y1 - gapBetweenPoint_yAxix * index}
                fontSize={14}>
                {Math.floor(valueBetweenPoint_yAxix * index)}
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
            onLayout={() => setPathLength(line.current?.getTotalLength())}
            strokeDasharray={pathLength}
            strokeDashoffset={line_Animated}
          />
          {data.map((item, index) => {
            const y = y1 - ((y1 - y3) / max_Data_Value) * item.value;
            if (index === 0) {
              return (
                <G key={index}>
                  <Rect
                    width={40}
                    height={30}
                    x={x1 + gapBetweenPoint_xAxis * index - 20}
                    y={y - 10 - 30}
                    rx={10}
                    ry={10}
                    fill="#fdc603"></Rect>
                  <TextSVG x={x1} y={y - 20} textAnchor="middle">
                    {item.value}
                  </TextSVG>
                </G>
              );
            } else {
              return (
                <G key={index}>
                  <Rect
                    width={40}
                    height={30}
                    x={x1 + gapBetweenPoint_xAxis * index - 20}
                    y={y - 10 - 30}
                    rx={10}
                    ry={10}
                    fill="#fdc603"></Rect>
                  <TextSVG
                    x={x1 + gapBetweenPoint_xAxis * index}
                    y={y - 20}
                    textAnchor="middle">
                    {item.value}
                  </TextSVG>
                </G>
              );
            }
          })}
        </G>
      </Svg>
    </View>
  );
};

export default LineChart;
