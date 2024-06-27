import { FiClock } from "react-icons/fi";

interface GameInfoProps
{
    seconds: number;
}

export function GameInfo({ seconds }: GameInfoProps)
{
    let time = new Date(seconds * 1000).toISOString().slice(14, 19);
    return (
        <>
            <h1>Sudoku</h1>
            <div className="game__info">
                <FiClock size={22} /><span className="game__time">{time}</span>
            </div>
        </>
    )
}