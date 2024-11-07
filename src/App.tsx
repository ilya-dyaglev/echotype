import './App.css';
import Header from './components/Header.tsx';
import Main from './components/Main';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import { generateClient } from '@aws-amplify/data';

const client = generateClient();

function App() {
    const [activeMode, setActiveMode] = useState('short');
    const [textData, setTextData] = useState('');
    const [fetchedData, setFetchedData] = useState<Record<string, any>>({});

    const fetchData = async () => {
        try {
            const data = await client.models.BookMetadata.list();
            setFetchedData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Fetch data on component mount

    return (
        <div className="container">
            <Header setActiveMode={setActiveMode} setTextData={setTextData} setFetchedData={setFetchedData} />
            <Main activeMode={activeMode} textData={textData} fetchedData={fetchedData} />
            <Footer />
        </div>
    );
}

export default App;
