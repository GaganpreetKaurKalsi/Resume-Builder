import React, { memo } from 'react'
import './GeneralInfoShow.scss'

const GeneralInfoShow = ({data, toggleEditMode}) => {

    // Function to construct avatar name from initials incase Profile pic is not uploaded
    function getAvatarName(){
        const {name} = data;
        const parts = name.split(" ");
        return parts.map((part) => part[0]).join("");
    }

    return (
        <div className='generalInfoShow'>
            <div className='profilePicSection'>
                <div className='profilePic'>
                    {data.profilePic !== null && <img src={data.profilePic} alt="profilePic" />}
                    {data.profilePic === null && <div className='avatarPic'><p>{getAvatarName()}</p></div>}
                </div>
            </div>
            <div className='details'>
                {data.name !== null && <div className='name'>{data.name}</div>}
                {data.email !== null && <div className='email'>{data.email}</div>}
                {data.bio !== null && <div className='bio'>{data.bio}</div>}
                <button className='editBtn' onClick={toggleEditMode}>Edit</button>
            </div>
        </div>
    )
}

export default memo(GeneralInfoShow)