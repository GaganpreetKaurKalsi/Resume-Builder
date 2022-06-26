import React, {useRef, memo} from 'react'
import { AvatarUploadElement, InputElement } from '../Elements'
import './GeneralInfoEdit.scss'
import toast from 'react-hot-toast'

const GeneralInfoEdit = ({setData, data, toggleEditMode}) => {
    const nameRef = useRef()
    const emailRef = useRef()
    const bioRef = useRef()
    const profilePicRef = useRef()

    function saveGeneralInfo(){
        setData((data) => ({...data, name: nameRef.current.value, email: emailRef.current.value, bio: bioRef.current.value, profilePic: profilePicRef.current.state.currentImage}))
        toast.success("Saved successfully")
        toggleEditMode();
    }

    return (
        <div className='generalInfo'>
            <div className='avatarUploader'>
                <AvatarUploadElement name="profilePic" ref={profilePicRef} />
            </div>
            <div className='infoContainer'>
                <div className='row1'>
                    <div className="col1">
                        <InputElement label='Name' type='text' defaultValue={data.name} ref={nameRef} />
                        <InputElement label='Email-ID' type='text' defaultValue={data.email} ref={emailRef} />
                    </div>
                    <div className="col2">
                        <InputElement label='Short Bio' type='textarea' defaultValue={data.bio} ref={bioRef} />
                    </div>
                </div>
                <div className='row2'>
                    <button className='saveBtn' onClick={()=>{saveGeneralInfo()}}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default memo(GeneralInfoEdit)