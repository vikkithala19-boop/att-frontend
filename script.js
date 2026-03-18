async function getAttendance(){

let id=document.getElementById("id").value
let pass=document.getElementById("pass").value

let result=document.getElementById("result")
let subjects=document.getElementById("subjects")
let bunkSection=document.getElementById("bunkSection")

result.innerHTML="⏳ Loading bro..."
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
result.innerHTML="❌ "+data.error
return
}

let percent=data.attendance

result.innerHTML=
`📊 <b>Attendance:</b> ${percent}% <br>
📅 <b>Last Updated:</b> ${data.updated}`


// TABLE
let table=`
<table>
<tr>
<th>Code</th>
<th>Subject</th>
<th>%</th>
<th>Status</th>
</tr>
`

data.subjects.forEach(s=>{

let total=parseInt(s.total)
let present=parseInt(s.present)

let percent=((present/total)*100).toFixed(2)

let status=""
let cls=""
let bunkHTML=""

if(present/total < 0.75){

let attend=Math.ceil((0.75*total-present)/(1-0.75))

status=`📚 Attend ${attend}`
cls="bad"

bunkHTML+=`
<div class="bunkCard">
<h3>${s.name}</h3>
<p>📊 ${percent}%</p>
<p class="bad">📚 Attend ${attend}</p>
<img src="https://c.tenor.com/Xct9xIPBqsMAAAAC/tenor.gif">
</div>
`

}else{

let bunk=Math.floor((present-0.75*total)/0.75)

status=`😎 Bunk ${bunk}`
cls="good"

bunkHTML+=`
<div class="bunkCard">
<h3>${s.name}</h3>
<p>📊 ${percent}%</p>
<p class="good">😎 Bunk ${bunk}</p>
<img src="https://c.tenor.com/KfYF3hN9UfkAAAAC/tenor.gif">
</div>
`

}

table+=`
<tr>
<td>${s.course}</td>
<td>${s.name}</td>
<td>${percent}%</td>
<td class="${cls}">${status}</td>
</tr>
`

bunkSection.innerHTML+=bunkHTML

})

table+="</table>"

subjects.innerHTML=table

}catch(err){

result.innerHTML="⚠️ Backend waking up... try again 😴"

}

}
