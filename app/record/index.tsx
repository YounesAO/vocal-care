import { cloneElement, useEffect, useState } from 'react';
import { View, StyleSheet,Pressable, Button, Text, Image } from 'react-native';
import { Audio } from 'expo-av';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { FontAwesome6 } from '@expo/vector-icons';
import { Sound } from 'expo-av/build/Audio';

export default function App() {
  const [uri, setUri] = useState("");
  const [duration, setDuration] = useState(0);
  const [timer, setTimer] = useState(0);
  const [record, setRecord] = useState(false);
  const [sound, setSound] = useState();
  const [recording, setRecording] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();


  useEffect(() => {

    console.log()
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1); // Increment timer by 1 every 1000ms
    }, 1000);

    // Cleanup function to clear the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  const pickAudio = async () => {
      try {
          const result = await DocumentPicker.getDocumentAsync({ type: 'audio/*', copyToCacheDirectory: false });
      
          if (!result.canceled) {
              // Handle the selected audio file here
              console.log('Selected audio file:', result.assets[0].size);
              setUri(result.assets[0].uri)
            } else {
              console.log('Document picking cancelled',result);
          }
          } catch (error) {
          console.log('Error picking document:', error);
          }
      };
  async function startRecording() {
    setTimer(0)

    try {
      if ( permissionResponse && permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY);
      setRecording(recording);
      setRecord(true)
      console.log('Recording started');
      
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }
  async function stopRecording() {
    setDuration(timer)
    setTimer(0)
    console.log('Stopping recording..');
    
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri,'here ' );
    if(uri)
    setUri(uri);
    setRecording(null);
    setRecord(false)
    
  }
  

  async function playRecording() {
      try {
        const { sound } = await Audio.Sound.createAsync({ uri });
        await sound.playAsync();
        setSound(sound)
      } catch (error) {
        console.error('Failed to play recording', error);
      }
    };
  
  const stopSound = async () => {
    try {
      console.log('Stopping sound');
      await sound.stopAsync();
      setSound(new Sound())
    } catch (err) {
      console.error('Failed to stop sound', err);
    }
  };
  
  
  return (
    <>
      <View  style={{display:"flex", justifyContent:"center",alignItems:"center",backgroundColor:"#194A3C",borderWidth:1,width:"100%",height:80}}>
        <Text style={{color:"#ffffff",fontWeight:"bold",fontSize:20}}>Voice test sample</Text>
      </View>
    <View style={styles.container}>
      <View style={{display:"flex", flexDirection:'row',alignItems:"center",justifyContent:"center" ,padding:15,borderWidth:1,width:"100%",borderRadius:10,borderColor:"#154A3D"}}>
      {recording==null ? ((uri=="")?(<StartBare action={startRecording}></StartBare>):(<PlayBare action={playRecording} count={duration} deleteUri={()=>{setUri('')}} stopS={stopSound} soundState={sound}></PlayBare>)):
      (<StopBare action={stopRecording} count={timer}></StopBare>      )}
      </View>
      <View style={{display:'flex',alignItems:'center',width:"100%"}}>
        <Text style={{fontSize:20}}>Or</Text>
      </View>
      <View style={{display:"flex", flexDirection:'row',alignItems:"center",justifyContent:"center" ,marginTop:10,padding:15,borderWidth:1,width:"100%",borderRadius:10,borderColor:"#154A3D"}}>
        
        <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,backgroundColor:"#194A3C",width:50,height:50,borderRadius:50}}>
          <FontAwesome6 name="file-audio" size={24} color="white" onPress={pickAudio} />  
        </View>
        <View style={{marginLeft:10,width:"80%"}}>
          <Text style={{fontSize:24,fontWeight:'bold',color:"#194A3C"}}>Upload existing file</Text>
        </View>
        
      </View>
      <View style={{ display:(uri)?"flex":"none", flexDirection: "row", justifyContent: "flex-end", marginTop: 20, width: "100%" }}>
            <Pressable onPress={()=> {
                            router.navigate("/result");
            }}>
              <View style={{ width: 120, padding: 10, backgroundColor: "#2AB802", borderRadius: 5 }}>
                <Text style={{ color: "#ffffff", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Next {">"}</Text>
              </View>
            </Pressable>
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

interface StartBareProps {
  action: () => Promise<void>;
}

const StartBare: React.FC<StartBareProps> = ({ action }) => {

return(
  <>
  <View style={{width:"90%"}}>
      <Text style={{fontSize:24,fontWeight:'bold',color:"#194A3C"}}>Press to record</Text>
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,backgroundColor:"#194A3C",width:50,height:50,borderRadius:50}}>
      <FontAwesome6 name="microphone" size={24} color="white" onPress={action} />  
    </View>
  </>
)
}
interface StopBareProps {
  action: () => Promise<void>;
 
  count:number
}

const StopBare: React.FC<StopBareProps> = ({ action,count }) => {

return(
  <>
  <View style={{width:"90%"}}>
      <Text style={{fontSize:24,fontWeight:'bold',color:"#194A3C"}}>00:{count}</Text>
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,backgroundColor:"#800101",width:50,height:50,borderRadius:50}}>
      <FontAwesome6 name="stop" size={24} color="white" onPress={action} />  
    </View>
  </>
)
}
interface PlayBareProps {
  action: () => Promise<void>;
  deleteUri: () => void;
  count:number;
  stopS:()=> Promise<void>;
  soundState:Sound;
}

const PlayBare: React.FC<PlayBareProps> = ({ action,deleteUri,count,stopS,soundState }) => {
  const [play, setPlay] = useState(false);
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (play && timer > 0) {
        setTimer((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(interval); // Stop the timer when it reaches 0
      }
    }, 1000); // Update every second

    // Stop the timer after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, count * 1000);
    if(timer==0){
      setPlay(false)
    }
    return () => clearInterval(interval); // Clean up the interval when the component unmounts
  }, [timer]);


  const playAudio =()=>{
    setTimer(count)
    setPlay(true)
    
    action()
  }
  const stopAudio =()=>{
    setTimer(0)
    setPlay(false)
    stopS()
  }
return(
  <>
  <View style={{width:"70%"}}>
      <Text style={{fontSize:20,fontWeight:'bold',color:"#194A3C"}}>Saved Audio : {play?"playing":""}------- 00:{play?timer:count}</Text>
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,backgroundColor:"#194A3C",width:50,height:50,borderRadius:50,marginRight:10}}>
      {!play?(
      <FontAwesome6 name="play" size={24} color="white" onPress={playAudio} />  
    ):(
      <FontAwesome6 name="pause" size={24} color="orange" onPress={stopAudio} />  

    )}
    </View>
    <View style={{display:'flex',justifyContent:'center',alignItems:'center',padding:5,backgroundColor:"#800101",borderColor:"#D4D4D4",borderWidth:2,width:50,height:50,borderRadius:50}}>
      <FontAwesome6 name="trash" size={24} color="white" onPress={deleteUri} />  
    </View>
  </>
)
}