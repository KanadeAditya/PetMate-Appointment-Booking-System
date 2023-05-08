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
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDU2OTg5YWU2Yjg5ZjdjMzExMDAxZmQiLCJzdGF0dXMiOnRydWUsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTY4MzUzMDYxMywiZXhwIjoxNjgzNjE3MDEzfQ.oUFZmelsorLH8X_m6S2hdC_Sx5C8w6eKAL2vh2n3Vus"
        },
        body: JSON.stringify(new_pet)
            
        });
        let data = await res.json();
        // data = data.doctor;
        console.log(data);
        // renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}