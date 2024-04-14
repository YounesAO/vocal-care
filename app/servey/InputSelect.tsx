import React from 'react';
import { View, Text, TextInput } from 'react-native';
import {Picker} from '@react-native-picker/picker';

interface myProps {
    label: string;
    data: string[];
  }
  
  const InputSelect: React.FC<myProps> = (props) => {
  return (
   <View>
    <Text style={{fontSize: 24,fontWeight:"600",color: "#194A3C",marginTop:5,marginBottom:5,}}> {props.label}</Text>
   <View style={{borderWidth:2,borderColor:"#194A3C", borderRadius:5,}}>
     
   <Picker style={{borderWidth:2,borderColor:"#194A3C", borderRadius:5, width:"100%",height:40,fontSize:20,padding:5}}>
        {props.data.map((item, index) => (
            <Picker.Item value={index} label={item}/>
        ))}
    </Picker>  
   </View>
</View>
  );
}

export default InputSelect;
