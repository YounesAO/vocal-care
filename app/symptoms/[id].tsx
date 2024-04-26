import Colors from "@/constants/Colors";
import { Link, Redirect, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {Image}from "expo-image";
import { useEffect, useState } from "react";
import Question from "./Question";
interface Symptom {
  _id: {
    $oid: string;
  };
  key: number;
  label: string;
  data: {
    name: string;
    description: string;
  }[];
}
export default function Page() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]); // Initialize symptoms state

  const [isChecked, setChecked] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const handleSymptomSelection = (symptomName:string) => {
    const index = selectedSymptoms.indexOf(symptomName);
    if (index === -1) {
      setSelectedSymptoms([...selectedSymptoms, symptomName]);
    } else {
      const updatedSymptoms = [...selectedSymptoms];
      updatedSymptoms.splice(index, 1);
      setSelectedSymptoms(updatedSymptoms);
    }
    console.log(selectedSymptoms)
  };
  
  const local = useLocalSearchParams();
  var id =local.id;
  console.log("retrived",id)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://192.168.45.1:5000/symptoms');
          const jsonData = await response.json();
          setSymptoms(jsonData.symptom); // Update symptoms state with fetched data
          
          console.log(symptoms)
          
        } catch (error) {
          // Handle any errors
          alert('Error fetching data:');
        }
      };
  
      // Call the fetchData function when the component is mounted
      fetchData();
      return () => {
        // Cleanup code
      };
    }, []);
















      const next = async () => {
        var data =[]
        if(isChecked){
          data =["no Symtoms"]
        }else{
          data = selectedSymptoms;
        }
        if(data.length==0){
          alert("Please describe your symptoms or choose no symptoms")
        }

        try {
          const response = await fetch('http://192.168.45.1:5000/scan', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({"user":id,"data": data }),  
          });
      
          if (response.ok) {
            // Data sent successfully
            console.log('Data sent successfully');
            router.navigate("/record")
          } else {
            // Handle error
            alert('Failed to send data:');
          }
        } catch (error) {
          // Handle network or other errors
          alert('Error sending data');
        }
      


      }
        return (
          <ScrollView>
            <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
              <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Describe your symptoms</Text>
            </View>
          
            <View  style={styles.container}>
            <View style={{width:"100%"}}>
                  <Text style={{color:"#194A3C",fontWeight:"bold",fontSize:20}}>No symptoms</Text>
                  <View style={{display:'flex',flexDirection:"row" ,justifyContent:'flex-start',alignItems:'center'}}>
                      <Checkbox
                        value={isChecked}
                        onValueChange={setChecked}
                        color={isChecked ? '#154A3D' : undefined}
                        style={{marginRight:2,width:20,height:20}} > 
                      </Checkbox>
                      <View style={{display:"flex"}}>
                        <Text style={{fontSize: 16,fontWeight:"600",color: "#000000",marginTop:15,marginBottom:0,marginLeft:3}}>None</Text>
                        <Text style={{fontSize: 12,fontWeight:"600",color: "#000000",marginTop:0,marginBottom:15,marginLeft:4}}>I don't have symptoms</Text>
                      </View>
                  </View>
                </View>
                <View style={{display:isChecked ?"none": "flex"}}>
                { symptoms.map((categorie, index) => (
                  <View style={{width:"100%"}}>
                    <Text style={{color:"#194A3C",fontWeight:"bold",fontSize:20}}>{categorie.key+" - "+categorie.label}</Text>
                    {categorie.data.map((item, index) => (
                    <Question 
                    name={item.name} 
                    key={item.name} 
                    description={item.description}
                    selectedSymptoms={selectedSymptoms} // Pass down selectedSymptoms as prop
                    handleSymptomSelection={handleSymptomSelection}
                    ></Question>
                    ))}
                  </View>
                ))}
              
                </View>
              <View style={{display:"flex",flexDirection:"row",justifyContent:"flex-end", marginTop:20,width:"100%"}}>
                <Pressable onPress={next}>
                  <View style={{width:120 ,padding:10,backgroundColor:"#2AB802", borderRadius:5}}>
                    <Text style={{color:"#ffffff",fontSize:20,fontWeight:"bold",textAlign:"center"}}>Next {">"}</Text>
                  </View>
                </Pressable>
                
              </View> 
            </View>
          </ScrollView>
        );
      };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
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
