import './App.css';
import Header from './components/Header.tsx';
import Main from './components/Main';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import type { Schema } from '../amplify/data/resource.ts';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();
const countDown = 30;

function App() {
    const [activeMode, setActiveMode] = useState('short');
    const [textData, setTextData] = useState('');
    const [fetchedData, setFetchedData] = useState<{ data?: any[] }>({});
    const [counter, setCounter] = useState(countDown); // 30-second countdown

    const fetchData = async () => {
        try {
            const data = await client.models.BookMetadata.list();
            setFetchedData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch

        const intervalId = setInterval(() => {
            fetchData();
            setCounter(countDown); // Reset counter after each fetch
        }, countDown*1000); // Fetch data every 60 seconds

        const countdownId = setInterval(() => {
            setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
        }, 1000); // Decrease counter every second

        // Cleanup intervals on component unmount
        return () => {
            clearInterval(intervalId);
            clearInterval(countdownId);
        };
    }, []);

    return (
        <div className="container">
            <Header
                setActiveMode={setActiveMode}
                setTextData={setTextData}
                setFetchedData={setFetchedData}
            />


            <Main
                activeMode={activeMode}
                fetchedData={fetchedData}
                textData={textData}
            />

            <div className="load-bar-container">
                <div
                    className="load-bar"
                    style={{width: `${(countDown - counter) * (100 / 60)}%`}}
                />
                <p>Next load in: {counter}s</p>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
