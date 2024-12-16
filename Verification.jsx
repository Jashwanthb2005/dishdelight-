import toast from 'react-hot-toast'
import './Verification.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Verification() {
  const navigate=useNavigate()
  const [userOTP,setUserOTP]=useState("")
  async function handleVerification(e){
    e.preventDefault()
    if(userOTP==""){
      return toast.error("please enter otp...")
    }
    const callAPI =await fetch("http://127.0.0.1:4010/verificationcheck",{
      method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({otp:userOTP})
    })
    const response =await callAPI.json()
    if(response.error){
      return toast.error(response.error)
    }
    navigate('/homepage')
  }
  return (
    <div className='verification-container'>
      <h2>OTP verification</h2>
      <form onSubmit={handleVerification}>
        <input type="text" name='otp' onChange={(e)=>setUserOTP(e.target.value)} placeholder='Enter OTP...'/>
        <button type='submit'>Verify</button>
      </form>
    </div>
  )
}
