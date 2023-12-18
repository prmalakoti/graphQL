import { gql } from "@apollo/client"

export const SIGNUP_USER = gql`
mutation createNewUser($userNew: UserInput!) {
  user: signupUser(userNew: $userNew) {
    _id
    firstName
    lastName
    email
  }
}
`
export const SIGNUP_LOGIN_USER = gql`
mutation signInUser($userSignin: UserSigninInput!) {
  user: signinUser(userSignin: $userSignin) {
    token
  }
}

`

export const CREATE_QUOTE = gql`
mutation createQuote($name:String!){
  quote : createQuote(name: $name)
}
`