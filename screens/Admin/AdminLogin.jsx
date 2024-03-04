import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import  styles from'../Login.css';
export default function Login() {

  const[credentials,setcredentials]=useState({email:"",password:""})
  let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email,password:credentials.password}))
        const response= await fetch("http://localhost:5000/api/adminlogin",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid credentials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
          console.log(localStorage.getItem("authToken"))
          navigate("/adminhome")
      }

    }
    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <>
    <div>
      <Navbar/>
    </div>
    <div>
      <div className='contain'>
    <form onSubmit={handleSubmit}>
  <div class="mb-3">
    <h1>Admin Login</h1>
    <label htmlFor="exampleInputEmail1" class="form-label">Enter Email:</label>
    <input type="email" class="form-control"name='email'value={credentials.email}onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Enter Password:</label>
    <input type="password" className="form-control"name='password'value={credentials.password}onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary ${styles.submitButton}">Submit</button>
  <Link to="/createadmin"className=' btn btn-danger ${styles.newUserButton}'>I'm a new Admin</Link>
</form>
</div>
    </div>
    <div>
      <Footer/>
    </div>
    </>
  )
}
