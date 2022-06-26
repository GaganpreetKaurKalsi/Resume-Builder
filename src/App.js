import React, {useEffect, useState, lazy, Suspense} from 'react'
import './App.scss';
// import AccordionList from './components/Accordion/AccordionList';
import GeneralInfoEdit from './components/GeneralInfoSection/GeneralInfoEdit';
import GeneralInfoShow from './components/GeneralInfoSection/GeneralInfoShow';
import Nav from './components/Nav';
import Navbar from './components/Navbar';
// import EditModal from './components/Modals/EditModal';
// import DeleteModal from './components/Modals/DeleteModal';
import { Toaster } from 'react-hot-toast';

const EditModal = lazy(() => import('./components/Modals/EditModal'))
const DeleteModal = lazy(() => import('./components/Modals/DeleteModal'))
const AccordionList = lazy(() => import('./components/Accordion/AccordionList'))

const initialData = {
  name: "",
  email: "",
  bio: "",
  profilePic: "",
  education:[],
  workExperiences: [],
  achievements: [],
}

const navItems = [
  {label: "Education", value: "education"},
  {label: "Work Experiences", value: "workExperiences"},
  {label: "Achievements", value: "achievements"}
]

const modalData={
  education : { 
    title : "Add new education",
    fields: ["institute", "degree", "startDate", "endDate", "description"],
  },
  workExperiences : {
    title : "Add new work experience",
    fields: ["company", "role", "startDate", "endDate", "description"],
  },
  achievements : {
    title : "Add new achievement",
    fields: ["title", "date", "description"]
  }
}


function App() {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(true);
  const [activeTab, setActiveTab] = useState({label: "Education", value: "education"})
  const [editTabData, setEditTabData] = useState("")
  const [isModalOpen, setIsModalOpen] = useState({type:"", open: false});

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  }

  function openModal(open){
    setIsModalOpen(open)
  }

  function getGeneralInfo(){
    const {profilePic, name, email, bio} = data;
    return {profilePic, name, email, bio};
  }

  useEffect(()=>{
    const json = JSON.parse(localStorage.getItem("resumeJSON"))
    if(json !== null){
      setData(json)
      if(json.name !== ""){
        setIsEditing(false)
      }
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("resumeJSON", JSON.stringify(data))
  }, [data])

  return (
    <div className="App">
      <Toaster />
      <Suspense>
        {isModalOpen.type === "delete" && isModalOpen.open && <DeleteModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} deleteIdx={editTabData} setData={setData} type={activeTab} setEditIdx={setEditTabData} />}
      </Suspense>
      
      <Suspense>
        {isModalOpen.type === "edit" && isModalOpen.open && <EditModal  isOpen={isModalOpen} setIsOpen={setIsModalOpen} heading={modalData[activeTab.value].title} fields={modalData[activeTab.value].fields} setData={setData} type={activeTab} action={editTabData==="" ? "add" : "edit"} editData={data[activeTab.value][editTabData]} setEditTabData={setEditTabData} editIdx={editTabData} />}
      </Suspense>
      
      <Navbar setData={setData} data={data} initialData={initialData} setIsEditing={setIsEditing} />
      
      {isEditing && <GeneralInfoEdit setData={setData} data={data} toggleEditMode={toggleEditMode} />}
      
      {!isEditing && <GeneralInfoShow data={getGeneralInfo()} toggleEditMode={toggleEditMode} />}

      <Nav navItems={navItems} data={data} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className='dataContainer'>
        <div className='addNewItem'>
          <button className='addNewBtn' onClick={()=>{openModal({type: "edit", open: true})}}>Add new</button>
        </div>
        <Suspense fallback={<div className='loading'>Loading...</div>}>
          <AccordionList openModal={openModal} setEditTabData={setEditTabData} list={data[activeTab.value]} setData={setData} type={activeTab} />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
