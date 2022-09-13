import React from "react";
import { Link } from "react-router-dom";
import { Container,Items,LItems,linkStyle } from ".";
import { HomeData } from "./HomeData";

function Home() {
  return (
    <>
        <Container>
        {HomeData.map((item,index) => {
          return(
            <LItems key={index} className={item.cName}>
              <Link to={item.path} data-toggle="tooltip" data-placement="bottom" title={item.title} >
                <Items style={linkStyle}  >{item.icon} </Items>
              </Link>
            </LItems>
            
          )
        })}

        </Container>
    </>
  );
}

export default Home;
