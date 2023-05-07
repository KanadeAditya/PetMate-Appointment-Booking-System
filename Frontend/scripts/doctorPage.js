import baseUrl from "./baseUrl.js";

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
        preConfirm: () => {
          const slotDurationInput = Swal.getPopup().querySelector('input[name="slot-duration"]:checked');
          const date= Swal.getPopup().querySelector("#date").value
          const price= Swal.getPopup().querySelector("#price").value
    
          if (!slotDurationInput || !date || !price) {
            Swal.showValidationMessage('Please select a slot duration, Date and Price');
          }
    
          return { slotDuration: slotDurationInput.value, date, price };
        },
        didClose: () => {
            const validationMessage = Swal.getValidationMessage();
            if (validationMessage) {
              Swal.fire({
                icon: 'error',
                title: validationMessage
              });
            }
          }
      }).then((result) => {
        if (result.isConfirmed) {
          const slotDuration = result.value.slotDuration;

          const slotDetails={
            price:result.value.price,
            date:result.value.date,
            slotDuration,
          }

          console.log(slotDetails)
    
          // Here, you can call a function to book the slot with the provided slot duration
          fetch(baseUrl+"doctors/bookslot",{
            method:"POST",
            headers:{ 
                'Content-Type': 'application/json',
                "Authorization": localStorage.getItem("token")
             },
             body:JSON.stringify(slotDetails)
          })
          .then(res=>res.json())
          .then((res)=>{
            console.log(res)
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
    html:
      '<input id="degree" type="text">',
    confirmButtonText: 'Add',
    preConfirm: () => {
      const degree= Swal.getPopup().querySelector("#degree").value

      if (!degree) {
        Swal.showValidationMessage('Please add degree');
      }

      return { degree};
    },
    didClose: () => {
        const validationMessage = Swal.getValidationMessage();
        if (validationMessage) {
          Swal.fire({
            icon: 'error',
            title: validationMessage
          });
        }
      }
  }).then((result) => {
    if (result.isConfirmed) {


      // Here, you can call a function to book the slot with the provided slot duration
      fetch(baseUrl+"doctors/bookslot",{
        method:"PATCh",
        headers:{ 
            'Content-Type': 'application/json',
            "Authorization": localStorage.getItem("token")
         },
         body:JSON.stringify(result.value.degree)
      })
      .then(res=>res.json())
      .then((res)=>{
        console.log(res)
      })

    }
  });
})



//add speciality
document.getElementById("speciality").addEventListener("click",()=>{
     
})


