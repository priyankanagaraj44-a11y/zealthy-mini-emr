import React,{useEffect,useState} from "react"
import {ScrollView,Text,TouchableOpacity,TextInput,Button,StyleSheet} from "react-native"
import api from "./api"
import {theme} from "./theme"
import PatientDetail from "./PatientDetail"

export type Patient={
 id:number
 name:string
 email:string
 password:string
}

export default function AdminHome(){

 const [patients,setPatients] = useState<Patient[]>([])
 const [selected,setSelected] = useState<Patient | null>(null)

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 useEffect(()=>{
  load()
 },[])

 const load = async ()=>{
  const res = await api.get("/patients")
  setPatients(res.data)
 }

 const createPatient = async ()=>{

  if(!name || !email || !password){
   alert("All fields are required")
   return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(!emailRegex.test(email)){
   alert("Invalid email format")
   return
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/

  if(!passwordRegex.test(password)){
   alert("Password must be at least 6 characters and include a number")
   return
  }

  await api.post("/patients",{name,email,password})

  setName("")
  setEmail("")
  setPassword("")

  load()

 }

 if(selected){
  return <PatientDetail patient={selected}/>
 }

 return(

 <ScrollView style={styles.container}>

 <Text style={styles.title}>Admin Dashboard</Text>

 <Text style={styles.section}>Create Patient</Text>

 <TextInput
 placeholder="Name"
 style={styles.input}
 value={name}
 onChangeText={setName}
 />

 <TextInput
 placeholder="Email"
 style={styles.input}
 value={email}
 onChangeText={setEmail}
 />

 <TextInput
 placeholder="Password"
 style={styles.input}
 value={password}
 onChangeText={setPassword}
 />

 <Button title="ADD PATIENT" onPress={createPatient}/>

 <Text style={styles.section}>Patients</Text>

 {patients.map(p=>(
  <TouchableOpacity
   key={p.id}
   style={styles.card}
   onPress={()=>setSelected(p)}
  >
   <Text>{p.name}</Text>
   <Text>{p.email}</Text>
  </TouchableOpacity>
 ))}

 </ScrollView>

 )

}

const styles = StyleSheet.create({

 container:{
  flex:1,
  backgroundColor:theme.background,
  padding:20
 },

 title:{
  fontSize:26,
  marginBottom:20
 },

 section:{
  marginTop:20,
  marginBottom:10,
  fontSize:18
 },

 input:{
  borderWidth:1,
  borderColor:"#ccc",
  padding:10,
  marginBottom:10,
  borderRadius:6,
  backgroundColor:"#fff"
 },

 card:{
  backgroundColor:"#fff",
  padding:15,
  borderRadius:10,
  marginBottom:10
 }

})