async function getAttendance(){

let id=document.getElementById("id").value
let pass=document.getElementById("pass").value

let result=document.getElementById("result")
let subjects=document.getElementById("subjects")
let bunkSection=document.getElementById("bunkSection")

result.innerHTML="Irunga bhai..."
subjects.innerHTML=""
bunkSection.innerHTML=""

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
Last Updated: ${data.updated}`

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
let bunkHTML=""

if(present/total < 0.75){

let attend=Math.ceil((0.75*total-present)/(1-0.75))

status=`📚 Attend ${attend} classes`

bunkHTML+=`
<div class="bunkCard">
<h3>${s.name}</h3>
<p>${percent}%</p>
<p>📚 Attend ${attend}</p>
<img src="https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif">
</div>
`

}else{

let bunk=Math.floor((present-0.75*total)/0.75)

status=`😎 Bunk ${bunk} classes`

bunkHTML+=`
<div class="bunkCard">
<h3>${s.name}</h3>
<p>${percent}%</p>
<p>😎 Bunk ${bunk}</p>
<img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif">
</div>
`

}

table+=`
<tr>
<td>${s.course}</td>
<td>${s.name}</td>
<td>${percent}%</td>
<td>${status}</td>
</tr>
`

bunkSection.innerHTML+=bunkHTML

})

table+="</table>"

subjects.innerHTML=table

}catch(err){

result.innerHTML="Backend starting (Render cold start). Try again."

}

}
