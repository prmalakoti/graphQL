#1 npm i @apollo/client -> without apollo clinet we ca call api (useEffect) but every render it will call, Once we used apollo client only first render of page network call will happen, whener we visit that page next time(in same session) it won't call network it will work like caching

#2 npm i graphql

#Deploy app on server
npm run build

#npm packages required
@apollo/client
graphql

import {
ApolloClient,
InMemoryCache,
ApolloProvider,
} from "@apollo/client" is use for initilize the app in index.js and
import { gql } from "@apollo/client" in mutation/queries.
