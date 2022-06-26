import React from 'react'
import './Nav.scss'

const Nav = ({navItems, data, activeTab, setActiveTab}) => {
  return (
    <div className='nav'>
        <ul className='navItems'>
            {navItems.map((item, idx) => <li key={item+idx} onClick={()=>{setActiveTab(item)}} className={`item ${activeTab.value===item.value ? 'active' : ''}`}>{item.label + " (" + data[item.value].length + ")"}</li>)}
        </ul>
    </div>
  )
}

export default Nav