import {View, Text} from 'react-native';
import React from 'react';

const Table = ({
  tableHeader = [],
  tableTitle = [],
  tableData = [],
  width = 400,
  height = 300,
  borderColor = 'grey',
}) => {
  const tmp = tableData[0].push(tableHeader);
  console.log(tmp);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width,
          height,
          backgroundColor: borderColor,
        }}>
        {}
      </View>
    </View>
  );
};

export default Table;
