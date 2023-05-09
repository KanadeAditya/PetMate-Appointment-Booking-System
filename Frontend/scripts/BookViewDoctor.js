// import { sqlUrl } from "./baseURL.js";

// let doctors_details = document.getElementById('doctors_details')

// // window.addEventListener("load",async (e)=>{
// //     let deptID=localStorage.getItem("deptID");
// //     if(deptID){
// //         try{
// //             let res=await fetch(baseURL+`doctor/allDoctor/${deptID}`);
// //             if(res.ok){
// //                 let data=await res.json();
// //                 if(data.msg){
// //                     swal("", `${data.msg}`, "info").then(function() {
// //                         getdata();
// //                         });
// //                     }else{
// //                         renderdata(data.doctor);
// //                     }                
// //                 }
// //             localStorage.removeItem("deptID");     
// //         }catch(err){
// //             console.log(err);
// //         }
// //     }else{
// //         getdata();
// //     }
// // })

// async function getdata() {
//     try {
//         const res = await fetch(sqlUrl + `customers/viewslots`);
//         let data = await res.json();
//         console.log(data)
//         renderdata(data, doctors_details);

//         let options = document.querySelectorAll('.date-options')


//         options.forEach((ele,ind)=>{
//             ele.addEventListener('change',(e)=>{
//                 // console.log(e.value)
//                 alert(e.target.value)
//                 fetch()
//             })
//         })
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// function renderdata(arr, target) {
//     target.innerHTML = "";

//     target.innerHTML = arr.map((elem, ind) => {
//         let c = false
//         let dates = elem.slot.reduce((acc, curr) => {
//             let dd = new Date(curr.StartTime).toLocaleDateString();
//             if (acc[dd] && curr.CurrentStatus==="open") {
//                 let start = new Date(curr.StartTime).toLocaleTimeString();
//                 let end = new Date(curr.EndTime).toLocaleTimeString();
//                 let SlotID = curr.SlotID;
//                 c = true
//                 acc[dd].push({ start, end,SlotID })
//             } else if(curr.CurrentStatus==="open") {
//                 let start = new Date(curr.StartTime).toLocaleTimeString();
//                 let end = new Date(curr.EndTime).toLocaleTimeString();
//                 let SlotID = curr.SlotID;
//                 c = true
//                 acc[dd] = []
//                 acc[dd].push({ start, end ,SlotID})
//             }

//             return acc
//         }, {})

//         console.log(dates)
//         let fl = elem.slot.length && c;
//         let opsd = []
//         let opst = [];
//         if(fl){
//             opsd = Object.keys(dates).map((el,ind)=>{
//                 console.log(el)
//                 return  `<option value=${``} >${el}</option>`
//             }).join("")
//         }
//         return `
//         <div class=doc-card>
//             <div class="top-cont">
//                 <div class="doc-profile">
//                     <div class="doc-desc">
//                         <h2>DR. ${elem.name}</h2>
//                         <h4>Speciality : ${elem.speciality.join(" , ")}</h4>
//                         <p>UPRN : ${elem.UPRN}</p>
//                         <h4>Qualification: ${elem.degree.join(" ")}</h4>
//                         <p>₹ <span style="font-weight: bolder; color: chartreuse;"  class="price ${elem._id}"> Select the preferred slot</span> Consultation Fee</p>
//                         <p style=${fl ? "color:green" : "color:red"}>${fl? "Available" : "Currently Unavailable"}</p>
//                     </div>
//                 </div>
//                 <div class="doc-book">
//                     <div class="select-app">
//                         <form>
//                             <div>
//                                 <label>Select Date:</label>
//                                 <select class="date-options ${elem._id}" required="true" name="date">
//                                         <option value="a" >Select Date</option>
//                                      ${fl ? opsd : null}
//                                 </select>
//                                 </div>
//                                 <div>
//                                 <label>Select Slot:</label>
//                                 <select class="time-options ${elem._id}" required="true" name="slot">
                                   
//                                 </select>
//                                 <input id="book_slot_id" name="book_slot_id" type="text" style="display:none" value="" />
//                             </div>
//                             <input class="submit-options ${elem._id}" data-SlotID="${elem._id}" type="submit" value="Book Appointment Now"/>
                            
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         `
//     }).join("");
// }



// // getdata();




// //SEARCH DOCTOR
// let docInputTag = document.querySelector("#doc-sf-left>input");
// docInputTag.addEventListener("input", async (e) => {
//     let searchVal = docInputTag.value;
//     try {
//         let res = await fetch(baseURL + `doctor/search?q=${searchVal}`);
//         if (res.ok) {
//             let data = await res.json();
//             //console.log(data);
//             renderdata(data);
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })

// //FILTER BY DEPT ID
// let docFilterTag = document.querySelector("#doc-sf-right>select");
// docFilterTag.addEventListener("change", async (e) => {
//     let filterValue = docFilterTag.value;
//     try {
//         let res = await fetch(baseURL + `doctor/allDoctor/${filterValue}`);
//         if (res.ok) {
//             let data = await res.json();
//             if (data.msg) {
//                 swal("", `${data.msg}`, "info").then(function () {
//                     getdata();
//                 });
//             } else {
//                 renderdata(data.doctor);
//             }
//         }
//     } catch (err) {
//         console.log(err);
//     }
// })

// //RESET FILTERS

// document.querySelector("#filter-approval>p").addEventListener("click", async (e) => {
//     try {
//         getdata();
//     } catch (err) {
//         console.log(err);
//     }
// })


