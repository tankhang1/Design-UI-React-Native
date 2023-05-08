import React from 'react';
import {Canvas, Circle, Paint, Path, vec} from '@shopify/react-native-skia';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
{
  /*thẻ Paint là dùng để vẽ các hình trong rn skia như circle, rect,... 
    Các thuộc tính của Pain
    color: là màu background của style dạng fill và màu của stroke nếu style dạng stroke
    blendMode: là màu mặc định của rn skia
    style: chia làm 2 dạng fill và stroke
    strokeWidth: kích thước của stroke
    strokeJoin:
  */
}
const PaintingUI = () => {
  const c = vec(width / 2, height / 2);
  const strokeWidth = 10;
  const r = (width - strokeWidth * 2) / 2;
  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      {/*Độ ưu tiên của thuộc tính bên trong Paint cao hơn thuộc tính của thẻ bọc nó bên ngoài (như là ghi đè) tức là nào khai báo sau sẽ đc lấy giá trị*/}
      <Circle c={c} r={r} color="hsl(198,86%,80%)">
        <Paint color={'red'} />
        <Paint color={'blue'} style="stroke" strokeWidth={20} />
        <Paint color={'yellow'} style="stroke" strokeWidth={10} />
      </Circle>

      <Path
        path={'M 50 20 h 20 v 10 z'}
        strokeJoin="bevel"
        style={'stroke'}
        strokeWidth={5}
        transform={[{scale: 5}]}
      />

      <Path
        path={'M 20 20 h 150'}
        style="stroke"
        strokeWidth={10}
        strokeCap="square"
      />
    </Canvas>
  );
};

export default PaintingUI;
