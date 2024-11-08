import '../styles/Main.css';
import ProgressContainer from './ProgressContainer';
import TypingArea from './TypingArea';

interface MainProps {
    activeMode: string; // Not used directly in this component
    textData: string;
    fetchedData: Record<string, any>;
}

function Main({ textData, fetchedData }: MainProps) {
    return (
        <div className="main">
            <ProgressContainer currentNum={1} endNum={101} />
            <TypingArea textData={textData} />
            <div>
                <pre>{`Current DB capacity: ${fetchedData.data?.length} books!`}</pre>
            </div>
        </div>
    );
}

export default Main;
