import React, { useState } from 'react'
import Form from '../Form/Form'
import Input from '../Input/Input'

interface initialFormData {
  formType: string
}

const style =  {
  border: '1px solid green'
}

const FormContainer: React.FC = () => {
  const [formType, setFormType] = useState('createReservation')

  console.log(formType);

  return (
    <div style={style}>
      <div>
        <Input
          onClick={e => setFormType('submit')}
          value="Submit"
          name="submitFormButton"
          type="button"
        />
        <Input 
          onClick={e => setFormType('getSingleReservation')}
          value="Submit"
          name="submitFormButton"
          type="button"
        />
      </div>
      <Form formType={formType}/>
    </div>
  )
}

export default FormContainer;
