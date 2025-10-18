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
            <button onClick={handleClick} type="button" className="bg-gray-300 border-4 border-t-white border-l-white border-r-gray-800 border-b-gray-800 py-2 px-8 font-bold text-sm tracking-wide hover:bg-gray-400 active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white">Select</button>
        </div>
        <p className='text-white'>{Text}</p>

        </>
    )
}

export default Select