import mongoose from "mongoose"
import bcrypt from "bcryptjs/dist/bcrypt.js"
import jwt from "jsonwebtoken"

const User = mongoose.model("User")
const Quote = mongoose.model("Quote")

/* Resolvers are the resolve greet */
const resolvers = {
    Query: {
        greet: () => {
            return "Hello GraphQL...!!!"
        },
        users: async () => await User.find({}), //users
        user: async (_, { _id }) => await User.findOne({ _id }), //users.find(user => user._id == args._id),
        quotes: async () => await Quote.find({}).populate("by", "_id firstName"),//quotes,
        iquote: async (_, { by }) => await Quote.find({ by }), //quotes.filter(quote => quote.by === args.by),
        /* POC pending */
        // signinUser1: (_, userSignin) => {
        //     console.log("Query ---- ", JSON.stringify(userSignin));
        // }
        myprofile: async (_, args, { userId }) => {
            console.log("userID ", userId);
            if (!userId) throw Error("You must be LoggedIn");
            return await User.findOne({ _id: userId });
        }
    },
    User: {
        quotes: async (ur) => await Quote.find({ by: ur._id }), //quotes.filter(quote => quote.by === ur._id)
    },
    Mutation: {
        signupUser: async (_, { userNew }) => {
            const user = await User.findOne({ email: userNew.email })
            if (user) {
                throw new Error("User already exists")
            }
            const hashPassword = await bcrypt.hash(userNew.password, 12);
            const newUser = new User({
                ...userNew,
                password: hashPassword,
            })
            return await newUser.save();
        },
        signinUser: async (_, { userSignin }) => {
            const user = await User.findOne({ email: userSignin.email })
            if (!user) {
                throw new Error(`User dose not exist with ${userSignin.email}`)
            }
            const doMatch = await bcrypt.compare(userSignin.password, user.password);
            if (doMatch) {
                throw new Error(`email or password invalid`);
            }
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            return { token }
        },
        createQuote: async (_, { name }, { userId }) => {
            if (!userId) throw Error("You must be LoggedIn");
            const newQuote = new Quote({
                name,
                by: userId
            })
            await newQuote.save();
            return "Quote saved successfully!"
        }
    }
}

export default resolvers