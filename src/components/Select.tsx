import { useState } from 'react'

interface Prop{
    position : string;
}
    
function Select(){

    const [Text, setText] = useState("wasd");

    const handleClick = () => {
        const selection = window.getSelection();
        const text = selection ? selection.toString() : '';
        setText(text);

        }
    

    return(
        <>
        <div>
            <button onClick={handleClick} type="button" className="m-4 flex justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
            text-white font-semibold rounded-lg shadow-md hover:from-blue-600
            hover:to-indigo-700 hover:shadow-lg transition duration-300 ease-in-out">Select</button>
        </div>
        <p className='text-white'>{Text}</p>

        </>
    )
}

export default Select