import React, { memo } from 'react'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './EditModal.scss'
import toast from 'react-hot-toast'

const DeleteModal = ({isOpen, setIsOpen, deleteIdx, setData, type, setEditIdx}) => {

    const onCloseModal = () => {
      setIsOpen({type: "", open: false})
      setEditIdx("")
    };
  
    const onConfirm = () => {
        setData((prev) => {
            const list = [...prev[type.value]]
            list.splice(deleteIdx, 1)
            return {...prev, [type.value]: list}
        })
        toast.success("Data successfully deleted")
        onCloseModal()
    };


    return (
      <div className='deleteModal'>
        <Modal classNames="deleteModal" open={isOpen.open} center showCloseIcon={false}>
            <div className='deleteModalContainer' id='deleteModal'>
            <h2 className='heading'>Are you sure you want to delete it?</h2>
                <div className='btns'>
                    <button className='cancelBtn btn' onClick={onCloseModal}>Cancel</button>
                    <button className='saveBtn confirmBtn btn' onClick={onConfirm}>Confirm</button>
                </div>
          </div>
        </Modal>
      </div>
    )
}

export default memo(DeleteModal)