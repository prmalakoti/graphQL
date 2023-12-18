import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { CREATE_QUOTE } from '../gqlOperations/mutation';
import { GET_ALL_QUOTES } from '../gqlOperations/queries';

const Quote = () => {

    const [quote, setQuote] = useState();
    const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            'getAllQuotes',
            'getMyProfile'
        ]
    })
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(quote);
        createQuote({
            variables: {
                name: quote
            }
        })
        setQuote()
    }
    if (loading) return <h1>Lodaing</h1>
    return (
        <div className=" m-2 p-2 w-6/12 container mx-auto">
            {
                error &&
                <div className='red'>
                    {error.message}
                </div>
            }

            {
                data && data.user &&
                <div className='green'> Successfully saved the quotes </div>
            }
            <div className=' font-bold mb-2'>Create Quotes</div> <hr />
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='Enter Quote'
                    value={quote}
                    name="quote"
                    onChange={(e) => setQuote(e.target.value)}
                    required
                />
                <button type="submit" className='bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-md'>Submit</button>
            </form>
        </div>
    )

}

export default Quote