import { cloneElement, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
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
    <View style={styles.container}>
         <View style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        
        <Text style={styles.title}>Record a vocal test </Text>
        <Text style={styles.subtitle}>You can either record or import existing audio file  
        </Text>
        </View>
        <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <View style={{ width:100,margin:10}} >
                <Button 
                    title={recording ? 'Stop Recording' : 'Start Recording'}
                    onPress={recording ? stopRecording : startRecording}
                />
            </View>
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
  },
});
