import React from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
const LocationSearchPanel=({ suggestions, setVehiclePanel, setPanelOpen, setPickupLocation, setDropLocation, activeField })=>{
    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickupLocation(suggestion.address)
        } else if (activeField === 'destination') {
            setDropLocation(suggestion.address)
        }
        // setVehiclePanel(truce)
        // setPanelOpen(false)
    }
    return (
        <div>
            {/* Display fetched suggestions */}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} style={{border:"1px solid gray"}} className='flex gap-4 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 mx-2 justify-start'>
                        <h2 className='h-8 w-8 flex items-center justify-center rounded-xl m-2 mt-1'><PushPinIcon /></h2>
                        <h4 className='text-sm'>{elem.address}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel