import React, { useState, useEffect } from 'react';

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries/IN',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
};

const LocationSelector = () => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [isLoadingStates, setIsLoadingStates] = useState(true);
    const [isLoadingCities, setIsLoadingCities] = useState(true);

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = () => {
        setIsLoadingStates(true);
        fetch(`${config.cUrl}/states`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setStates(data);
                setIsLoadingStates(false);
            })
            .catch(error => {
                console.error('Error loading states:', error);
                setIsLoadingStates(false);
            });
    };

    const loadCities = (stateCode) => {
        setIsLoadingCities(true);
        fetch(`${config.cUrl}/states/${stateCode}/cities`, {
            headers: { "X-CSCAPI-KEY": config.ckey }
        })
            .then(response => response.json())
            .then(data => {
                setCities(data);
                setIsLoadingCities(false);
            })
            .catch(error => {
                console.error('Error loading cities:', error);
                setIsLoadingCities(false);
            });
    };

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        loadCities(e.target.value);
    };

    return (
        <div>
            <label>
                State
                <select
                    className='state'
                    name="state"
                    onChange={handleStateChange}
                    disabled={isLoadingStates}
                    value={selectedState}
                >
                    <option value="">Select State</option>
                    {states.map(state => (
                        <option key={state.iso2} value={state.iso2}>{state.name}</option>
                    ))}
                </select>
            </label>
            <label>
                City :
                <select
                    className='city'
                    name="city"
                    disabled={isLoadingCities || !selectedState}
                >
                    <option value="">Select City</option>
                    {cities.map(city => (
                        <option key={city.iso2} value={city.iso2}>{city.name}</option>
                    ))}
                </select>
            </label>
        </div>
    );
};

export default LocationSelector;
