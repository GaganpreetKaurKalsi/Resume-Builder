import React, {memo, useRef} from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './EditModal.scss'
import { InputElement } from '../Elements';
import toast from 'react-hot-toast';

const EditModal = ({isOpen, setIsOpen, heading, fields, setData, type, action="add", editData={}, setEditTabData, editIdx}) => {
    const refs = useRef({})

    const onCloseModal = () => {
      setIsOpen({type: "", open: false})
      setEditTabData("")
    };

    const saveDetails = () => {
      if(action === "add"){
        setData((prev) => {
          const list = [...prev[type.value]]
          const newData = {}
          fields.forEach((attr) => {
            newData[attr] = refs.current[attr].value
          })
          list.push(newData)
          return {...prev, [type.value]: list}
        })
        toast.success("Data successfully added")
      }
      if(action === "edit"){
        setData((prev) => {
          const list = [...prev[type.value]]
          const newData = {}
          fields.forEach((attr) => {
            newData[attr] = refs.current[attr].value
          })
          list[editIdx] = newData;
          return {...prev, [type.value]: list}
        })
        toast.success("Data successfully updated")
      }
      onCloseModal()
    }
  
    return (
      <div className='editModal'>
        <Modal open={isOpen.open} center showCloseIcon={false}>
          <div className='container'>
            <h2 className='heading'>{heading}</h2>
            <div className='fieldContainer'>
              {fields.includes("institute") && <InputElement defaultValue={action === "edit" ? editData.institute : ""} label="Institute" ref={(e) => refs.current["institute"] = e} />}
              {fields.includes("degree") && <InputElement defaultValue={action === "edit" ? editData.degree : ""} label="Degree" ref={(e) => refs.current["degree"] = e} /> }
              {fields.includes("company") && <InputElement defaultValue={action === "edit" ? editData.company : ""} label="Company" ref={(e) => refs.current["company"] = e} />}
              {fields.includes("role") && <InputElement defaultValue={action === "edit" ? editData.role : ""} label="Role" ref={(e) => refs.current["role"] = e} />}
              {fields.includes("title") && <InputElement defaultValue={action === "edit" ? editData.title : ""} label="Title" ref={(e) => refs.current["title"] = e} />}
              {fields.includes("date") && <InputElement defaultValue={action === "edit" ? editData.date : ""} label="Date" ref={(e) => refs.current["date"] = e} />}
              <div className='dflex'>
                {fields.includes("startDate") && <InputElement defaultValue={action === "edit" ? editData.startDate : ""} label="Start date" ref={(e) => refs.current["startDate"] = e} />}
                {fields.includes("endDate") && <InputElement defaultValue={action === "edit" ? editData.endDate : ""} label="End date" ref={(e) => refs.current["endDate"] = e} />}
              </div>
              {fields.includes("description") && <InputElement defaultValue={action === "edit" ? editData.description : ""} label="Description" type="textarea" ref={(e) => refs.current["description"] = e} />}
            </div>
            <div className='btns'>
              <button className='saveBtn btn' onClick={saveDetails}>Save</button>
              <button className='cancelBtn btn' onClick={onCloseModal}>Cancel</button>
            </div>
          </div>
        </Modal>
      </div>
    )
}

export default memo(EditModal)