import Colors from "@/constants/Colors";
import { Link, Redirect, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Image}from "expo-image";
import { useState } from "react";
import Question from "./Question";

export default function Page() {
    const symptoms = [
      {key :1,label:"Changes in Voice Quality :",data: [
      "Hoarseness or Raspy Voice: Rough, breathy, or strained voice quality.",
      "Voice Fatigue: Tiredness or weakness of voice during or after speaking.",
      "Voice Breaks: Sudden or uncontrollable changes in pitch or volume.",
      "Reduced Vocal Range: Difficulty reaching high or low notes.",
      "Tremor or Shaking in Voice: Uncontrolled trembling or shakiness in the voice."
    ]
    },
    {key:2 ,label:"Voice Functionality",data:[
      "Difficulty Speaking Loudly: Inability to project voice or speak at a normal volume.",
      "Difficulty Speaking Softly: Inability to speak softly or whisper.",
      "Vocal Effort: Excessive effort required to produce speech.",
      "Vocal Strain: Feeling of strain or tension in the throat while speaking.",
      "Breathiness: Excessive air leakage during speech, resulting in a weak or airy voice."
    ]},{key:3,label:"Pain or Discomfort",data:[
      "Sore Throat: Pain or discomfort in the throat, especially during or after speaking.",
      "Throat Clearing: Frequent need to clear the throat due to irritation or discomfort.",
      "Neck Pain: Pain or stiffness in the neck muscles, especially after speaking.",
      "Ear Pain: Pain or discomfort in the ears, often associated with vocal strain."
    ]}
      ];
      const local = useLocalSearchParams();
      var id =Number(local.id)
      const  symptom=symptoms[id];
      const next = ()=>{
        id=id+1
        if(id<symptoms.length)
          router.navigate(`/symptoms/${id}`);
        else 
        router.navigate(`/record`);
      }
        return (
          <>
            <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
              <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Describe your symptoms</Text>
            </View>
          
          <View style={styles.container}>
            <View style={{width:"100%"}}>
            <Text style={{color:"#194A3C",fontWeight:"bold",fontSize:20}}>{symptoms[id].key+" - "+symptoms[id].label}</Text>
            {symptoms[id].data.map((item, index) => (
            <Question value={item} ></Question>
            ))}
              
          <View style={{display:"flex",justifyContent:"flex-end",alignItems:"flex-end", marginTop:20}}>
            <Pressable onPress={next}>
              <View style={{width:100 ,padding:15,backgroundColor:"#2AB802", borderRadius:5}}>
                <Text style={{color:"#ffffff",fontSize:24,fontWeight:"bold",textAlign:"center"}}>Next {">"} </Text>
              </View>
            </Pressable>
          </View> 
          </View>
          </View>
          </>
        );
      };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    borderWidth:1,
  },
  main: {
    flex: 1,
    paddingTop:"60%",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color:"#154A3D",

  },
  subtitle: {
    fontSize:20,
    color: "#38434D",
  },
});
