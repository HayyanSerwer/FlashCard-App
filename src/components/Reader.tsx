import { useState } from 'react'



function ReadComprehension(){

    return(
    <>  
        <div className='w-150 bg-gray-200 border-4 border-t-gray-50 border-l-gray-50 border-r-gray-800 border-b-gray-800 shadow-lg'>
            <div className='bg-blue-200 border-2 p-1'>
                <div className = "flex justify-end">
                    <button className='w-5 h-5 bg-gray-200 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 flex items-center justify-center text-xs font-bold hover:bg-gray-300'>X</button>
                    <button className='w-5 h-5 bg-gray-200 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 flex items-center justify-center text-xs font-bold hover:bg-gray-300'>□</button>
                    <button className='w-5 h-5 bg-gray-200 border-2 border-t-white border-l-white border-r-gray-800 border-b-gray-800 flex items-center justify-center text-xs font-bold hover:bg-gray-300'>-</button>
                </div>
            </div>
                <p className='text-white text-4xl text-center mt-4 m-5'>Im Frühling fahren viele Menschen gern mit dem Fahrrad.
                    Das Wetter ist oft sonnig, die Blumen beginnen zu blühen, und die Tage werden länger. Anna fährt jeden Morgen mit dem Rad zur Schule.
                    Sie braucht ungefähr 15 Minuten. Auf dem Weg sieht sie einen kleinen Park mit vielen bunten Tulpen.
                    Am Nachmittag fährt sie oft mit ihren Freunden zum Fluss. Dort machen sie ein Picknick und spielen Fußball.</p>


        </div>

    </>

    )

}

export default ReadComprehension