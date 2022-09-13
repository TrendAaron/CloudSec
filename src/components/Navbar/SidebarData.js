import React from 'react'
import * as GiCon from "react-icons/gi";
import * as Io5Con from "react-icons/io5"; 
import { BsFillTreeFill,BsBagCheckFill } from "react-icons/bs";
import { Si1Password } from "react-icons/si";
import { CgDollar } from "react-icons/cg";
import { MdStorage } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";
import { WiTime3 } from "react-icons/wi";
import { RiFileTransferFill } from "react-icons/ri";


export const SidebarData = [
    // {
    //     title: "Home", 
    //     path:'/',
    //     icon: <Io5Con.IoHomeSharp/>,
    //     cName: 'nav-text'
    // }, 
    {
        title: "Branches", 
        path:'/branches',
        icon: <BsFillTreeFill/>,
        cName: 'nav-text'
    }, 
    {
        title: "Crack", 
        path:'/crack',
        icon: <GiCon.GiCrackedGlass/>,
        cName: 'nav-text'
    }, 
    {
        title: "Defense", 
        path:'/defense',
        icon: <GiCon.GiDefensiveWall/>,
        cName: 'nav-text'
    }, 
    {
        title: "Dino", 
        path:'/dino',
        icon: <GiCon.GiDinosaurRex/>,
        cName: 'nav-text'
    }, 
    {
        title: "Door", 
        path:'/door',
        icon: <GiCon.GiDoor/>,
        cName: 'nav-text'
    }, 
    {
        title: "EtherWallet", 
        path:'/etherwallet',
        icon: <GiCon.GiWallet/>,
        cName: 'nav-text'
    }, 
    {
        title: "GasDefense", 
        path:'/gasdefense',
        icon: <GiCon.GiGasMask/>,
        cName: 'nav-text'
    }, 
    {
        title: "Hand", 
        path:'/hand',
        icon: <GiCon.GiHand/>,
        cName: 'nav-text'
    }, 
    {
        title: "Password", 
        path:'/password',
        icon: <Si1Password/>,
        cName: 'nav-text'
    }, 
    {
        title: "Seller", 
        path:'/seller',
        icon: <CgDollar/>,
        cName: 'nav-text'
    }, 
    {
        title: "Storage", 
        path:'/storage',
        icon: <MdStorage/>,
        cName: 'nav-text'
    }, 
    {
        title: "Switch", 
        path:'/switch',
        icon: <TbSwitchHorizontal/>,
        cName: 'nav-text'
    }, 
    {
        title: "Timezone", 
        path:'/timezone',
        icon: <WiTime3/>,
        cName: 'nav-text'
    }, 
    {
        title: "TopBidder", 
        path:'/topbidder',
        icon: <BsBagCheckFill/>,
        cName: 'nav-text'
    }, 
    {
        title: "Transfer", 
        path:'/transfer',
        icon: <RiFileTransferFill/>,
        cName: 'nav-text'
    }, 

]

