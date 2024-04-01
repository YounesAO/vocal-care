import Colors from "@/constants/Colors";
import { Link, Redirect, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {Image}from "expo-image";
import { useState } from "react";
export default function Page() {
    const symptoms = [
        { name: "asy one ?", img:require('../../assets/uploads/image1.png')},
        { name: "asy two ?", img: require('../../assets/uploads/image2.png' )},
        { name: "asy three ?", img: require('../../assets/uploads/image3.png' )},
        { name: "asy three ?", img: require('../../assets/uploads/image4.png' )},
        { name: "asy three ?", img: require('../../assets/uploads/image5.png') },

      ];
      const glob = useGlobalSearchParams();
      const local = useLocalSearchParams();
      var id =Number(local.id)
      const  symptom=symptoms[id];
      console.log("Local:", local.id, "Global:",global);
      const isYes = ()=>{
        id=id+1
        if(id<symptoms.length)
        router.navigate(`/servey/${id}`);
      else 
      router.navigate(`/record`);

      }
        return (
          <>
           <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
              <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Describe your symptoms</Text>
              </View>
          
          <View style={styles.container}>
             
              <View>
              <Text style={{color:"#194A3C",fontWeight:"bold",fontSize:20}}>Do you have {symptom.name}</Text>

              <Image source={symptom.img} style={{height:300,objectFit:"contain"}} />

              </View>
              <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
                <Pressable onPress={isYes} >
                <View style={{width:260 ,padding:15,backgroundColor:"#2AB802"}}>
                    <Text style={{color:"#FFF",fontSize:24,fontWeight:"bold",textAlign:"center"}}>YES</Text>
                </View>
                </Pressable>
            
            </View>

          <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
            <Pressable onPress={isYes}>
              <View style={{width:260 ,padding:15,backgroundColor:"#F04343", borderWidth:2,borderColor:"#F04343"}}>
                <Text style={{color:"#fff",fontSize:24,fontWeight:"bold",textAlign:"center"}}>NO</Text>
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
