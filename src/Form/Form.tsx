import React, {Component} from 'react'
import gql from "graphql-tag";
import { Mutation, Query } from 'react-apollo';

import Input from '../Input/Input'

import {GET_ALL_RESERVATIONS} from '../Table/Table'

const CREATE_RESERVATION = gql`
  mutation createReservation(
    $firstName: String!,
    $lastName: String!,
    $arrivalDate: String!,
    $departureDate: String!,
  ) {
    createReservation(
      firstName: $firstName,
      lastName: $lastName,
      arrivalDate: $arrivalDate,
      departureDate: $departureDate,
    ) {
      _id
      firstName
      lastName
      arrivalDate
      departureDate
    }
  }
`

const GET_SINGLE_RESERVATION = gql`
  query getSingleReservation(
    $id: String!,
  ) {
    getSingleReservation(
      id: $id,
    ) {
      _id
      firstName
      lastName
      arrivalDate
      departureDate
    }
  }
`

interface FormProps {
  formType: string,
}

type FormState = {
  firstName: string;
  lastName: string;
  arrivalDate: string;
  departureDate: string;
  id: any;
}

class Form extends Component<FormProps, FormState> {
  state: FormState = {
    firstName: "",
    lastName: "",
    arrivalDate: "",
    departureDate: "",
    id: "",
  }

  handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: any = e.target;
    this.setState({
      [name]: value
    } as Pick<FormState, keyof FormState>);
  };

  render() {
    const {firstName, lastName, arrivalDate, departureDate, id}: {
      firstName: string,
      lastName: string,
      arrivalDate: string
      departureDate: string
      id: any
    } = this.state;

    const { formType }: {
      formType: string
    } = this.props;

    return (
      <>
      {formType === 'submit' ? (
        <Mutation 
          mutation={CREATE_RESERVATION} 
          variables={this.state}
          refetchQueries={[{ query: GET_ALL_RESERVATIONS }]}
        >
          {(createReservation: any, data: any) => (
            <form 
              onSubmit={ async e => {
                e.preventDefault()
                const res = await createReservation()
              }}
            >
            <fieldset disabled={data.loading} aria-busy={data.loading}>
              <Input 
                onChange={this.handleInputChange}
                value={firstName}
                name="firstName"
                type="text"
              />
              <Input 
                onChange={this.handleInputChange}
                value={lastName}
                name="lastName"
                type="text"
              />
              <Input 
                onChange={this.handleInputChange}
                value={arrivalDate}
                name="arrivalDate"
                type="text"
              />
              <Input 
                onChange={this.handleInputChange}
                value={departureDate}
                name="departureDate"   
                type="text" 
              />
              <input 
                value="Submit" 
                type="submit" 
              />
            </fieldset>
          </form>
          )}
        </Mutation>
    ) : (
      <Query 
        query={GET_SINGLE_RESERVATION} 
        variables={this.state.id}
      >
        {(getSingleReservation: any) => (
          <form 
            onSubmit={ async e => {
              e.preventDefault()
              const res = await getSingleReservation()
              console.log(res)
            }}
          >
            <fieldset>
              <Input 
                onChange={this.handleInputChange}
                value={id}
                name="id"   
                type="text" 
              />
              <input 
                value="Submit" 
                type="submit" 
              />
            </fieldset>
          </form>
        )}
      </Query>
    )
    }
      </>
    )
  }
}

export default Form;
