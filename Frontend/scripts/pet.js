// import baseURL from "./baseURL.js";

console.log("doctors detail page")
let docsCont=document.getElementById("pets_details");
let depObj={
    1:"a",
    2:"b",
    3:"c",
    4:"d",
    5:"e",
    6:"f",
    7:"g"
   
}

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

let token=localStorage.getItem("token")
// getdata();
renderdata(pets_arr);

async function getdata() {
    try {
        const res = await fetch('http://localhost:1010/pets/allpets',{
            method: 'GET',
            headers: { 'Content-Type': 'application/json',
            "Authorization":token
         },
            
        });
        let data = await res.json();
        // data = data.doctor;
        console.log(data);
        // renderdata(data);
    } catch (error) {
        console.log(error.message);
    }
}


{/* <p style=${elem.status?"color:green":"color:red"}>${elem.status?"Available":"Currently Unavailable"}</p> */}
function renderdata(arr) {
    docsCont.innerHTML="";
    docsCont.innerHTML=arr.map((elem)=>{
        return `
        <div class=doc-card>
            <div class="top-cont">
                <div class="doc-profile">

                    <div class="doc-desc">
                        <h2>${elem.name}</h2>
                        <h4>Type: ${elem.type}</h4>
                        <p>Breed: ${elem.breed}</p>
                        <h4>Owner Name: ${elem.owner_name}</h4>
                        <p style="color:white">${elem._id}<p>
                        <p>Weight:${elem.weight}</p>
                        <h3>Vaccination :-</h3>
                        <p>is_vaccinated:${"YEs"}</p>
                        
                   </div>
                </div>


                
                <div class="doc-book">
                    <div class="select-app">
                        <form>
                            <div>
                                <label>Vaccination  Date:</label>
                                <input type="text" id="datepicker" />
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

                       
                       
                        <button class="asd" id="popup-button">Medical History content</button>
                        <div class="popup" id="popup-content">
                            <p>This is the pop-up content!</p>
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

    // let forms=document.querySelectorAll(".select-app>form");

    $(function() {
        $("#datepicker").datepicker();
        });

       document.querySelector("form").addEventListener("submit",(e)=>{
        e.preventDefault();
        console.log("heelo")
        let date=document.getElementById("datepicker").value
        let vaccinationstatus=document.getElementById("status").value
        console.log(date,vaccinationstatus)
       })


       
        
        
}


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
  // code to update cart details
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