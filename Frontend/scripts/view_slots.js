import { sqlUrl } from "./baseUrl.js"

window.addEventListener("load", () => {
   
})

fetch(sqlUrl + "doctors/myslots", {
    headers: {
        "Authorization": localStorage.getItem("token")
    }
})
    .then(res => res.json())
    .then((res) => {
        let container = document.getElementById("container")

        const data = res.map((e) => {
            return `<div data-aos="flip-up" class="cart" data-doctorid=${e.DoctorID}>
                     <h3 class="price">Price:- ₹${e.Price}</h3>
                     <h3 class="curr_status">Current status:- ${e.CurrentStatus}</h3>
                     <h4 class="start_time">Start time:- ${e.StartTime}</h4>
                     <h4 class="end_time">End time:- ${e.EndTime}</h4>
                     
                     <div class="buttons" data-aos="slide-up">
                      <button class="view_info">View info</button>
                      <button class="update_medical_history">Update medical history</button>
                      <button data-slotid=${e.SlotID} class="close_slot">Close slot</button>
                    </div>
                   </div>`
        })

        container.innerHTML = data.join(" ")

        let closeButtons= document.getElementsByClassName("close_slot")

        //closing slot
        for(let btn of closeButtons){
            btn.addEventListener("click",(e)=>{
                  Swal.fire({
                    title: 'Doctor summary',
                    input:"text",
                    confirmButtonText: 'Add',
                    showCancelButton:true,
                    preConfirm: (DoctorSummary) => {
                      
                      if (!DoctorSummary) {
                        Swal.showValidationMessage('Please write summary');
                      }
                
                      return { DoctorSummary};
                    }
                  }).then((result) => {
                    if (result.isConfirmed) {
                     
                      fetch(sqlUrl+`doctors/close/${e.target.dataset.slotid}`,{
                        method:"PATCH",
                        headers:{ 
                            'Content-Type': 'application/json',
                            "Authorization": localStorage.getItem("token")
                         },
                         body:JSON.stringify({DoctorSummary:result.value.DoctorSummary})
                      })
                      .then(res=>res.json())
                      .then((res)=>{
                         if(res.msg==="Slot has been closed"){
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
        }


    })
