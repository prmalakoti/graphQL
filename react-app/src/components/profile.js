import { useQuery } from "@apollo/client"
import { useNavigate } from "react-router-dom";
import { GET_MY_PROFILE } from "../gqlOperations/queries"

const Profile = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_MY_PROFILE);
    if (!localStorage.getItem('token')) {
        navigate('/login');
    }
    if (loading) return <h1>Lodaing</h1>


    return (
        <div className=" m-2 p-2 container mx-auto">
            {
                error &&
                <div className='red'>
                    {error.message}
                </div>
            }
            <div className=' font-bold mb-2 align-middle'>Profile...</div> <hr />
            <div className=" container mx-1">
                <img className=' h-60 w-52' src={`https://robohash.org/${data.user.firstName}.png`} alt=''></img>
                <h5>{data.user.firstName} {data.user.lastName}</h5>
                <h5>{data.user.email}</h5>
            </div>
            <h3 className=" font-bold p-4"> Quotes...</h3> <hr />
            <div className=" p-2 m-2">
                {
                    data.user.quotes.map((quote, index) => {
                        return (
                            <blockquote key={index} className=" mt-2">
                                <h6>{quote.name}</h6>
                            </blockquote>
                        )
                    })
                }


            </div>
        </div>
    )
}

export default Profile