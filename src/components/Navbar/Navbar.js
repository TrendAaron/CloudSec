import React from 'react'
import Logo from "./Trend_Logo.png"

function Navbar({account}) {
  return (
    <div className='text-center'>
    <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black',height:'50px'}}>
    <a href='/' className='navbar-brand col-sm-3 col-md-2 mr-0'
    style={{color:'white'}}>
    <img src={Logo} width='50' height = '45' className='d-inline-block alight-top' alt='Trend' />
    &nbsp;
    Cloud Sec Challenge Series 2022 
    </a>
        <ul className='navbar-nav px-3'> 
                <small style={{color: "white"}}>
                    Account Number: &nbsp;{ account}
                </small>
        </ul>
    </nav>
    
    
</div>
  )
}

export default Navbar