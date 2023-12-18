Query : to get data (client side)
Mutation: to post/ update / delete data (server side)
Resolver: has logic to handle query or mutation operation(server side)
Mutation- Insert/Update/Delete Query- Get
ID! means ! is mandatory feild

user is the alias of createNewUser
mutation createNewUser($userNew: UserInput!) {
user: signupUser(userNew: $userNew) {
\_id
firstName
lastName
email
}
}

import { ApolloServer } from 'apollo-server-express' is use for initilize the server in index/server.js and
import { gql } from 'apollo-server-express' in mutation/queries.
