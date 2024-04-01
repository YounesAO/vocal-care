import Colors from "@/constants/Colors";
import { Link, Redirect } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import {Image}from "expo-image";
import { useState } from "react";
export default function Page() {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
          <Image 
            source={require('../assets/uploads/logo.png')}
            style={{
                    width:200,
                    height:200
                  }}
          />
          
          <Text style={styles.title}>Vocal care</Text>
          <Text style={styles.subtitle}>A medical app for detecting voice pathologies ,to get started :</Text>
        </View>
        <Text style={{marginTop:4, fontSize:19,}}>Please read and accept our</Text>
        
        <Link push href="./termes" asChild>
          <Pressable>
            <Text style={{
                            fontSize: 19,
                            color:'#090890',
                            lineHeight:22, 
                            textDecorationLine :"underline"
                            }}>Termes and conditions</Text>
          </Pressable>
        </Link>
        <View style={{display:"flex",flexDirection:"row", marginTop:80}}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#154A3D' : undefined} >
          </Checkbox>
          <Text style={{fontSize:16,paddingLeft:5}}>I have read and accepted the Termes</Text>
        </View>

          <View style={{
                        display:"flex",
                        justifyContent:"center",
                        alignItems:"center", 
                        marginTop:20}}>
          <Link push href="./login" asChild>
            <Pressable disabled ={!isChecked} >
              <View style={{
                            width:300 ,
                            padding:15,
                            backgroundColor:isChecked?"#2AB802":"#D2D2D2",}}>
                <Text style={{color:"#FFF",fontSize:24,fontWeight:"bold",textAlign:"center"}}>Get started</Text>
              </View>
            </Pressable>
          </Link>
          </View>
      </View>
    
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    paddingTop:200,
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
