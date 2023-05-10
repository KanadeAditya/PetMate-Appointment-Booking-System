import {baseUrl} from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        name: document.querySelector(".name").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value,
        UPRN: document.querySelector(".uprn").value
    }

    // console.log(usersDetail)

    fetch(baseUrl+`doctors/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg === "Doctor Registered successfully") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    willClose: () => {
                        window.open("doctorLogin.html")
                      }
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.msg
                })
            }
        })
})

let OauthDoc=document.getElementById("OauthDoc")
OauthDoc.addEventListener("click",(e)=>{
    let UPRN=document.querySelector(".uprn")
    // alert(UPRN.value)
   
        // window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/auth/google?UPRN=${UPRN.value}`
        fetch(`https://salmon-coral-gear.cyclic.app/doctor/check?type=signup&UPRN=${UPRN.value}&from=doctor`).then(res=>res.json())
        .then(data=>data.isExist ? alert("doctor is already exist please login") : window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/auth/google?type=signup&UPRN=${UPRN.value}&from=doctor`  )

        // window.location.href=`http://localhost:4500/doctor/check?type=signup&UPRN=${UPRN.value}` 
    
    
})