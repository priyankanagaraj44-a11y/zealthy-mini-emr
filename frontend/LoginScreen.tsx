import React,{useState} from "react"
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native"
import api from "./api"

type Props={
 setUser:(user:any)=>void
}

export default function LoginScreen({setUser}:Props){

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const login = async()=>{

  try{

   const res = await api.post("/auth/login",{
    email,
    password
   })

   setUser(res.data)

  }catch(e){
   alert("Login failed")
  }

 }

 return(

 <View style={styles.container}>

  <View style={styles.card}>

   <Text style={styles.title}>Zealthy EMR</Text>
   <Text style={styles.subtitle}>Patient Portal</Text>

   <Text style={styles.label}>Email</Text>
   <TextInput
    placeholder="Enter your email"
    style={styles.input}
    onChangeText={setEmail}
   />

   <Text style={styles.label}>Password</Text>
   <TextInput
    placeholder="Enter your password"
    secureTextEntry
    style={styles.input}
    onChangeText={setPassword}
   />

   <TouchableOpacity style={styles.button} onPress={login}>
    <Text style={styles.buttonText}>Login</Text>
   </TouchableOpacity>

  </View>

 </View>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  justifyContent:"center",
  alignItems:"center",
  backgroundColor:"#0f172a",
  padding:20
 },

 card:{
  width:"100%",
  maxWidth:420,
  backgroundColor:"#ffffff",
  padding:35,
  borderRadius:14,

  shadowColor:"#000",
  shadowOpacity:0.25,
  shadowRadius:15,
  shadowOffset:{width:0,height:6},

  elevation:8
 },

 title:{
  fontSize:30,
  fontWeight:"bold",
  textAlign:"center",
  color:"#1e293b"
 },

 subtitle:{
  textAlign:"center",
  marginBottom:25,
  color:"#64748b",
  fontSize:16
 },

 label:{
  fontSize:14,
  fontWeight:"600",
  marginBottom:6,
  marginTop:12,
  color:"#334155"
 },

 input:{
  borderWidth:1,
  borderColor:"#e2e8f0",
  padding:14,
  borderRadius:8,
  backgroundColor:"#f8fafc"
 },

 button:{
  marginTop:25,
  backgroundColor:"#2563eb",
  padding:15,
  borderRadius:10,
  alignItems:"center"
 },

 buttonText:{
  color:"#fff",
  fontWeight:"600",
  fontSize:16
 }

})