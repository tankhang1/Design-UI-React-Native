import React from 'react';
import {
  BackdropBlur,
  Blur,
  Box,
  FitBox,
  Group,
  LinearGradient,
  Paint,
  Path,
  rect,
  rrect,
  vec,
  Text,
  useFont,
  Skia,
} from '@shopify/react-native-skia';

const Bottom_Process = ({x, y, width, height}) => {
  const border = rrect(rect(0, 250, width, height), 40, 40);
  const container = rrect(rect(2, 252, width - 4, height), 0, 0);

  const font = useFont(require('../Font/Roboto-Regular.ttf'), 18);
  if (font === null) {
    return null;
  }
  return (
    <FitBox src={rect(0, 0, width, height)} dst={rect(x, y, width, height)}>
      <BackdropBlur
        blur={5}
        clip={{x: 0, y: 250, width: width, height: height}}>
        <Box box={border} style="stroke">
          <LinearGradient
            colors={['#FFFFFF', 'rgba(0,0,0,0)']}
            start={vec(width / 2, 250)}
            end={vec(width / 2, 250 + 148)}
          />
        </Box>

        <Box box={container} color="rgba(36,38,46,0.44)"></Box>
        {/*Top */}
        <Group transform={[{translateY: 280}]}>
          <LinearGradient
            colors={['#2FB8FF', '#9EECD9']}
            start={vec(0, 0)}
            end={vec(15, 15)}
          />
          <Group transform={[{translateX: 30}]}>
            <Path
              path={
                'M10.5 10.8516C10.9688 10.8516 11.291 10.5098 11.291 10.0215V1.25195C11.291 0.753906 10.9688 0.421875 10.5 0.421875C10.0312 0.421875 9.71875 0.753906 9.71875 1.25195V10.0215C9.71875 10.5098 10.0312 10.8516 10.5 10.8516ZM10.5 20.9102C15.9492 20.9102 20.4609 16.3887 20.4609 10.9492C20.4609 7.95117 19.0938 5.35352 17.2188 3.64453C16.3594 2.86328 15.2559 4.02539 16.1055 4.83594C17.7656 6.34961 18.791 8.51758 18.8008 10.9492C18.8105 15.5586 15.1094 19.25 10.5 19.25C5.89062 19.25 2.20898 15.5586 2.20898 10.9492C2.21875 8.49805 3.24414 6.33984 4.89453 4.82617C5.75391 4.00586 4.64062 2.85352 3.78125 3.63477C1.89648 5.34375 0.539062 7.95117 0.539062 10.9492C0.539062 16.3887 5.06055 20.9102 10.5 20.9102Z'
              }
              style="stroke"
              strokeWidth={1}
              strokeCap="round"
              strokeJoin={'round'}
            />
          </Group>
          {/*Middle */}
          <Group transform={[{translateX: width / 2 - 20}]}>
            {/*Left */}
            <Group transform={[{translateX: -30}]} color="white">
              <Path
                path={
                  'M0.0898438 6.41699C0.0898438 6.57568 0.146973 6.71533 0.267578 6.83594L5.30127 11.7554C5.40918 11.8696 5.54883 11.9268 5.71387 11.9268C6.04395 11.9268 6.29785 11.6792 6.29785 11.3491C6.29785 11.1841 6.22803 11.0444 6.12646 10.9365L1.50537 6.41699L6.12646 1.89746C6.22803 1.78955 6.29785 1.64355 6.29785 1.48486C6.29785 1.15479 6.04395 0.907227 5.71387 0.907227C5.54883 0.907227 5.40918 0.964355 5.30127 1.07227L0.267578 5.99805C0.146973 6.1123 0.0898438 6.2583 0.0898438 6.41699Z'
                }
                style="fill"
                strokeWidth={1}
                strokeCap="round"
                strokeJoin={'round'}
              />
            </Group>
            <Group>
              <Text text={'20 C'} y={15} font={font} color="white" />
            </Group>
            <Group transform={[{translateX: 60}]} color="white">
              <Path
                path={
                  'M6.9165 6.41699C6.9165 6.2583 6.85303 6.1123 6.73242 5.99805L1.70508 1.07227C1.59082 0.964355 1.45117 0.907227 1.28613 0.907227C0.962402 0.907227 0.708496 1.15479 0.708496 1.48486C0.708496 1.64355 0.771973 1.78955 0.873535 1.89746L5.49463 6.41699L0.873535 10.9365C0.771973 11.0444 0.708496 11.1841 0.708496 11.3491C0.708496 11.6792 0.962402 11.9268 1.28613 11.9268C1.45117 11.9268 1.59082 11.8696 1.70508 11.7554L6.73242 6.83594C6.85303 6.71533 6.9165 6.57568 6.9165 6.41699Z'
                }
                style="fill"
                strokeWidth={1}
                strokeCap="round"
                strokeJoin={'round'}
              />
            </Group>
          </Group>
          <Group
            transform={[{translateX: width - 45}]}
            color="rgb(186,186,186)">
            <Path
              path={
                'M10.3802 0C9.89037 0 9.41757 0.179757 9.05147 0.505181L0.671272 7.95425C0.244295 8.33378 0 8.87779 0 9.44907V10.75V12.5V20C0 21.1046 0.895431 22 2 22H19C20.1046 22 21 21.1046 21 20V12.5V7.25V2C21 0.895431 20.1046 0 19 0H10.3802ZM10.3802 2H19V6.25H10.355C9.8957 6.25 9.45036 6.40811 9.09385 6.69777L5.62332 9.51758L2 9.69875V9.44907L10.3802 2ZM2 13.5H19V20H2V13.5Z'
              }
              style="stroke"
              strokeWidth={1}
              strokeCap="round"
              strokeJoin={'round'}
            />
          </Group>
        </Group>
      </BackdropBlur>

      {/*Icon Off */}
    </FitBox>
  );
};

export default Bottom_Process;
