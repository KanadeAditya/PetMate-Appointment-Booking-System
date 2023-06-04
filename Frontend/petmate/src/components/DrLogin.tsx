
import * as Components from '../compo/Login';
import React,{useEffect, useState} from "react";
 import style from "./Nav.module.css"
   
import AOS from 'aos';
import 'aos/dist/aos.css';

function DrLogin(){
    let [{name,email,password},impState]=useState({
        name: "",
        email: "",
        password: ""
        
      })
    
      let [{Email,Password},lgnState]=useState({Email:"",Password:""})
    
    function fun(e:any){
        if(e.target.name==="name"){
            impState({
                name:e.target.value,
                email:email,
                password:password
            })
        }else if(e.target.name==="email"){
            impState({
                name:name,
                email:e.target.value,
                password:password
            })
        }else if(e.target.name==="password"){
            impState({
                name:name,
                email:email,
                password:e.target.value
               
            })
        }
    console.log(e.target.value)
    }
    
    function fun2(e:any){
       if(e.target.name==="email"){
        lgnState({
                 Email:e.target.value,
                Password:Password
            })
        }else if(e.target.name==="password"){
            lgnState({
                 Email:Email,
                Password:e.target.value
               
            })
        }
    console.log(e.target.value)
    }
    
    function submit1(e:any){
        e.preventDefault()
        let obj={
            name,email,password, role:"customer",
            status:true
        }
        console.log(obj)
    }
    
    function submit2(e:any){
        e.preventDefault()
        let obj={
            email,password
        }
        console.log(obj)
    }


    useEffect(() => {
        AOS.init();
      }, []);
    
        const [signIn, toggle] = React.useState(true);
    return(
        <div id={style.flip}>
  
        <div id={style.flip2} data-aos="flip-right"  data-aos-offset="200"
      data-aos-delay="50"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
       >
  
           <Components.Container>
               <Components.SignUpContainer signinIn={signIn}>
                   <Components.Form>
                       <Components.Title>Create Account</Components.Title>
                       <Components.Input name="name" type='text' placeholder='Name' onChange={(e)=>{fun(e)}} />
                       <Components.Input name="email" type='email' placeholder='Email' onChange={(e)=>{fun(e)}} />
                       <Components.Input name="UPRN" type='UPRN' placeholder='UPRN' onChange={(e)=>{fun(e)}} />
                       <Components.Input name="password" type='password' placeholder='Password' onChange={(e)=>{fun(e)}} />
                        
                       <Components.Button onClick={submit1}>Sign Up</Components.Button>
                   </Components.Form>
               </Components.SignUpContainer>
  
               <Components.SignInContainer signinIn={signIn}>
                    <Components.Form>
                        <Components.Title>Sign in</Components.Title>
                        <Components.Input type='email' placeholder='Email' onChange={(e)=>{fun2(e)}}/>
                        <Components.Input type='password' placeholder='Password' onChange={(e)=>{fun2(e)}}/>
                        <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
                        <Components.Button onClick={submit2}>Sigin In</Components.Button>
                    </Components.Form>
               </Components.SignInContainer>
  
               <Components.OverlayContainer signinIn={signIn}>
                   <Components.Overlay signinIn={signIn}>
  
                   <Components.LeftOverlayPanel signinIn={signIn}>
                       <Components.Title>Welcome Back!</Components.Title>
                       <Components.Paragraph>
                           To keep connected with us please login with your personal info
                       </Components.Paragraph>
                       <Components.GhostButton >
                           google
                       </Components.GhostButton>
                       <Components.GhostButton >
                            Github
                       </Components.GhostButton>
                       <Components.GhostButton onClick={() => toggle(true)}>
                           Sign In
                       </Components.GhostButton>
                       </Components.LeftOverlayPanel>
  
                       <Components.RightOverlayPanel signinIn={signIn}>
                         <Components.Title>Hello, Friend!</Components.Title>
                         <Components.Paragraph>
                             Enter Your personal details and start journey with us
                         </Components.Paragraph>
                         <Components.GhostButton >
                           google
                       </Components.GhostButton>
                       <Components.GhostButton >
                            Github
                       </Components.GhostButton>
                             <Components.GhostButton onClick={() => toggle(false)}>
                                 Sigin Up
                             </Components.GhostButton> 
                       </Components.RightOverlayPanel>
   
                   </Components.Overlay>
               </Components.OverlayContainer>
  
           </Components.Container>
        </div>
        </div>
       )
}

export default DrLogin