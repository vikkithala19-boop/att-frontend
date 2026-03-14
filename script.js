async function getAttendance(){

document.getElementById("result").innerHTML="Checking attendance..."

let id=document.getElementById("id").value
let pass=document.getElementById("pass").value

let res=await fetch("https://att-backend-lzzv.onrender.com/attendance",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
id:id,
password:pass
})
})

let data=await res.json()

let attended=parseInt(data.attended)
let total=parseInt(data.total)

let percent=(attended/total)*100

document.getElementById("progress").style.width=percent+"%"

if(percent>=75){

let bunk=Math.floor((attended/0.75)-total)

document.getElementById("result").innerHTML=
`
Attendance: ${percent.toFixed(2)}% <br>
You can bunk: ${bunk} classes
`

}else{

let need=0

while((attended+need)/(total+need)<0.75){
need++
}

document.getElementById("result").innerHTML=
`
Attendance: ${percent.toFixed(2)}% <br>
You must attend ${need} classes to reach 75%
`

}

}
