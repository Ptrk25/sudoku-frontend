import { createRef, useEffect, useRef, useState } from "react";
import { GameField } from "../types";
import { GameControls } from "./gameControls";
import { GameInfo } from "./gameInfo";
import { SudokuGrid } from "./sudokuGrid";
import { preProcessFile } from "typescript";

export function Game()
{
    // Das hier nie machen, da sonst [row][0..n] alles gleich ist
    const [sudoku, setSudoku] = useState<GameField[][]>(Array.from(Array(9), _ => Array(9).fill({
        invalid: false,
        predefined: false,
        number: "",
        block: 0,
    })));


    const inputRefs = useRef<Array<Array<React.RefObject<HTMLInputElement>>>>(
        Array.from({length: 9}, () => (
            Array.from({length:9}, () => createRef())
        ))
    );

    const [newGame, setNewGame] = useState<boolean>(false);
    const [gameRunning, setGameRunning] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() =>
    {
        const interval = setInterval(() =>
        {
            if (gameRunning)
            {
                setSeconds(seconds => seconds + 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [gameRunning]);

    const getSudokuData = async () =>
    {
        const res = await fetch("/api/sudoku");
        const response: { sudoku: GameField[][] } = await res.json();

        Promise.resolve(response).then((sudoku) =>
        {
            setSudoku(sudoku.sudoku);
            setIsLoading(false);
            setGameRunning(true);
        })
    }

    const checkWin = (): boolean =>
    {
        let won = true;

        sudoku.flatMap(v => v).map((cell) =>
        {
            if (cell.number === "" || cell.invalid)
            {
                won = false;
            }

        });

        return won;
    }

    useEffect(() =>
    {
        if (checkWin() === true)
        {
            setGameRunning(false);
            console.log("Won");
        }
    }, [sudoku])

    useEffect(() =>
    {
        setIsLoading(true);
        setGameRunning(false);
        setSeconds(0);
        getSudokuData();
    }, [newGame])

    return (
        <div className="game">
            <GameInfo seconds={seconds} />
            <SudokuGrid sudoku={sudoku} inputRefs={inputRefs} setSudoku={setSudoku} isLoading={isLoading} />
            <GameControls newGame={newGame} setNewGame={setNewGame} isLoading={isLoading} />
        </div>
    )
}