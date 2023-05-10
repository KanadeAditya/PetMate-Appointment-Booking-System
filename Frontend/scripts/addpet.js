console.log("add pet page")


// import baseUrl from "./baseUrl.js";


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("heelo")
    const new_pet = {
        name:document.getElementById("Name").value,
        type:document.getElementById("type").value,
         breed:document.getElementById("breed").value,
        Owner_Name:document.getElementById("Owner_Name").value,
        weight:{date:new Date(Date.now()),value:document.getElementById("weight").value},
        DoB:document.getElementById("dob").value,
       
    }

    console.log(new_pet)
    addpet(new_pet)
})

let token=localStorage.getItem("token")

async function addpet(new_pet) {
    try {
        const res = await fetch(`http://localhost:1010/pets/add`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify(new_pet)
            
        });
        let data = await res.json();
        // data = data.doctor;
        alert(data.msg)
        // renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}