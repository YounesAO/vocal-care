    import Colors from "@/constants/Colors";
    import { Link, Redirect, router } from "expo-router";
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
            
            <Text style={styles.title}>Take a test </Text>
            <Text style={styles.subtitle}>In this test you need to describe your symptoms and record a sample of your voice
            </Text>
            </View>
            <Text style={{marginTop:4, fontSize:19,}}>Please read and accept our 
            </Text>
        </View>
            <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
                <Link replace href="./servey" asChild>
                    <Pressable >
                    <View style={{width:260 ,padding:15,backgroundColor:"#2AB802"}}>
                        <Text style={{color:"#FFF",fontSize:24,fontWeight:"bold",textAlign:"center"}}>Start the test</Text>
                    </View>
                    </Pressable>
                </Link>
                </View>


            <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
                <Pressable onPress={router.back}>
                <View style={{width:260 ,padding:15,backgroundColor:"#F04343", borderWidth:2,borderColor:"#F04343"}}>
                    <Text style={{color:"#fff",fontSize:24,fontWeight:"bold",textAlign:"center"}}>Go back</Text>
                </View>
                </Pressable>
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
        paddingTop:60,
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
