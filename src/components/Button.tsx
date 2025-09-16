import { useState } from 'react'

interface Prop{
    position : string;
}
    
function GenerateButton(){

    return(
        <>
        <div>
            <button type="button" className="m-4 flex justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold rounded-lg shadow-md hover:from-blue-600
            hover:to-indigo-700 hover:shadow-lg transition duration-300 ease-in-out">Generate</button>
        </div>

        </>
    )
}

export default GenerateButton