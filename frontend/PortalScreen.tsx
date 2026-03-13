import React,{useEffect,useState} from "react"
import {ScrollView,Text,View,StyleSheet} from "react-native"
import api from "./api"

export default function PortalScreen({user}:any){

const [appointments,setAppointments]=useState([])
const [prescriptions,setPrescriptions]=useState([])
const [refills,setRefills]=useState([])

useEffect(()=>{
load()
},[])

const load = async ()=>{

const a = await api.get(`/appointments/${user.id}`)
const p = await api.get(`/prescriptions/${user.id}`)
const r = await api.get(`/prescriptions/refills/${user.id}`)

setAppointments(a.data)
setPrescriptions(p.data)
setRefills(r.data)

}

return(

<ScrollView style={styles.container}>

{/* HEADER */}
<View style={styles.header}>
<Text style={styles.welcome}>Welcome</Text>
<Text style={styles.name}>{user.name}</Text>
</View>


{/* APPOINTMENTS */}

<Text style={styles.section}>Upcoming Appointments</Text>

{appointments.length===0 && <Text style={styles.empty}>No upcoming appointments</Text>}

{appointments.map((a:any)=>(
<View key={a.id} style={styles.card}>

<View style={styles.badge}>
<Text style={styles.badgeText}>DR</Text>
</View>

<View style={{flex:1}}>
<Text style={styles.provider}>{a.provider}</Text>
<Text style={styles.date}>
{new Date(a.datetime).toLocaleString()}
</Text>
</View>

</View>
))}



{/* PRESCRIPTIONS */}

<Text style={styles.section}>Prescriptions</Text>

{prescriptions.length===0 && <Text style={styles.empty}>No prescriptions</Text>}

{prescriptions.map((p:any)=>(
<View key={p.id} style={styles.card}>

<View style={styles.medBadge}>
<Text style={styles.medBadgeText}>Rx</Text>
</View>

<View style={{flex:1}}>
<Text style={styles.medication}>{p.medication}</Text>
<Text style={styles.dosage}>{p.dosage}</Text>
</View>

</View>
))}



{/* REFILL ALERTS */}

<Text style={styles.section}>Refill Alerts</Text>

{refills.length===0 && <Text style={styles.empty}>No refill alerts</Text>}

{refills.map((r:any)=>(
<View key={r.id} style={styles.alertCard}>

<View style={styles.alertBadge}>
<Text style={styles.alertBadgeText}>!</Text>
</View>

<View style={{flex:1}}>
<Text style={styles.medication}>{r.medication}</Text>
<Text style={styles.alertText}>
Refill on {new Date(r.refill_on).toLocaleDateString()}
</Text>
</View>

</View>
))}

</ScrollView>

)

}

const styles = StyleSheet.create({

container:{
flex:1,
padding:20,
backgroundColor:"#f1f5f9"
},

header:{
marginBottom:10
},

welcome:{
fontSize:16,
color:"#64748b"
},

name:{
fontSize:28,
fontWeight:"bold",
color:"#1e293b"
},

section:{
fontSize:18,
fontWeight:"600",
marginTop:25,
marginBottom:12,
color:"#334155"
},

card:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff",
padding:16,
borderRadius:12,
marginBottom:12,

shadowColor:"#000",
shadowOpacity:0.08,
shadowRadius:8,
shadowOffset:{width:0,height:3},

elevation:3
},

alertCard:{
flexDirection:"row",
alignItems:"center",
backgroundColor:"#fff7ed",
padding:16,
borderRadius:12,
marginBottom:12
},

badge:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#2563eb",
alignItems:"center",
justifyContent:"center",
marginRight:12
},

badgeText:{
color:"#fff",
fontWeight:"bold"
},

medBadge:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#16a34a",
alignItems:"center",
justifyContent:"center",
marginRight:12
},

medBadgeText:{
color:"#fff",
fontWeight:"bold"
},

alertBadge:{
width:40,
height:40,
borderRadius:20,
backgroundColor:"#f59e0b",
alignItems:"center",
justifyContent:"center",
marginRight:12
},

alertBadgeText:{
color:"#fff",
fontWeight:"bold"
},

provider:{
fontSize:16,
fontWeight:"600",
color:"#1e293b"
},

date:{
marginTop:4,
color:"#64748b"
},

medication:{
fontSize:16,
fontWeight:"600",
color:"#1e293b"
},

dosage:{
marginTop:4,
color:"#64748b"
},

alertText:{
marginTop:4,
color:"#d97706",
fontWeight:"500"
},

empty:{
color:"#94a3b8",
marginBottom:10
}

})