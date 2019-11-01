import React, { ReactChild } from 'react'

interface InputProps {
  onChange?: (value: any) => any,
  onClick?: (value: any) => any,
  type: string,
  name: string,
  value: string
}

const Input: React.FC<InputProps> = (Props: InputProps) => {
  return (
    <>
      <label htmlFor={Props.name}>
        {Props.name}
        <input 
          type={Props.type}
          name={Props.name}
          value={Props.value}
          onChange={Props.onChange}
          onClick={Props.onClick}
        />
      </label>
    </>
  )
}

export default Input
