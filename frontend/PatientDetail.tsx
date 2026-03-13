import React,{useEffect,useState} from "react"
import {ScrollView,Text,TextInput,TouchableOpacity,StyleSheet,View} from "react-native"
import {Picker} from "@react-native-picker/picker"
import api from "./api"

export default function PatientDetail({patient}:any){

const [provider,setProvider] = useState("")
const [datetime,setDatetime] = useState("")

const [medication,setMedication] = useState("")
const [dosage,setDosage] = useState("")
const [quantity,setQuantity] = useState("")
const [refill,setRefill] = useState("")

const [medications,setMedications] = useState([])
const [dosages,setDosages] = useState([])

const [appointments,setAppointments] = useState([])
const [prescriptions,setPrescriptions] = useState([])

/* NEW: states for editing patient */
const [name,setName] = useState(patient.name)
const [email,setEmail] = useState(patient.email)
const [password,setPassword] = useState(patient.password)

useEffect(()=>{
load()
},[])

const load = async ()=>{

const m = await api.get("/medications")
const d = await api.get("/medications/dosages")

setMedications(m.data)
setDosages(d.data)

const a = await api.get(`/appointments/${patient.id}`)
const p = await api.get(`/prescriptions/${patient.id}`)

setAppointments(a.data)
setPrescriptions(p.data)

}

const createAppointment = async ()=>{

await api.post("/appointments",{
patientId: patient.id,
provider,
datetime,
repeat:"weekly"
})

alert("Appointment Created")

load()

}

const createPrescription = async ()=>{

await api.post("/prescriptions",{
patientId: patient.id,
medication,
dosage,
quantity,
refill_on: refill,
refill_schedule:"monthly"
})

alert("Prescription Created")

load()

}

/* NEW: update patient */

const updatePatient = async ()=>{

if(!name || !email || !password){
 alert("All fields required")
 return
}

await api.put(`/patients/${patient.id}`,{
 name,
 email,
 password
})

alert("Patient Updated")

}

/* delete operations */

const deleteAppointment = async(id:number)=>{

await api.delete(`/appointments/${id}`)

alert("Appointment deleted")

load()

}

const deletePrescription = async(id:number)=>{

await api.delete(`/prescriptions/${id}`)

alert("Prescription deleted")

load()

}

return(

<ScrollView style={styles.container}>

<Text style={styles.pageTitle}>{patient.name}</Text>

{/* EDIT PATIENT */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>Edit Patient</Text>

<Text style={styles.label}>Name</Text>
<TextInput
style={styles.input}
value={name}
onChangeText={setName}
/>

<Text style={styles.label}>Email</Text>
<TextInput
style={styles.input}
value={email}
onChangeText={setEmail}
/>

<Text style={styles.label}>Password</Text>
<TextInput
style={styles.input}
value={password}
onChangeText={setPassword}
/>

<TouchableOpacity style={styles.button} onPress={updatePatient}>
<Text style={styles.buttonText}>Update Patient</Text>
</TouchableOpacity>

</View>

{/* CREATE APPOINTMENT */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>Create Appointment</Text>

<Text style={styles.label}>Provider</Text>
<TextInput
style={styles.input}
placeholder="Enter doctor name"
value={provider}
onChangeText={setProvider}
/>

<Text style={styles.label}>Date & Time</Text>
<TextInput
style={styles.input}
placeholder="YYYY-MM-DD"
value={datetime}
onChangeText={setDatetime}
/>

<TouchableOpacity style={styles.button} onPress={createAppointment}>
<Text style={styles.buttonText}>Add Appointment</Text>
</TouchableOpacity>

</View>

{/* APPOINTMENT LIST */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>Appointments</Text>

{appointments.map((a:any)=>(
<View key={a.id} style={styles.listItem}>

<View>
<Text>{a.provider}</Text>
<Text>{new Date(a.datetime).toLocaleString()}</Text>
</View>

<TouchableOpacity
style={styles.deleteBtn}
onPress={()=>deleteAppointment(a.id)}
>
<Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>

</View>
))}

</View>

{/* CREATE PRESCRIPTION */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>Create Prescription</Text>

<Text style={styles.label}>Medication</Text>
<View style={styles.pickerBox}>
<Picker
selectedValue={medication}
onValueChange={setMedication}
>

{medications.map((m:any)=>(
<Picker.Item key={m.id} label={m.name} value={m.name}/>
))}

</Picker>
</View>

<Text style={styles.label}>Dosage</Text>
<View style={styles.pickerBox}>
<Picker
selectedValue={dosage}
onValueChange={setDosage}
>

{dosages.map((d:any)=>(
<Picker.Item key={d.id} label={d.value} value={d.value}/>
))}

</Picker>
</View>

<Text style={styles.label}>Quantity</Text>
<TextInput
style={styles.input}
placeholder="Enter quantity"
value={quantity}
onChangeText={setQuantity}
/>

<Text style={styles.label}>Refill Date</Text>
<TextInput
style={styles.input}
placeholder="YYYY-MM-DD"
value={refill}
onChangeText={setRefill}
/>

<TouchableOpacity style={styles.button} onPress={createPrescription}>
<Text style={styles.buttonText}>Add Prescription</Text>
</TouchableOpacity>

</View>

{/* PRESCRIPTION LIST */}

<View style={styles.card}>

<Text style={styles.sectionTitle}>Prescriptions</Text>

{prescriptions.map((p:any)=>(
<View key={p.id} style={styles.listItem}>

<View>
<Text>{p.medication}</Text>
<Text>{p.dosage}</Text>
</View>

<TouchableOpacity
style={styles.deleteBtn}
onPress={()=>deletePrescription(p.id)}
>
<Text style={styles.deleteText}>Delete</Text>
</TouchableOpacity>

</View>
))}

</View>

</ScrollView>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
backgroundColor:"#f4f6f8",
padding:20
},

pageTitle:{
fontSize:26,
fontWeight:"bold",
marginBottom:20
},

card:{
backgroundColor:"#fff",
padding:20,
borderRadius:10,
marginBottom:25,
shadowColor:"#000",
shadowOpacity:0.05,
shadowRadius:6
},

sectionTitle:{
fontSize:18,
fontWeight:"600",
marginBottom:15
},

label:{
fontSize:14,
fontWeight:"500",
marginBottom:6,
marginTop:10
},

input:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
padding:12,
backgroundColor:"#fafafa"
},

pickerBox:{
borderWidth:1,
borderColor:"#ddd",
borderRadius:8,
backgroundColor:"#fafafa"
},

button:{
marginTop:20,
backgroundColor:"#2f80ed",
padding:14,
borderRadius:8,
alignItems:"center"
},

buttonText:{
color:"#fff",
fontWeight:"600",
fontSize:16
},

listItem:{
flexDirection:"row",
justifyContent:"space-between",
alignItems:"center",
paddingVertical:10,
borderBottomWidth:1,
borderColor:"#eee"
},

deleteBtn:{
backgroundColor:"#e74c3c",
paddingVertical:6,
paddingHorizontal:12,
borderRadius:6
},

deleteText:{
color:"#fff",
fontWeight:"600"
}

})