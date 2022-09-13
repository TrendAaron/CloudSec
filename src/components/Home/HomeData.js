import React from 'react'
import * as GiCon from "react-icons/gi";
import { BsFillTreeFill,BsBagCheckFill } from "react-icons/bs";
import { Si1Password } from "react-icons/si";
import { CgDollar } from "react-icons/cg";
import { MdStorage } from "react-icons/md";
import { TbSwitchHorizontal } from "react-icons/tb";
import { WiTime3 } from "react-icons/wi";
import { RiFileTransferFill } from "react-icons/ri";


export const HomeData = [
    {
        title: "Branches", 
        path:'/branches',
        icon: <BsFillTreeFill size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Crack", 
        path:'/crack',
        icon: <GiCon.GiCrackedGlass size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Defense", 
        path:'/defense',
        icon: <GiCon.GiDefensiveWall size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Dino", 
        path:'/dino',
        icon: <GiCon.GiDinosaurRex size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Door", 
        path:'/door',
        icon: <GiCon.GiDoor size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "EtherWallet", 
        path:'/etherwallet',
        icon: <GiCon.GiWallet size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "GasDefense", 
        path:'/gasdefense',
        icon: <GiCon.GiGasMask size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Hand", 
        path:'/hand',
        icon: <GiCon.GiHand size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Password", 
        path:'/password',
        icon: <Si1Password size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Seller", 
        path:'/seller',
        icon: <CgDollar size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Storage", 
        path:'/storage',
        icon: <MdStorage size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Switch", 
        path:'/switch',
        icon: <TbSwitchHorizontal size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Timezone", 
        path:'/timezone',
        icon: <WiTime3 size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "TopBidder", 
        path:'/topbidder',
        icon: <BsBagCheckFill size={65}/>,
        cName: 'nav-text'
    }, 
    {
        title: "Transfer", 
        path:'/transfer',
        icon: <RiFileTransferFill size={65}/>,
        cName: 'nav-text'
    }, 

]

