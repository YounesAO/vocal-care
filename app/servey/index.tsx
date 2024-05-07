import Colors from "@/constants/Colors";
import { Link, Redirect, router, useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import Checkbox from 'expo-checkbox';
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import InputSelect from "./InputSelect";
export default function Page() {

  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [occupation, setOccupation] = useState('');
  const [countryRegion, setCountryRegion] = useState('');
  
  const [genderError, setGenderError] = useState(false);
  const [ageError, setAgeError] = useState(false);
  const [occupationError, setOccupationError] = useState(false);
  const [countryRegionError, setCountryRegionError] = useState(false);

  
  const validateField = (value: string) => {
    return value !== null && value !== "" && !value.startsWith("select");
};
  const handleSubmit = async () => {


    const data = {
      gender,
      age,
      occupation,
      countryRegion,
    }

   
     router.push(`/symptoms/0`,); // Remove the braces in params

    setGenderError(!validateField(data.gender));
    setAgeError(!validateField(data.age));
    setOccupationError(!validateField(data.occupation));
    setCountryRegionError(!validateField(data.countryRegion));
    if (!(
      data.gender !== null && data.gender !== "" && !data.gender.startsWith("select") &&
      data.age !== null && data.age !== "" && !data.age.toString().startsWith("select") &&
      data.occupation !== null && data.occupation !== "" && !data.occupation.startsWith("select") &&
      data.countryRegion !== null && data.countryRegion !== "" && !data.countryRegion.startsWith("select")
  )) {
      alert('One or more fields are not selected');
  } else {
    
    
    try {
        const response = await fetch('http://192.168.138.1:5000/meta_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
          const responseData = await response.json();
          if (responseData.user) {
            const user_id = responseData.user
              console.log('Inserted ID:', responseData.user);

              router.navigate(`/symptoms/${user_id}`)
          }  

        } else {
            alert('Failed to submit data');
        }
    } catch (error) {
      alert('Error:de connexion au serveur');
    }
  }
};

        return (
          <>
          <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
              <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Fill the Form</Text>
              </View>
          
          <View style={styles.container}>
            <View style={{width:"100%"}}>
              <InputSelect 
                value={gender}
                onChange={setGender}
                label="Gender" 
                data ={["Select your gender","Male","Female"]}
                error ={genderError}/>
              <InputSelect 
                value={age}
                onChange={setAge}
                label="Age" 
                data ={["Select your age",
                        "Under 20",
                        "20-29",
                        "30-39",
                        "40-49",
                        "50-59",
                        "60-69",
                        "70-79",
                        "80-89",
                        "90 or older"]}
                error = {ageError}/>
              <InputSelect 
                value={occupation}
                onChange={setOccupation}
                label="Occupation" 
                data ={["Select your occupation", 
                  "Information Technology (IT)",
                  "Healthcare",
                  "Finance",
                  "Education",
                  "Engineering",
                  "Business and Management",
                  "Science",
                  "Media and Communication",
                  "Legal",
                  "Arts and Design",
                  "Hospitality and Tourism",
                  "Social Services",
                  "Government and Public Administration",
                  "Manufacturing and Production",
                  "Agriculture and Forestry",
                  "Other"]}
                error = {occupationError}/>
              <InputSelect 
              value={countryRegion}
              onChange={setCountryRegion}
                label="Region" 
                data ={["Select your Region",
                  "Tanger-Tétouan-Al Hoceïma",
                  "L'Oriental",
                  "Fès-Meknès",
                  "Rabat-Salé-Kénitra",
                  "Béni Mellal-Khénifra",
                  "Casablanca-Settat",
                  "Marrakech-Safi",
                  "Drâa-Tafilalet",
                  "Souss-Massa",
                  "Guelmim-Oued Noun",
                  "Laâyoune-Sakia El Hamra",
                  "Dakhla-Oued Ed-Dahab"
              ]}
                error ={countryRegionError} />
            </View>
              
          <View style={{display:"flex",justifyContent:"center",alignItems:"center", marginTop:20}}>
            <Pressable onPress={handleSubmit}>
              <View style={{width:260 ,padding:15,backgroundColor:"#2AB802",borderRadius:15}}>
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
