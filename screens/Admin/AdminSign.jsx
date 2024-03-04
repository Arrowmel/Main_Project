import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import  styles from'../Login.css';

export default function Signup() {
    const[credentials,setcredentials]=useState({name:"",email:"",password:""})
    let navigate=useNavigate()
    const handleSubmit=async(e)=>{
        console.log(JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}))
        e.preventDefault();
        const response= await fetch("http://localhost:5000/api/createadmin",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials})
        });
        const json=await response.json()
        console.log(json)

        if(!json.success){
            alert("Enter valid credentials")
        }
        if(json.success){
          navigate("/adminlogin")
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
    <div className='contain'>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <h1>Admin SignUp</h1>
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control"name='name' value={credentials.name} onChange={onChange}/>
  </div>
  <div class="mb-3">
    <label htmlFor="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control"name='email'value={credentials.email}onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control"name='password'value={credentials.password}onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
  <Link to="/adminlogin"className=' btn btn-danger'>Already an admin?</Link>
</form>
</div>
<div>
  <Footer/>
</div>
    </>
  )
}
