import '../styles/Main.css';
import ProgressContainer from './ProgressContainer';
import TypingArea from './TypingArea';

interface MainProps {
    activeMode: string;
    textData: string;
    fetchedData: Record<string, any>; // Direct JSON object from App
}

function Main({ activeMode, textData, fetchedData }: MainProps) {
    return (
        <div className="main">
            <ProgressContainer currentNum={1} endNum={101} />
            <TypingArea activeMode={activeMode} textData={textData} />
            <div>
                <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
            </div>
        </div>
    );
}

export default Main;
