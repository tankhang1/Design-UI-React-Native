import {View, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {
  Canvas,
  Group,
  LinearGradient,
  mix,
  Paint,
  Path,
  Rect,
  runSpring,
  runTiming,
  Skia,
  SweepGradient,
  Text,
  useComputedValue,
  useFont,
  useLoop,
  useSpring,
  useTouchHandler,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import Process_Top_Button from './Process_Top_Button';
import Process_Circle from './Process_Circle';
import Row_Text_SlideBar from './Row_Text_SlideBar';
import Bottom_Process from './Bottom_Process';
const {width, height} = Dimensions.get('screen');
const path = Skia.Path.Make();
path.addCircle(193, 247, 85);

const Process_Neumorphism = () => {
  const font = useFont(require('../Font/Roboto-Regular.ttf'), 28);
  const processValue = useValue(0);
  const loop = useLoop({duration: 10000});
  const x = useComputedValue(() => mix(loop.current, 0, 360), [loop]);
  const progress = useComputedValue(() => x.current / 360, [x]);
  const textPath = useComputedValue(
    () => `${Math.floor(progress.current * 101)}° C`,
    [progress],
  );
  const translateY = useValue(70);
  const offsetY = useValue(0);
  const onTouch = useTouchHandler({
    onStart: touch => {
      if (touch.y > 700 && offsetY.current === 0) {
        offsetY.current = translateY.current - touch.y;
      }
    },

    onActive: touch => {
      if (offsetY.current < 0) {
        translateY.current = offsetY.current + touch.y;
      }
    },
    onEnd: touch => {
      if (touch.y > 600) {
        runTiming(translateY, {to: 70}, {duration: 500});
        offsetY.current = 0;
      }
    },
  });
  const transformAnimated = useComputedValue(
    () => [{translateY: translateY.current}],
    [translateY],
  );
  if (font === null) {
    return null;
  }
  return (
    <Canvas
      style={{
        flex: 1,
      }}
      mode="continuous"
      onTouch={onTouch}>
      <Rect x={0} y={0} width={width} height={height}>
        <LinearGradient
          colors={['#2A2D32', '#131313']}
          start={vec(0, 0)}
          end={vec(width, height)}
        />
      </Rect>
      {/*Top */}
      <Group>
        <Process_Top_Button
          x={10}
          y={15}
          size={32}
          pathSrc={
            'M0.0297852 8.00684C0.0297852 8.34717 0.154297 8.62939 0.428223 8.89502L6.81982 15.1455C7.02734 15.3613 7.29297 15.4692 7.6001 15.4692C8.22266 15.4692 8.7207 14.9712 8.7207 14.3486C8.7207 14.0332 8.59619 13.7593 8.37207 13.5352L2.69434 7.99854L8.37207 2.47852C8.59619 2.25439 8.7207 1.97217 8.7207 1.66504C8.7207 1.04248 8.22266 0.552734 7.6001 0.552734C7.28467 0.552734 7.02734 0.652344 6.81982 0.868164L0.428223 7.11865C0.154297 7.38428 0.0380859 7.6665 0.0297852 8.00684Z'
          }
          transX={Number(25)}
        />
        <Text
          text="Climate"
          x={width / 2 - 45}
          y={47 + 6}
          font={font}
          color="white"
        />
        <Process_Top_Button
          x={width - 32 * 2 - 10}
          y={15}
          size={32}
          pathSrc={
            'M9.15332 19.1128H10.8467C11.5688 19.1128 12.1416 18.6646 12.3076 17.9756L12.6313 16.5728L12.814 16.5063L14.0342 17.2534C14.6484 17.6353 15.3706 17.5356 15.877 17.021L17.0474 15.8589C17.562 15.3359 17.6533 14.6221 17.2715 14.0161L16.5161 12.8042L16.5825 12.6299L17.9771 12.2979C18.666 12.1318 19.1143 11.5591 19.1143 10.8369V9.20996C19.1143 8.49609 18.666 7.91504 17.9771 7.74902L16.5908 7.40869L16.5244 7.22607L17.2798 6.01416C17.6616 5.4165 17.5703 4.70264 17.0474 4.16309L15.8853 3.00098C15.3789 2.49463 14.6567 2.39502 14.0508 2.76855L12.8223 3.51562L12.6313 3.44922L12.3076 2.03809C12.1416 1.34912 11.5688 0.900879 10.8467 0.900879H9.15332C8.43115 0.900879 7.8584 1.34912 7.69238 2.03809L7.36865 3.44922L7.16943 3.51562L5.94922 2.76855C5.34326 2.39502 4.62109 2.49463 4.11475 3.00098L2.94434 4.16309C2.42969 4.70264 2.33838 5.4165 2.72021 6.01416L3.47559 7.22607L3.40918 7.40869L2.02295 7.74902C1.32568 7.92334 0.885742 8.49609 0.885742 9.20996V10.8369C0.885742 11.5591 1.33398 12.1318 2.02295 12.2979L3.41748 12.6299L3.48389 12.8042L2.72852 14.0161C2.34668 14.6221 2.43799 15.3359 2.95264 15.8589L4.12305 17.021C4.62939 17.5356 5.35156 17.6353 5.95752 17.2534L7.18604 16.5063L7.36865 16.5728L7.69238 17.9756C7.8584 18.6646 8.43115 19.1128 9.15332 19.1128ZM9.41895 17.4526C9.27783 17.4526 9.21143 17.3862 9.18652 17.27L8.70508 15.2363C8.15723 15.1118 7.63428 14.896 7.19434 14.6055L5.40967 15.7095C5.31006 15.7759 5.21045 15.7676 5.11084 15.6763L4.29736 14.8628C4.20605 14.7715 4.20605 14.6719 4.27246 14.5723L5.37646 12.7876C5.11914 12.356 4.88672 11.8413 4.77051 11.3018L2.72852 10.8203C2.6123 10.7954 2.5459 10.729 2.5459 10.5879V9.45068C2.5459 9.30957 2.604 9.25146 2.72852 9.21826L4.76221 8.73682C4.88672 8.18066 5.13574 7.64111 5.35986 7.24268L4.26416 5.46631C4.19775 5.3501 4.18945 5.25879 4.28906 5.15918L5.10254 4.3623C5.20215 4.2627 5.29346 4.25439 5.40967 4.3208L7.18604 5.4082C7.57617 5.15918 8.14893 4.91846 8.70508 4.77734L9.18652 2.74365C9.21143 2.62744 9.27783 2.56104 9.41895 2.56104H10.5811C10.7222 2.56104 10.7886 2.62744 10.8135 2.74365L11.3032 4.79395C11.8594 4.91846 12.374 5.15088 12.8057 5.4082L14.582 4.3291C14.6982 4.2627 14.7896 4.271 14.8892 4.3623L15.7026 5.16748C15.8022 5.25879 15.7939 5.3584 15.7275 5.46631L14.6401 7.24268C14.8643 7.64111 15.1133 8.18066 15.2295 8.73682L17.2715 9.21826C17.396 9.25146 17.4541 9.30957 17.4541 9.45068V10.5879C17.4541 10.729 17.3877 10.7954 17.2715 10.8203L15.2295 11.3018C15.105 11.8413 14.8809 12.3643 14.6235 12.7876L15.7192 14.564C15.7856 14.6719 15.7856 14.7632 15.6943 14.8545L14.8809 15.668C14.7812 15.7676 14.6816 15.7676 14.582 15.7012L12.8057 14.6055C12.3574 14.896 11.876 15.1035 11.3032 15.2363L10.8135 17.27C10.7886 17.3945 10.7222 17.4526 10.5811 17.4526H9.41895ZM10 13.1528C11.7266 13.1528 13.1377 11.7417 13.1377 10.0068C13.1377 8.28857 11.7266 6.87744 10 6.87744C8.27344 6.87744 6.854 8.28857 6.854 10.0068C6.854 11.7334 8.27344 13.1528 10 13.1528ZM10 11.6255C9.12012 11.6255 8.38965 10.895 8.38965 10.0068C8.38965 9.13525 9.12012 8.41309 10 8.41309C10.8633 8.41309 11.5938 9.13525 11.5938 10.0068C11.5938 10.8867 10.8633 11.6255 10 11.6255Z'
          }
          transX={Number(20)}
        />
      </Group>
      {/*Middle */}
      <Group>
        <Process_Circle x={width / 2 - 200 / 2} y={150} size={168.2} />
        <Text
          text={textPath}
          x={width / 2 - 38}
          y={260}
          font={font}
          color="white"
        />
        <Group>
          <SweepGradient
            c={vec(45, 45)}
            colors={['#9EECD9', '#4CC6F5', '#66D2EC', '#2FB8FF']}
          />

          <Path
            path={path}
            style="stroke"
            strokeWidth={15}
            strokeCap="round"
            strokeJoin={'round'}
            end={progress}
          />
        </Group>
      </Group>
      {/*Bottom */}
      <Group>
        <Group transform={[{translateY: 0}]}>
          <Row_Text_SlideBar
            text="AC"
            pathIcon="M8.5 17.6064C8.94824 17.6064 9.22217 17.291 9.22217 16.8345V15.1992L10.3594 15.9048C10.708 16.1538 11.0981 16.1289 11.3389 15.7803C11.5298 15.4731 11.4634 15.083 11.0898 14.8589L9.22217 13.7632V12.7588L9.03955 9.95312L11.3887 11.5137L12.252 12.0117L12.2769 14.1699C12.2852 14.6099 12.584 14.8755 12.9492 14.8506C13.3726 14.834 13.5801 14.4937 13.5386 14.0786L13.4971 12.7256L14.9248 13.5557C15.3149 13.7881 15.7217 13.6885 15.9375 13.3066C16.145 12.9248 16.0288 12.5098 15.647 12.2939L14.2275 11.4722L15.4146 10.833C15.7881 10.6587 15.979 10.3101 15.7881 9.93652C15.6138 9.60449 15.2402 9.47998 14.8584 9.6875L12.9741 10.75L12.1108 10.252L9.5708 9.00684L12.1108 7.76172L12.9741 7.25537L14.8584 8.32617C15.2402 8.53369 15.6221 8.40088 15.7881 8.07715C15.979 7.70361 15.7964 7.35498 15.4062 7.17236L14.2275 6.5415L15.647 5.71973C16.0454 5.49561 16.1533 5.09717 15.9375 4.70703C15.73 4.3335 15.3149 4.22559 14.9248 4.45801L13.4971 5.27148L13.5386 3.93506C13.5801 3.51172 13.3726 3.17969 12.9492 3.16309C12.584 3.13818 12.2852 3.40381 12.2769 3.83545L12.252 6.00195L11.3887 6.5L9.03955 8.06055L9.22217 5.25488V4.25049L11.0898 3.15479C11.4634 2.92236 11.5298 2.54053 11.3389 2.2251C11.1064 1.87646 10.708 1.85986 10.3594 2.10889L9.22217 2.81445V1.1709C9.22217 0.714355 8.94824 0.407227 8.5 0.407227C8.06836 0.407227 7.77783 0.722656 7.77783 1.1709V2.81445L6.62402 2.10889C6.27539 1.85986 5.89355 1.87646 5.65283 2.2251C5.45361 2.54053 5.53662 2.92236 5.91016 3.15479L7.77783 4.25049V5.25488L7.96045 8.06885L5.61133 6.5L4.73975 5.99365L4.72314 3.83545C4.71484 3.40381 4.41602 3.13818 4.05078 3.16309C3.62744 3.17969 3.41992 3.51172 3.46143 3.93506L3.50293 5.27148L2.0752 4.45801C1.69336 4.23389 1.27002 4.3335 1.0542 4.70703C0.830078 5.09717 0.962891 5.50391 1.34473 5.71973L2.77246 6.5415L1.58545 7.17236C1.20361 7.35498 1.021 7.69531 1.20361 8.07715C1.36963 8.40918 1.75146 8.53369 2.1416 8.32617L4.01758 7.26367L4.88916 7.76172L7.4292 9.00684L4.88916 10.252L4.01758 10.75L2.1333 9.6875C1.75977 9.47168 1.37793 9.60449 1.22021 9.92822C1.021 10.3184 1.20361 10.6587 1.58545 10.833L2.77246 11.4722L1.35303 12.2939C0.962891 12.5098 0.838379 12.9331 1.0542 13.3066C1.27832 13.6885 1.69336 13.7798 2.0752 13.5557L3.50293 12.7339L3.46143 14.0703C3.41162 14.4937 3.62744 14.834 4.05078 14.8506C4.41602 14.8672 4.71484 14.6016 4.72314 14.1699L4.74805 12.0034L5.61133 11.5137L7.96045 9.95312L7.77783 12.7588V13.7549L5.91016 14.8589C5.53662 15.083 5.46191 15.4731 5.65283 15.7803C5.89355 16.1289 6.27539 16.1538 6.62402 15.9048L7.77783 15.1909V16.8345C7.77783 17.291 8.06836 17.6064 8.5 17.6064Z"
            currentTrack={100}
            transIconX={16}
            transIconY={15}
          />
        </Group>
        <Group transform={[{translateY: 70}]}>
          <Row_Text_SlideBar
            text="Fan"
            pathIcon="M11.5127 17.3218C12.708 16.9565 13.9448 16.7739 15.1235 16.7739C16.6426 16.7739 17.7632 17.0063 19.1992 17.0063C20.7432 17.0063 21.7559 15.9521 21.7559 14.5576C21.7559 13.1382 20.6768 12.1089 19.3154 12.1089C18.3525 12.1089 17.481 12.6982 17.0991 13.52C16.9248 13.8521 16.9995 14.2339 17.3315 14.4248C17.6636 14.6074 18.0703 14.4912 18.2778 14.1011C18.4521 13.7275 18.8589 13.437 19.3154 13.437C19.9463 13.437 20.4277 13.8687 20.4277 14.5576C20.4277 15.2383 19.9463 15.6865 19.1992 15.6865C17.8545 15.6865 16.7007 15.4458 15.1235 15.4458C13.7788 15.4458 12.3926 15.6782 11.1143 16.0601C10.7075 16.1763 10.5249 16.5332 10.6245 16.8984C10.7324 17.2554 11.0728 17.4546 11.5127 17.3218ZM24.5532 21.3726C26.5537 21.3726 27.9731 20.0859 27.9731 18.3096C27.9731 16.5498 26.6284 15.2549 24.9268 15.2549C23.4658 15.2549 22.3037 16.251 22.0215 17.5874C21.9219 17.9858 22.1128 18.3345 22.4697 18.4258C22.835 18.5254 23.2002 18.3179 23.3164 17.8696C23.4741 17.106 24.1465 16.583 24.9268 16.583C25.8896 16.583 26.645 17.2886 26.645 18.3096C26.645 19.3389 25.8232 20.0444 24.5532 20.0444C22.0381 20.0444 19.2656 18.6084 15.9287 18.6084C14.2104 18.6084 12.625 18.874 11.1143 19.3887C10.7075 19.5298 10.5249 19.8784 10.6245 20.2354C10.7324 20.6006 11.0894 20.8081 11.521 20.6587C12.8989 20.1523 14.3184 19.9365 15.9287 19.9365C19.2158 19.9365 21.7061 21.3726 24.5532 21.3726ZM19.2158 27.3657C20.5605 27.3657 21.6064 26.353 21.6064 24.9419C21.6064 22.8999 19.5229 21.771 15.7544 21.771C14.2188 21.771 12.542 22.0615 11.1143 22.543C10.7075 22.6758 10.5249 23.0327 10.6245 23.3896C10.7324 23.7549 11.0894 23.9541 11.521 23.813C12.8325 23.3481 14.2852 23.0991 15.7544 23.0991C18.6763 23.0991 20.2783 23.813 20.2783 24.9419C20.2783 25.6226 19.8135 26.0376 19.2158 26.0376C18.6514 26.0376 18.2944 25.6641 18.1533 25.0664C18.0454 24.7012 17.73 24.4688 17.3315 24.5518C16.9248 24.6348 16.7588 25.0332 16.875 25.4233C17.1157 26.5273 17.9956 27.3657 19.2158 27.3657Z"
            currentTrack={60}
            transIconX={5}
            transIconY={4}
          />
        </Group>

        <Group transform={[{translateY: 140}]}>
          <Row_Text_SlideBar
            text="Heat"
            pathIcon="M3.94678 4.96484C7.74023 4.96484 9.71582 1.82715 13.1274 1.82715C13.9326 1.82715 14.6216 2.00977 15.4351 2.47461C15.8501 2.70703 16.2734 2.57422 16.5059 2.24219C16.7798 1.85205 16.7051 1.2959 16.1655 0.980469C15.2192 0.432617 14.2148 0.166992 13.1274 0.166992C9.29248 0.166992 7.3252 3.29639 3.94678 3.29639C3.1499 3.29639 2.46094 3.12207 1.64746 2.64893C1.22412 2.4165 0.79248 2.55762 0.568359 2.89795C0.302734 3.28809 0.377441 3.84424 0.908691 4.14307C1.85498 4.69092 2.85938 4.96484 3.94678 4.96484ZM14.854 14.959C16.9209 14.959 18.5645 13.3403 18.5645 11.3232C18.5645 10.2109 18.0166 9.11523 17.5518 8.24365L15.6758 4.75732C15.4932 4.41699 15.2109 4.25098 14.854 4.25098C14.4888 4.25098 14.2065 4.41699 14.0239 4.75732L12.1562 8.24365C11.6914 9.11523 11.1436 10.2109 11.1436 11.3232C11.1436 13.3403 12.7954 14.959 14.854 14.959ZM3.95508 9.41406C7.11768 9.41406 9.07666 7.13135 11.708 6.51709C12.04 5.88623 12.3804 5.26367 12.7207 4.63281C9.07666 4.87354 7.23389 7.74561 3.95508 7.74561C3.1582 7.74561 2.46924 7.57129 1.65576 7.09814C1.23242 6.86572 0.800781 7.00684 0.57666 7.34717C0.319336 7.7373 0.394043 8.29346 0.916992 8.59229C1.87158 9.14014 2.86768 9.41406 3.95508 9.41406ZM3.94678 13.8633C6.40381 13.8633 8.12207 12.502 9.98145 11.5972C9.90674 11.0659 9.99805 10.3354 10.1973 9.71289C8.03076 10.6177 6.354 12.2031 3.94678 12.2031C3.1499 12.2031 2.46094 12.0205 1.64746 11.5474C1.22412 11.3149 0.79248 11.4561 0.568359 11.7964C0.302734 12.1865 0.377441 12.7427 0.908691 13.0498C1.85498 13.5977 2.85938 13.8633 3.94678 13.8633Z"
            currentTrack={0}
            transIconX={16}
            transIconY={16}
          />
        </Group>

        <Group transform={[{translateY: 210}]}>
          <Row_Text_SlideBar
            text="Auto"
            pathIcon="M9.5 17.6646C14.2729 17.6646 18.1577 13.7798 18.1577 9.00684C18.1577 4.23389 14.2812 0.349121 9.5083 0.349121C8.94385 0.349121 8.61182 0.681152 8.61182 1.2207V4.17578C8.61182 4.64062 8.93555 4.99756 9.40039 4.99756C9.86523 4.99756 10.189 4.64062 10.189 4.17578V2.25C13.6172 2.59863 16.2485 5.4873 16.2485 9.00684C16.2485 12.7422 13.252 15.7637 9.5 15.7637C5.74805 15.7637 2.73486 12.7422 2.74316 9.00684C2.75146 7.42969 3.29932 5.96045 4.2124 4.81494C4.56934 4.31689 4.63574 3.82715 4.229 3.42041C3.82227 3.03027 3.1748 3.07178 2.75977 3.62793C1.57275 5.10547 0.842285 6.98145 0.842285 9.00684C0.842285 13.7798 4.72705 17.6646 9.5 17.6646ZM10.8364 10.3267C11.542 9.59619 11.4009 8.5752 10.5625 8.01904L6.45361 5.22168C5.90576 4.85645 5.38281 5.37939 5.74805 5.92725L8.53711 10.0361C9.10156 10.8745 10.1143 11.0322 10.8364 10.3267Z"
            currentTrack={160}
            transIconX={16}
            transIconY={16}
          />
        </Group>
      </Group>
      {/*Setting */}
      <Group transform={transformAnimated}>
        <Bottom_Process x={0} y={400} width={width} height={height} />
      </Group>
    </Canvas>
  );
};

export default Process_Neumorphism;