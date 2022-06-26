import React, { useState, memo } from 'react'
import { CaretDownFilled } from '../../assets/svgIcons'
import AccordionContent from './AccordionContent'

const AccordionItem = ({data, children}) => {
    const [open, setOpen] = useState(false)

    return (
        <div className={`accordionItem ${open ? "open" : "close"}`}>
            <div className='accordionHead'>
                <span className={`toggleIcon ${open ? "open" : "close"}`} onClick={() => {setOpen((prev)=>!prev)}}>
                    {CaretDownFilled()}
                </span>
                <span className='heading'>
                    <span className='title'>{data.title}</span>
                    <span className='date'>{data.date}</span>
                </span>
            </div>
            {open && <div className='accordionContent'>
                <AccordionContent content={data.content} children={children} />
            </div>}
        </div>
    )
}

export default memo(AccordionItem)