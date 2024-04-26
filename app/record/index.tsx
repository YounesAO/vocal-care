import { cloneElement, useEffect, useState } from 'react';
import { View, StyleSheet,Pressable, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let intervalId;
    if (recording) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
      setTimer(0);
    }
    return () => clearInterval(intervalId);
  }, [recording]);
    const pickAudio = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*', copyToCacheDirectory: false });
        
            if (result.type === 'success') {
                // Handle the selected audio file here
                console.log('Selected audio file:', result);
                // You can upload the file to a server, process it, etc.
            } else {
                console.log('Document picking cancelled',result);
            }
            } catch (error) {
            console.log('Error picking document:', error);
            }
            router.navigate("/result");
        };
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }else{
        alert("permissionnot granted")
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    router.navigate("/result");
  }

  return (
    <>
      <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
        <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Voice test sample</Text>
      </View>
    <View style={styles.container}>
          
        <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        
        <Text style={styles.title}>Record a vocal test </Text>
        <Text style={styles.subtitle}>You can either record or import existing audio file  
        </Text>
        </View>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <View style={{}} >
            <Pressable 
                    onPress={recording ? stopRecording : startRecording}>
              <View style={{width:150,height:150,display:"flex",justifyContent:'center',alignItems:'center' ,padding:10,borderRadius:100,backgroundColor:recording ?"red":"#2AB802"}}>
                <Text style={{color:"#ffffff",fontSize:14,fontWeight:"bold",textAlign:"center"}}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
              </View>
            </Pressable>
            </View>
            <View>
            {recording && <Text style={styles.timer}>Recording time: {timer} seconds</Text>}
            </View>
            <View style={{display:'flex',justifyContent:'center',alignItems:'center' ,width:"100%"}}><Text>or</Text></View>
            <View style={{ width:100,margin:10}} >
                <Button title="Pick Audio" onPress={pickAudio} />
            </View>
        </View>
    </View>




   
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color:"#154A3D",

  },
  subtitle: {
    fontSize:20,
    color: "#38434D",
  },timer: {
    fontSize: 16,
    color: "black",
    marginTop: 10,
  }
});
