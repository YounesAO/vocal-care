import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';

interface myProps {
    value: string;
  }
  
  const Question: React.FC<myProps> = (props) => {
    const [isChecked, setChecked] = useState(false);

  return (
    <View style={{display:'flex',flexDirection:"row" ,justifyContent:'flex-start',alignItems:'center'}}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#154A3D' : undefined}
          style={{marginRight:2}} > 
        </Checkbox>
        <Text style={{fontSize: 16,fontWeight:"600",color: "#000000",marginTop:15,marginBottom:15,marginLeft:2}}>{props.value}</Text>
    </View>
  );
}

export default Question;
