import { baseUrl } from "./baseUrl.js";


let docsCont = document.getElementById("pets_details");


let token = localStorage.getItem("token")
getdata();
// renderdata(pets_arr);

async function getdata() {
    try {
        const res = await fetch(baseUrl + `pets/allpets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
            },

        });
        let data = await res.json();


        renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}



function renderdata(arr) {
    docsCont.innerHTML = "";
    docsCont.innerHTML = arr.map((elem) => {
        return `
        <div class=doc-card>
            <div class="top-cont">
                <div class="doc-profile">

                    <div class="doc-desc">
                        <h2>Name :${elem.name}</h2>
                        <h4>Type: ${elem.type}</h4>
                        <p>Breed: ${elem.breed}</p>
                        <h4>Owner Name: ${elem.Owner_Name}</h4>
                       
                        <p>Weight:${elem.weight.value}</p>
                        <p>DOB:${new Date(elem.DoB).getDate()}-${new Date(elem.DoB).getMonth()}-${new Date(elem.DoB).getFullYear()}</p>
                      
                      
                        
                   </div>
                </div>


                
                <div class="doc-book">
                    <div class="select-app">
                        <form data-id=${elem._id} >
                            <div>
                                <label>Vaccination  Date:</label>
                                <input type="date" id="datepicker" placeholder="Enter Date" required />
                                </div>
                                <div>
                                <label>Vaccination  Name:</label>
                                <input type="text" id="vaccinationname" placeholder="Enter name" required />
                                </div>
                                <div>
                                <label>Vaccination Status :</label>
                                <select id="status" required="true" name="status">
                                    <option value="yes">YES</option>
                                    <option value="no">No</option>

                                </select>
                            </div>
                            <input type="submit" value="Update vaccination status"/>
                           
                        </form>

                       
                       
                        <button data-petid=${elem._id} class="asd">Medical History </button>

                        
                        <button class="asd" id="update-button">Update</button>

<div id="update-form" class="hidden">
  <form>
    <label for="item-name">Item Name:</label>
    <input type="text" id="pet_weight" name="pet_weight" required><br>

    

    <button type="submit">Save Changes</button>
    <button type="button" id="cancel-button">Cancel</button>
  </form>
</div>

                    </div>
                </div>
            </div>
        </div>
        `
    }).join("");


    let medical_histroy_btns = document.getElementsByClassName("asd")

    for (let btn of medical_histroy_btns) {
        btn.addEventListener("click", async (e) => {
            let res = await fetch(baseUrl + `pets/medhistory/` + e.target.dataset.petid, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            })
            let data = await res.json()
            showMedicalHistoryOfPets(data.medicalHistory)
        })
    }





    document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();

        let date = document.getElementById("datepicker").value
        let vaccinationstatus = document.getElementById("status").value
        let vaccinationname = document.getElementById("vaccinationname").value

        let update_data = {
            date, vaccinationstatus, vaccinationname
        }
        let petid = e.target.dataset.id

        localStorage.setItem("petid", petid)
        updatevaccination(update_data)
        // console.log(elem._id)
    })

    const updateButton = document.getElementById('update-button');
    const updateForm = document.getElementById('update-form');
    const cancelButton = document.getElementById('cancel-button');

    updateButton.addEventListener('click', () => {
        updateForm.classList.remove('hidden');
    });

    cancelButton.addEventListener('click', () => {
        updateForm.classList.add('hidden');
    });

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateForm.classList.add('hidden');
    });



    const popupButton = document.getElementById('popup-button');
    const popupContent = document.getElementById('popup-content');
    const closeButton = document.getElementById('close-button');

    popupButton.addEventListener('click', () => {
        popupContent.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        popupContent.style.display = 'none';
    });




}




// dummy data

// let data= [{"Medical_history": {
//     "doctorID": "6456a551dc3dfb68f298a752",
//     "type": "cough",
//     "prescriptions": "paracitamol",
//     "symptoms": "runnig nose",
//     "Diagnosis": "hot water"
//   }},
// {      "Medical_history": {
//     "doctorID": "6456a551dc3dfb68f298a752",
//     "type": "cough",
//     "prescriptions": "paracitamol",
//     "symptoms": "runnig nose",
//     "Diagnosis": "hot water"
//   }},
// {  "Medical_history": {
//     "doctorID": "6456a551dc3dfb68f298a752",
//     "type": "cough",
//     "prescriptions": "paracitamol",
//     "symptoms": "runnig nose",
//     "Diagnosis": "hot water"
//   }}]

//    document.getElementById("temp").addEventListener("click",()=>showMedicalHistoryOfPets(data))
function showMedicalHistoryOfPets(data) {
    console.log(data[0].Medical_history)

    let table= `<table class="styled-table">
    <thead>
        <tr>
            <th>Type</th>
            <th>Prescriptions</th>
            <th>Symptoms</th>
            <th>Diagnosis</th>
        </tr>
        <tbody>${data.map((e)=>{
              return `<tr class="active-row">
                         <td>${e.Medical_history.type}</td>
                         <td>${e.Medical_history.prescriptions}</td>
                         <td>${e.Medical_history.symptoms}</td>
                         <td>${e.Medical_history.Diagnosis}</td>
                     </tr>`
        }).join(" ")}</tbody>
    </thead>
</table>`;

Swal.fire({
    html: table,
    confirmButtonText: 'Close'
  });

}









let id = localStorage.getItem("petid")



async function updatevaccination(update_date) {
    try {
        const res = await fetch(`${baseURL}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDU2OTg5YWU2Yjg5ZjdjMzExMDAxZmQiLCJzdGF0dXMiOnRydWUsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTY4MzUzMDYxMywiZXhwIjoxNjgzNjE3MDEzfQ.oUFZmelsorLH8X_m6S2hdC_Sx5C8w6eKAL2vh2n3Vus"
            },
            body: JSON.stringify(update_date)

        });
        let data = await res.json();
    } catch (error) {
        console.log(error.message);
    }
}





let addpets = document.getElementById("addpets")

addpets.addEventListener("click", () => {
    window.open("./addpet.html");
})

