async function getAttendance(){

let id=document.getElementById("id").value
let pass=document.getElementById("pass").value

let result=document.getElementById("result")
let subjects=document.getElementById("subjects")

result.innerHTML="Irunga Bhai..."
subjects.innerHTML=""

try{

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

result.innerHTML=
`Attendance: ${percent}% <br>
Last Updated: Today`

let table=`
<table>
<tr>
<th>Course Code</th>
<th>Subject</th>
<th>Attendance</th>
<th>Status</th>
</tr>
`

data.subjects.forEach(s=>{

let total=parseInt(s.total)
let present=parseInt(s.present)

let percent=((present/total)*100).toFixed(2)

let status=""

if(present/total < 0.75){

let attend=Math.ceil((0.75*total-present)/(1-0.75))

status=`Attend ${attend} classes`

}else{

let bunk=Math.floor((present-0.75*total)/0.75)

status=`Bunk ${bunk} classes`

}

table+=`
<tr>
<td>${s.course}</td>
<td>${s.name}</td>
<td>${percent}%</td>
<td>${status}</td>
</tr>
`

})

table+="</table>"

subjects.innerHTML=table

}catch(err){

result.innerHTML="Server error or backend sleeping (Render cold start). Try again."

}

}
