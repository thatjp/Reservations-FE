import React from 'react';
import FormContainer from '../FormContainer/FormContainer';
import AppTable from '../Table/Table';
import AppStyles from './AppStyles'

const App: React.FC = () => {

  return (
    <AppStyles>
      <div className="center">
        <FormContainer />
        <AppTable />
      </div>
    </AppStyles>
  );
}

export default App;