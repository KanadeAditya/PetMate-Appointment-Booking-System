import {baseUrl} from "./baseUrl.js";

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usersDetail = {
        name: document.querySelector(".name").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value
    }

    // console.log(usersDetail)

    // fetch(baseUrl+"customers/emailVerify",{
    //     method:"POST",
    //     headers:{'Content-Type': 'application/json'},
    //     body:JSON.stringify(usersDetail)
    // })
    // .then((res)=>res.json())
    // .then((res)=>{
        
    // })

    fetch(baseUrl+`customers/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersDetail)
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.msg === "Customer Registered successfully") {
                Swal.fire({
                    icon: 'success',
                    title: res.msg,
                    willClose: () => {
                        window.open("login.html")
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



let OauthDoc=document.getElementById("google")
OauthDoc.addEventListener("click",(e)=>{
   
   
   
        // window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/auth/google?UPRN=${UPRN.value}`
        fetch(`https://salmon-coral-gear.cyclic.app/doctor/check?type=signup&UPRN=""&from=customer`).then(res=>res.json())
        .then(data=>data.isExist ? alert("doctor is already exist please login") : window.location.href=`https://salmon-coral-gear.cyclic.app/doctor/auth/google?type=signup&from=customer`  )

        // window.location.href=`http://localhost:4500/doctor/check?type=signup&UPRN=${UPRN.value}` 
    
    
})