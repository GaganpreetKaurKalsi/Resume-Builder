import React, {forwardRef} from 'react'
import './Elements.scss'
import AvatarUploader from 'react-avatar-uploader';
import uploaderPlaceholder from '../assets/uploaderPlaceholder.png'

const InputElement = forwardRef(({label="Name", type = "text", ...props}, ref) => {
  return (
    <div className='inputElement'>
        <label className='label' htmlFor={label} >{label}</label>
        {type==="text" && <input type={type} name={label} className={`input ${type}`} ref={ref} {...props} />}
        {type==="textarea" && <textarea name={label} className={`input ${type}`} ref={ref} {...props}/>}
    </div>
  )
})

const AvatarUploadElement = forwardRef(({...props}, ref) => {
    return(
        <div className='avatarUploadElement'>
            <AvatarUploader
                size={170}
                uploadURL="/"
                fileType={"image/png"}
                placeholder={uploaderPlaceholder}
                className="avatarUploader"
                ref={ref}
                {...props}
            />
        </div>
        
    )
})

export {InputElement, AvatarUploadElement}