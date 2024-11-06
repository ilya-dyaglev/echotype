import './App.css';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';
import { useState } from 'react';


function App() {

    const [activeMode, setActiveMode] = useState('short');
    const [textData, setTextData] = useState('')

    return (
        <div className="container">
            <Header setActiveMode={setActiveMode} setTextData={setTextData}/>
            <Main activeMode={activeMode} textData={textData}/>
            <Footer/>
        </div>
    )
}

export default App
