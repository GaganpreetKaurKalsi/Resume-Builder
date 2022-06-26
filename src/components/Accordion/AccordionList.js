import React, { useCallback} from 'react'
import './Accordian.scss'
import AccordionItem from './AccordionItem'

const AccordionList = ({list, type, setEditTabData, openModal}) => {

  const getItemData = useCallback((item) => {
    const obj = {}
    if(type.value === 'education'){
      obj["title"] = item.institute
      obj["date"] = item.startDate + " - " + item.endDate
      obj["content"] = {degree: item.degree, description: item.description}
    } else if(type.value === 'workExperiences'){
      obj["title"] = item.company
      obj["date"] = item.startDate + " - " + item.endDate
      obj["content"] = {role: item.role, description: item.description}
    } else if(type.value === 'achievements'){
      obj["title"] = item.title
      obj["date"] = item.date
      obj["content"] = {description: item.description}
    }
    return obj
  }, [type.value])

  return (
    <div className='accordionContainer'>
        {list.map((item, idx) => (
          <AccordionItem setEditTabData={setEditTabData} key={"accordion - " + idx} data={getItemData(item)}>
            <div className='btnsContainer'>
                <button className='edit btn' onClick={()=>{
                  setEditTabData(idx)
                  openModal({type: "edit", open: true})
                  }}>Edit</button>
                <button className='delete btn' onClick={()=>{
                  setEditTabData(idx)
                  openModal({type: "delete", open: true})
                  }}>Delete</button>
            </div>
          </AccordionItem> 
        ))}
    </div>
  )
}

export default AccordionList