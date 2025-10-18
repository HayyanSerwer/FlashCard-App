import { useState } from 'react'

interface Prop{
    position : string;
}
    
function GenerateButton(){

    return(
        <>
        <div>
            <button type="button" className="bg-gray-300 border-4 border-t-white border-l-white border-r-gray-800 border-b-gray-800 py-2 px-8 font-bold text-sm tracking-wide hover:bg-gray-400 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white">Generate</button>
        </div>

        </>
    )
}

export default GenerateButton