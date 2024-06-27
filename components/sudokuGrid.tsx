import { ChangeEvent, Dispatch, KeyboardEvent, MutableRefObject, SetStateAction, SyntheticEvent } from "react";
import { GameField } from "../types";
import { SudokuLoading } from "./sudokuLoading";
import { SudokuRow } from "./sudokuRow";

interface SudokuGridProps
{
    sudoku: GameField[][];
    inputRefs: MutableRefObject<Array<Array<React.RefObject<HTMLInputElement>>>>;
    isLoading: boolean;
    setSudoku: Dispatch<SetStateAction<GameField[][]>>;
}

export function SudokuGrid({ sudoku, inputRefs, setSudoku, isLoading }: SudokuGridProps)
{

    const checkInput = (event: KeyboardEvent<HTMLInputElement>, row: number, column: number) =>
    {
        let newArr = [...sudoku];
        let invalid = false;

        if(event.code === "ArrowRight") {
            if (column === 8) {
                return;
            }
            inputRefs.current[row][column+1].current?.focus();
        }
        if(event.code === "ArrowLeft") {
            if (column === 0) {
                return;
            }
            inputRefs.current[row][column-1].current?.focus();
        }
        if(event.code === "ArrowUp") {
            if (row === 0) {
                return;
            }
            inputRefs.current[row-1][column].current?.focus();
        }
        if(event.code === "ArrowDown") {
            if (row === 8) {
                return;
            }
            inputRefs.current[row+1][column].current?.focus();
        }

        if(event.code === "Escape") {
            inputRefs.current[row][column].current?.blur();
            return;
        }


        // Nur Zahlen von 1-9
        if (!event.key.match("[1-9]") && event.key !== "Delete" && event.key !== "Backspace" && event.key.length > 0)
        {
            console.log("Return")
            return;
        }

        // Predefined
        if(sudoku[row][column].predefined) {
            return;
        }

        // Zeilen
        sudoku[row].map((v, colIdx) =>
        {
            if (event.key === v.number && colIdx !== column && v.number.length > 0)
            {
                invalid = true;
            }

        });

        // Spalten
        sudoku.map((v, rowIdx) =>
        {
            if (event.key === v[column].number && rowIdx !== row && v[column].number.length > 0)
            {
                invalid = true;
            }
        });

        // Blöcke
        sudoku.map((sRow, rowIdx) =>
        {
            sRow.map((sCell, colIdx) =>
            {
                if (event.key === sCell.number &&
                    rowIdx !== row &&
                    colIdx !== column &&
                    sudoku[row][column].block === sCell.block &&
                    sCell.number.length > 0
                )
                {
                    invalid = true;
                }
            })
        });

        newArr[row][column].invalid = invalid;

        if (event.key === "Escape" || event.key === "Delete" || event.key === "Backspace")
        {
            newArr[row][column].number = "";
        } else {
            newArr[row][column].number = event.key;
        }

        setSudoku(newArr);
    }

    const resetHighlight = () =>
    {
        let tempSudoku = [...sudoku];

        // Reset Highlight
        sudoku.map((sRows, rowIdx) =>
        {
            sRows.map((cell, colIdx) =>
            {
                tempSudoku[rowIdx][colIdx].highlight = false;
            });
        });

        setSudoku(tempSudoku);
    }

    const selectHandler = (row: number, column: number) =>
    {

        let tempSudoku = [...sudoku];

        // Reset Highlight
        resetHighlight();

        if (row < 0 || column < 0)
        {
            return;
        }

        // Set Highlight
        // Zeilen
        sudoku[row].map((v, colIdx) =>
        {
            tempSudoku[row][colIdx].highlight = true;
        });

        // Spalten
        sudoku.map((v, rowIdx) =>
        {
            tempSudoku[rowIdx][column].highlight = true;
        });

        // Blöcke
        sudoku.map((sRows, rowIdx) =>
        {
            sRows.map((sCell, colIdx) =>
            {
                if (sudoku[row][column].block === sCell.block)
                {
                    tempSudoku[rowIdx][colIdx].highlight = true;
                }
            })
        });

        setSudoku(tempSudoku);
    }

    const generateGrid = () =>
    {
        return (
            [...Array(9)].map((v, row) =>
            {
                return (
                    <tr className="sudoku__row" key={`tableRow${row}`}>
                        <SudokuRow row={row} sudoku={sudoku} inputRefs={inputRefs} checkInput={checkInput} selectHandler={selectHandler} key={`sudokuRow${row}`} />
                    </tr>
                )
            })
        )
    }

    return (
        <div className="sudoku__cgrid">
            <SudokuLoading isLoading={isLoading} />
            <table className="sudoku__grid">
                <tbody>
                    {generateGrid()}
                </tbody>
            </table>
        </div>
    )
}