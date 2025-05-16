import { useEffect, useState } from 'react';
//import styled from 'styled-components';

export default function Input() {

    const [carData, setCarData] = useState([]);

    const [years, setYears] = useState([]);
    const [makes, setMakes] = useState([]);
    const [models, setModels] = useState([]);
    const [productTypes, setProductTypes] = useState([]);

    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedProductType, setSelectedPT] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await fetch(`http://localhost:5000/Dataset`);
                const data = await response.json();
                setCarData(data);
                const uniqueYears = [...new Set(data.map(car => car.Year))].sort((a, b) => b - a); // removes dups by set rules, converts back to array, then sorted the years by descending
                setYears(uniqueYears);

            } catch (error) {
                console.error('error fetching data', error);
            }
        }
        fetchData().then();
    }, []);

    useEffect(() => {   // grabs and updates Make if the selected year changes
        if (selectedYear) {
            const filteredCars = carData.filter(car => car.Year === parseInt(selectedYear));
            const uniqueMakes = [...new Set(filteredCars.map(car => car.Make))].sort();
            setMakes(uniqueMakes);

            // must reset selections below to prevent invalid selections
            setSelectedMake('');
            setSelectedModel('');
            setModels([]);
            setProductTypes([]);
        }
    }, [carData, selectedYear]);

    useEffect( () => {      // grabs and updates Models when the selected make changes
        if (selectedYear && selectedMake) {
            const filteredCars = carData.filter(car => car.Year === parseInt(selectedYear) && car.Make === selectedMake);
            const uniqueModels = [...new Set(filteredCars.map(car => car.Model))].sort();
            setModels(uniqueModels);
            setSelectedModel('');
            setProductTypes([]);
        }

    }, [carData, selectedYear, selectedMake])

    useEffect(() => {
        if (selectedYear && selectedMake && selectedModel) {
            const filteredCars = carData.filter(car => car.Year === parseInt(selectedYear) && car.Make === selectedMake && car.Model === selectedModel);
            const uniquePT = [...new Set(filteredCars.map(car => car["Product Type"]))];
            setProductTypes(uniquePT)
        }

    }, [carData, selectedYear, selectedMake, selectedModel])

    const handleSubmit = (e) => {
        e.preventDefault();
        const match = carData.find(car => car.Year === parseInt(selectedYear) && car.Make === selectedMake && car.Model === selectedModel);
        if (match?.URL) {
            window.location.href = match.URL;
        } else {
            setErrorMessage('No URL found for this car');
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value={""}>Select Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>     // year in value goes into select, year in key for unique id
                        ))}
                    </select>
                </label>

                <label>
                    <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
                        <option value={""}>Select Make</option>
                        {makes.map(make => (
                            <option key={make} value={make}>{make}</option>
                        ))}
                    </select>
                </label>

                <label>
                    <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
                        <option value={""}>Select Model</option>
                        {models.map(model => (
                            <option key={model} value={model}>{model}</option>
                            ))}
                    </select>
                </label>

                <label>
                    <select value={selectedProductType} onChange={e => setSelectedPT(e.target.value)}>
                        <option value={""}> Select Product Type</option>
                        {productTypes.map(productType => (
                            <option key={productType} value={productType}>{productType}</option>
                        ))}
                    </select>
                </label>

                <button type={"submit"} disabled={!selectedModel}>Go to Product Page</button>
                {errorMessage && (
                    <div style={{ color: 'red'}}>
                        {errorMessage}
                    </div>
                )}
            </form>
        </>
    );
}