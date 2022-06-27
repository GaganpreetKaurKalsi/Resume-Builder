import React, { memo } from 'react'
import { keyValueMap } from '../../constants/constants'

const AccordionContent = ({content, children}) => {
    const keys = Object.keys(content)
    return (
        <div className='accordionContent'>
            {keys.map((e, idx) => (
            content[e] !== "" && <div key={e+idx} className={`${e} element`}>
                <div className='label'>{keyValueMap[e]}</div>
                <div className={`value ${e}`}>{content[e]}</div>
            </div>))}
            {children}
        </div>
    )
}

export default memo(AccordionContent)