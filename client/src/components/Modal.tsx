import React from 'react'

function Modal({singleEvent, setOpenModal}: any) {
    const {title, description, category, isVirtual, date, address} = singleEvent;
  return (
    <div style={{width: '100vw', height: '100vh', position: 'absolute', top: '0', left: '0', background: 'whitesmoke', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <div>Modal Content</div>
        <div>{title}</div>   
        <div>{description}</div>   
        <div>{category}</div>   
        <div>{isVirtual}</div>   
        <div>{date}</div>   
        <div>{address}</div>
        <button onClick={() => setOpenModal(false)}>Close Modal</button> 
    </div>
  )
}

export default Modal