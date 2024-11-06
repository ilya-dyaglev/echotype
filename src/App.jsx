import './App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';
import { useState } from 'react';
import {generateClient} from 'aws-amplify/data';
/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */

const client = generateClient();

function App() {

    const [activeMode, setActiveMode] = useState('short');
    const [textData, setTextData] = useState('')

    const fetchData = async () => {
        return await client.models.BookMetadata.list()
    };

    console.log(fetchData());

    return (
        <div className="container">
            <Header setActiveMode={setActiveMode} setTextData={setTextData}/>
            <Main activeMode={activeMode} textData={textData}/>
            <Footer/>
        </div>
    )
}

export default App
