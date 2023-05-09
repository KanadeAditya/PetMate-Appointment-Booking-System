import { sqlUrl,baseUrl } from "./baseUrl.js";

let petmate =JSON.parse(localStorage.getItem("petmate"))

window.addEventListener("load",()=>{
  if(petmate.role!=="doctor" || !petmate.status){
    window.location.href="index.html"
  }
})

document.getElementById("name").innerText=localStorage.getItem("userName");
document.getElementById("email").innerText=localStorage.getItem("email");


//create slot
document.getElementById("CreateSlot").addEventListener("click",(e)=>{
    Swal.fire({
        title: 'Book Slot',
        html:
          '<label>Price</label><br/>'+
          '<input id="price" type="number"><br/><br/>'+
          '<label for="date">Select Date</label><br/>'+
          '<input type="datetime-local" id="date"><br/><br/>'+
          '<label>Select duration</label><br/>'+
          '<label><input type="radio" name="slot-duration" value="60">1 hour</label>' +
          '<label><input type="radio" name="slot-duration" value="30">30 minutes</label>',
        confirmButtonText: 'Book',
        showCancelButton:true,
        preConfirm: () => {
          const slotDurationInput = Swal.getPopup().querySelector('input[name="slot-duration"]:checked');
          const date= Swal.getPopup().querySelector("#date").value
          const price= Swal.getPopup().querySelector("#price").value
    
          if (!slotDurationInput || !date || !price) {
            Swal.showValidationMessage('Please select a slot duration, Date and Price');
          }
    
          return { slotDuration: slotDurationInput.value, date, price };
        }
      }).then((result) => {
        if (result.isConfirmed) {
          const slotDuration = result.value.slotDuration;

          const slotDetails={
            Price:result.value.price,
            date:result.value.date,
            slotDuration,
          }
    
          // Here, you can call a function to book the slot with the provided slot duration
          fetch(sqlUrl+"doctors/openslot",{
            method:"POST",
            headers:{ 
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
             },
             body:JSON.stringify(slotDetails)
          })
          .then(res=>res.json())
          .then((res)=>{
            if(res.msg==='The slot has been created'){
              Swal.fire({
                  icon: 'success',
                  title: res.msg
              })
           }else{
              Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: res.msg
              })
           }
          })

        }
      });
})


//view slots
document.getElementById("viewSlots").addEventListener("click",()=>{
     
})



//add degree
document.getElementById("addDegree").addEventListener("click",()=>{
  Swal.fire({
    title: 'Add degree',
    input:"text",
    confirmButtonText: 'Add',
    showCancelButton:true,
    preConfirm: (degree) => {
      
      if (!degree) {
        Swal.showValidationMessage('Please add degree');
      }

      return { degree};
    }
  }).then((result) => {
    if (result.isConfirmed) {

      fetch(baseUrl+"doctors/speciality",{
        method:"PATCH",
        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
         },
         body:JSON.stringify({degree:result.value.degree})
      })
      .then(res=>res.json())
      .then((res)=>{
        if(res.msg==='Doctor info updated successfully'){
          Swal.fire({
              icon: 'success',
              title: res.msg
          })
       }else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.msg
          })
       }
      })

    }
  });
})



//add speciality
document.getElementById("speciality").addEventListener("click",()=>{
  Swal.fire({
    title: 'Add speciality',
    input:"text",
    confirmButtonText: 'Add',
    showCancelButton:true,
    preConfirm: (speciality) => {

      if (!speciality) {
        Swal.showValidationMessage('Please add speciality');
      }

      return { speciality};
    }
  }).then((result) => {
    if (result.isConfirmed) {

      fetch(baseUrl+"doctors/speciality",{
        method:"PATCH",
        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
         },
         body:JSON.stringify({speciality:result.value.speciality})
      })
      .then(res=>res.json())
      .then((res)=>{
        if(res.msg==='Doctor info updated successfully'){
          Swal.fire({
              icon: 'success',
              title: res.msg
          })
       }else{
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.msg
          })
       }
      })

    }
  });
})


