import { gql } from 'apollo-server-express'
/* greet query from clinet side */
/* signinUser1 is just an poc(Query) over the signinUser Mutation */
const typeDefs = gql`
type Query{
    greet:String
    users:[User] 
    user(_id:ID!):User
    quotes:[QuoteWithName]
    iquote(by:ID!):[Quote]
    myprofile:User
    signinUser1(userSignin:UserSigninInput!):Token
}
type QuoteWithName{
    name:String
    by:IDName
}
type IDName{
    _id:String
    firstName:String
}
type User{
    _id:ID!
    firstName: String
    lastName: String
    email: String
    quotes: [Quote]
}
type Quote{
    name: String
    by: ID
}

type Token{
    token:String
}
type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createQuote(name:String!):String
}

input UserInput{
    firstName: String!
    lastName: String!
    email: String!, 
    password: String!
}
input UserSigninInput{
    email: String!, 
    password: String!
}
`

export default typeDefs;