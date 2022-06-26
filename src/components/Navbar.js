import React, { memo, useCallback } from 'react'
import './Navbar.scss'
import { clipboardOutlined } from '../assets/svgIcons'
import Upload from 'rc-upload';
import toast from 'react-hot-toast'

const Navbar = ({setData, data, initialData, setIsEditing}) => {

  function onError() {
    toast.error("Error occured while uploading file")
  }

  // Function to read the uploaded file and set it's contents as new data
  const customRequest = useCallback(({file}) => {
    const read = new FileReader();
    read.readAsBinaryString(file)
    read.onloadend = function(){
      const json = JSON.parse(read.result)
      const newData = {...initialData, ...json}
      setData(newData)
      if(newData.name !== "" && newData.email !== "" ){
        setIsEditing(false)
      }
      toast.success("File successfully uploaded")
    }
  }, [initialData, setData, setIsEditing])


  // Function to export data in form of json file
  const exportData = useCallback(() => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${data.name} Resume.json`;
    link.click();
  }, [data]);


  return (
    <div className='navBar'>
        <div className='brand'>
            <span className='brandLogo'>{clipboardOutlined()}</span>
            <span className='brandName'>Resume Builder</span>
        </div>
        <div className='buttons'>
            <Upload accept='.json' onError={onError} customRequest={customRequest}>
              <button className='import button'>Import</button>
            </Upload>
            <button className='export button' onClick={exportData}>Export</button>
        </div>
    </div>
  )
}

export default memo(Navbar)