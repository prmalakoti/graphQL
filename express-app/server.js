/*    
    1. apollo-server package for createing graphql api
        import { ApolloServer } from 'apollo-server'
    2. apollo-server-express package for creating the graphql + rest api
        import { ApolloServer } from 'apollo-server-express'
*/
import { ApolloServer } from 'apollo-server-express'
import {
    ApolloServerPluginLandingPageGraphQLPlayground,
    ApolloServerPluginLandingPageDisabled,
    ApolloServerPluginDrainHttpServer
} from 'apollo-server-core'
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import path from 'path'

const app = express();
const httpServer = http.createServer(app);

const port = process.env.PORT || 4000;
if (process.env.NODE_ENV !== "production") {
    dotenv.config()
}

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on("connected", () => {
    console.log("Connected to Mongodb 🚀");
})
mongoose.connection.on("error", (err) => {
    console.log("Error occured while connecting Mongodb", err);
})

/* Model here */
import './models/user.js'
import './models/quotes.js'
import resolvers from "./resolvers.js"

/* This is Middaleware */
const context = ({ req }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
        return { userId }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !== "production" ?
            ApolloServerPluginLandingPageGraphQLPlayground() :
            ApolloServerPluginLandingPageDisabled()

    ]
})

app.get("/", (req, res) => {
    res.send("Rest API 🚀🚀")
})

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}
/* Below code is for graphql + rest api  */
await server.start();
server.applyMiddleware({
    app,
    path: '/graphql'
});

httpServer.listen({ port }, () => {
    console.log(`Server ready at ${server.graphqlPath} 🚀`);
})


/* graphql code  running code */
// server.listen({ port }).then(({ url }) => {
//     console.log(`Server ready at ${url} 🚀`);
// })