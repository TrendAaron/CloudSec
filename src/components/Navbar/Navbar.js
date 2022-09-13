import React, { useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import { SidebarData } from './SidebarData'; 
import { GiHamburgerMenu } from "react-icons/gi";
import "./Index.css";
import * as Io5Con from "react-icons/io5"; 


function Navbar() {

 const [sidebar, setSidebar] = useState(false); 
 const showSideBar = () => setSidebar(!sidebar);
  return (
    <>
    <div className='navbar'>
      
        <GiHamburgerMenu className='menu-bars' onClick={showSideBar}/>
      
        <Link to="/" className='title'>
        <p className='title'>Cloud Sec Challenge Series 2022 </p>
      </Link>
    </div>
    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
      <ul className='nav-menu-items'>
        <li className='navbar-toggle'>
          <Link to="#" className="menu-bars">
            <Io5Con.IoCloseSharp onClick={showSideBar}/>
          </Link>
        </li>
        {SidebarData.map((item,index) => {
          return(
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={showSideBar}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    {/* <Nav>
      <Link to="/" className='Title'> Home </Link>
    </Nav> */}

    
    {/* <nav className='navbar navbar-dark fixed-top shadow p-0' style={{backgroundColor:'black',height:'50px'}}>
    
      
        
    </nav> */}
    
    {/* <Link to='/' className='navbar-brand '
    style={{color:'white'}}>
    Cloud Sec Challenge Series 2022 
    </Link> */}
{/* <ul className='navbar-nav px-3'> 
                <small style={{color: "white"}}>
                    Account Number: &nbsp;{ account}
                </small>
        </ul> */}

</>
  )
}

export default Navbar