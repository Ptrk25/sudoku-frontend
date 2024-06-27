import { KeyboardEvent, MutableRefObject } from "react";
import { GameField } from "../types";
import { SudokuCell } from "./sudokuCell";

interface SudokuRowProps
{
    checkInput: (event: KeyboardEvent<HTMLInputElement>, row: number, column: number) => void;
    inputRefs: MutableRefObject<Array<Array<React.RefObject<HTMLInputElement>>>>;
    selectHandler: (row: number, column: number) => void;
    sudoku: GameField[][];
    row: number;
}

export function SudokuRow({ checkInput, inputRefs, selectHandler, sudoku, row }: SudokuRowProps)
{

    return (
        <>
            {
                [...Array(9)].map((v, column) =>
                {
                    return (
                        <SudokuCell
                            row={row}
                            column={column}
                            inputRefs={inputRefs}
                            sudoku={sudoku}
                            checkInput={checkInput}
                            selectHandler={selectHandler}
                            key={`sudokuCell${row}${column}`}
                        />)
                })
            }
        </>
    )
}