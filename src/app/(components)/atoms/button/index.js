import React from 'react'
import  "./index.css"

export default function Button({
    fluid = false,
    htmlType = 'button',
    variant = 'primary',
    disabled,
    children,
    onClick = () => void undefined,
}) {
  return (
    <button 
        type={htmlType} 
        className={`bs-button bs-button-variant-${variant} bs-button-wrap ${fluid ? 'bs-fluid' : ''}`} 
        onClick={() => onClick()} 
        disabled={disabled}
    >
        {children}
    </button>
  )
}
