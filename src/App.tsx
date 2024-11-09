import './App.css';
import Header from './components/Header.tsx';
import Main from './components/Main';
import Footer from './components/Footer';
import { useState, useEffect, useCallback } from 'react';
import type { Schema } from '../amplify/data/resource.ts';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();
const COUNTDOWN_DURATION = 15; // Countdown duration in seconds
const TEST_LIMIT = 10000;

function App() {
    const [activeMode, setActiveMode] = useState('short');
    const [textData, setTextData] = useState('');
    const [fetchedData, setFetchedData] = useState<{ data?: any[] }>({});
    const [counter, setCounter] = useState(COUNTDOWN_DURATION);

    const fetchData = useCallback(async () => {
        try {
            const data = await client.models.BookMetadata.list({limit: TEST_LIMIT});
            const now = new Date(Date.now()).toISOString();
            console.log(`Fetched at: ${now} \n`, data.data)
            setFetchedData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    useEffect(() => {
        const fetchInterval = setInterval(() => {
            fetchData();
            setCounter(COUNTDOWN_DURATION); // Reset counter after each fetch
        }, COUNTDOWN_DURATION * 1000);

        const countdownInterval = setInterval(() => {
            setCounter((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => {
            clearInterval(fetchInterval);
            clearInterval(countdownInterval);
        };
    }, [fetchData]);

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
                    style={{ width: `${(COUNTDOWN_DURATION - counter) * 100 / COUNTDOWN_DURATION}%` }}
                />
                <p>Next load in: {counter}s</p>
            </div>
            <Footer />
        </div>
    );
}

export default App;