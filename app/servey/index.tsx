import Colors from "@/constants/Colors";
import { Link, Redirect, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Image}from "expo-image";
import { useState } from "react";
import InputField from "./InputField";
import InputSelect from "./InputSelect";
import InputDate from "./InputDate";
export default function Page() {
  const next = ()=>{
    router.navigate(`/symptoms/0`)
  }
        return (
          <>
          <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
              <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Fill the Form</Text>
              </View>
          
          <View style={styles.container}>
            <View style={{width:"100%"}}>
              <InputField  label="UserName" placeholder="Enter your name"/>
              <InputSelect label="Gender" data ={["Select your gender","Male","Female"]}></InputSelect>
              <InputDate label="Brith Date"></InputDate>
              <InputSelect label="Occupation" data ={["Teacher","Professor"]}></InputSelect>
              <InputSelect label="Country/Region" data ={["Select you Country","Morocco","Monaco"]}></InputSelect>
            </View>
              
          <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
            <Pressable onPress={next}>
              <View style={{width:260 ,padding:15,backgroundColor:"#2AB802"}}>
                <Text style={{color:"#ffffff",fontSize:24,fontWeight:"bold",textAlign:"center"}}>Submit</Text>
              </View>
            </Pressable>
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
