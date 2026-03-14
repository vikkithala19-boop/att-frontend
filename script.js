async function getAttendance(){

let id=document.getElementById("id").value
let pass=document.getElementById("pass").value

let result=document.getElementById("result")
let subjects=document.getElementById("subjects")

result.innerHTML="Loading..."

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

if(data.error){
result.innerHTML=data.error
return
}

let percent=data.attendance

let total=100
let attended=(percent/100)*total

if(percent>=75){

let bunk=Math.floor(attended/0.75-total)

result.innerHTML=
`Attendance: ${percent}% <br>
You can bunk ${bunk} classes`

}else{

let need=0

while((attended+need)/(total+need)<0.75){
need++
}

result.innerHTML=
`Attendance: ${percent}% <br>
You must attend ${need} classes to reach 75%`
}

let table="<table><tr><th>Course</th><th>Attendance</th></tr>"

data.subjects.forEach(s=>{
table+=`<tr><td>${s.course}</td><td>${s.percent}%</td></tr>`
})

table+="</table>"

subjects.innerHTML=table

}
