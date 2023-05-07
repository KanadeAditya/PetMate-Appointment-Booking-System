console.log("add pet page")


import baseUrl from "./baseUrl.js";


document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("heelo")
    const new_pet = {
        Name:document.getElementById("Name").value,
        Type:document.getElementById("type").value,
         Breed:document.getElementById("breed").value,
        Owner_Name:document.getElementById("Owner_Name").value,
        Weight:document.getElementById("weight").value,
        DOB:document.getElementById("dob").value
    }

    console.log(new_pet)
    // addpet(new_pet)
})

let token=localStorage.getItem("token")

async function addpet(new_pet) {
    try {
        const res = await fetch(`${baseUrl}pets/addpets`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            "Authorization":token
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