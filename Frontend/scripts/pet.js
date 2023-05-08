// import {baseURL} from "./baseURL.js";

console.log("doctors detail page")
let docsCont=document.getElementById("pets_details");


let pets_arr=[
    {
        "name":"cat",
        "type":"aaa",
        "breed":"rtrrf",
        "owner_name":"dfghfgh",
        "weight":45,
        "dob":43,
        "vaccination_data":46,
        "vaccination_name":"vacname",
        "medical_histroy":"medicalhistory"
    }
]
console.log(pets_arr)

// http://localhost:1010/pets/allpets
// `${baseURL}/pets/allpets`

let token=localStorage.getItem("token")
getdata();
// renderdata(pets_arr);

async function getdata() {
    try {
        const res = await fetch(`http://localhost:1010/pets/allpets`,{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDU2OTg5YWU2Yjg5ZjdjMzExMDAxZmQiLCJzdGF0dXMiOnRydWUsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTY4MzUzMDYxMywiZXhwIjoxNjgzNjE3MDEzfQ.oUFZmelsorLH8X_m6S2hdC_Sx5C8w6eKAL2vh2n3Vus"
         },
            
        });
        let data = await res.json();
       
        console.log(data);
    
        renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}



function renderdata(arr) {
    docsCont.innerHTML="";
    docsCont.innerHTML=arr.map((elem)=>{
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

                       
                       
                        <button class="asd" id="popup-button">Medical History </button>
                        <div class="popup" id="popup-content">
                            <p>DoctorsID: </p>
                            <p>type: </p>
                            <p>prescriptions: </p>
                            <p>symptoms</p>
                            
                            <p>Diagnosis</p>
                            <button id="close-button">Close</button>
                        </div>

                        
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

    

       document.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault();
        console.log("heelo")
        let date=document.getElementById("datepicker").value
        let vaccinationstatus=document.getElementById("status").value
        let vaccinationname=document.getElementById("vaccinationname").value
        console.log(date,vaccinationstatus,vaccinationname)
        let update_data={
            date,vaccinationstatus,vaccinationname
        }
        let petid=e.target.dataset.id
        console.log(e.target.dataset.id,petid)
        localStorage.setItem("petid",petid)
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







let id=localStorage.getItem("petid")
console.log(id)


async function updatevaccination(update_date) {
    try {
        const res = await fetch(`${baseURL}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json',
            "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NDU2OTg5YWU2Yjg5ZjdjMzExMDAxZmQiLCJzdGF0dXMiOnRydWUsInJvbGUiOiJjdXN0b21lciIsImVtYWlsIjoicmFtQGdtYWlsLmNvbSIsImlhdCI6MTY4MzUzMDYxMywiZXhwIjoxNjgzNjE3MDEzfQ.oUFZmelsorLH8X_m6S2hdC_Sx5C8w6eKAL2vh2n3Vus"
        },
        body: JSON.stringify(update_date)
            
        });
        let data = await res.json();
        // data = data.doctor;
        console.log(data);
        // renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}


// const updateButton = document.getElementById('update-button');
// const updateForm = document.getElementById('update-form');
// const cancelButton = document.getElementById('cancel-button');

// updateButton.addEventListener('click', () => {
//   updateForm.classList.remove('hidden');
// });

// cancelButton.addEventListener('click', () => {
//   updateForm.classList.add('hidden');
// });

// updateForm.addEventListener('submit', (event) => {
//   event.preventDefault();
//   // code to update cart details
//   updateForm.classList.add('hidden');
// });



// const popupButton = document.getElementById('popup-button');
// 		const popupContent = document.getElementById('popup-content');
// 		const closeButton = document.getElementById('close-button');
		
// 		popupButton.addEventListener('click', () => {
// 			popupContent.style.display = 'block';
// 		});
		
// 		closeButton.addEventListener('click', () => {
// 			popupContent.style.display = 'none';
// 		});








// window.addEventListener("load",async (e)=>{
//     let deptID=localStorage.getItem("deptID");
//     if(deptID){
//         try{
//             let res=await fetch(baseURL+`doctor/allDoctor/${deptID}`);
//             if(res.ok){
//                 let data=await res.json();
//                 if(data.msg){
//                     swal("", `${data.msg}`, "info").then(function() {
//                         getdata();
//                         });
//                     }else{
//                         renderdata(data.doctor);
//                     }                
//                 }
//             localStorage.removeItem("deptID");     
//         }catch(err){
//             console.log(err);
//         }
//     }else{
//         getdata();
//     }
// })




let addpets=document.getElementById("addpets")

addpets.addEventListener("click",()=>{
    window.open("./addpet.html");
})



//  <p style="color:white">${elem._id}<p>

console.log(new Date(Date.now()) )