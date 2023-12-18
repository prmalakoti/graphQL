import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom";
// import { useEffect } from "react"
import { GET_ALL_QUOTES } from "../gqlOperations/queries"

const Home = () => {
    /* Without apollo client graphQL Query */
    // useEffect(() => {
    //     fetch("http://localhost:4000", {
    //         method: "POST",
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             query: `
    //                 query getAllQuotes{
    //                 quotes{
    //                     name,
    //                     by{
    //                         _id
    //                         firstName
    //                     }
    //                     }
    //                 }
    //             `
    //         })
    //     }).then(res => res.json())
    //         .then(data => console.log(data))
    // }, [])
    const { loading, error, data } = useQuery(GET_ALL_QUOTES);
    if (loading) return <h1>Lodaing</h1>

    if (error) {
        console.log(error.message)
    }
    return (
        <div className=" m-2 p-2 container mx-auto">
            <h3 className=" font-bold p-3"> Quotes...</h3> <hr />
            {
                data.quotes.map((quote, index) => {
                    return (
                        <blockquote key={index} className=" mt-2">
                            <h6>{quote.name}</h6>
                            <Link to={`/profile/${quote.by._id}`}><p className="right-align mr-6">~{quote.by.firstName}</p></Link>
                        </blockquote>
                    )
                })
            }
        </div>
    )
}

export default Home