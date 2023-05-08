import {View, Text} from 'react-native';
import React from 'react';
import {
  Canvas,
  Path,
  useCanvasRef,
  useComputedValue,
  useValue,
} from '@shopify/react-native-skia';
{
  /*Canvas dùng style của view nhưng chỉ có một số thuộc tính như:
    - flex
    - backgroundColor
    - margin,
    - border
    - width
    - height
    - alignSeft


    ref : giống như trong ref của view ,... dùng để làm tên đại diện khi muốn gọi bên ngoài
    mode : Có 2 dạng "default" và "continuous".
    onTouch: giống với onPress trong cách touch của RN
    onSize:  giống như onLayout khi giá trị height vs width thay đổi nó sẽ cập nhật lại
*/
}
const CanvasUI = () => {
  const refCanvas = useCanvasRef();
  const size = useValue({width: 0, height: 0});
  const rct = useComputedValue(() => {
    console.log(size);
  }, [size]);
  return (
    <Canvas
      ref={refCanvas}
      onSize={size}
      mode="continuous"
      style={{
        flex: 1,
        backgroundColor: 'green',
        marginTop: 20,
        marginLeft: 20,
        borderWidth: 5,
        //alignSelf: 'center',
      }}>
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color="lightblue"
      />
    </Canvas>
  );
};

export default CanvasUI;
