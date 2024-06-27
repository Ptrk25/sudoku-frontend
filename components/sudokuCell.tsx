import { KeyboardEvent, MutableRefObject } from "react";
import { GameField } from "../types";

interface SudokuCellProps
{
    checkInput: (event: KeyboardEvent<HTMLInputElement>, row: number, column: number) => void;
    selectHandler: (row: number, column: number) => void;
    inputRefs: MutableRefObject<Array<Array<React.RefObject<HTMLInputElement>>>>
    sudoku: GameField[][];
    row: number;
    column: number;
}
/* tabindex="-1" */

export function SudokuCell({ checkInput, inputRefs, selectHandler, sudoku, row, column }: SudokuCellProps)
{
    const cell: GameField = sudoku[row][column];

    return (
        <td
            className={
                `sudoku__field 
                ${cell.predefined ? "predefined" : ""}
                ${cell.invalid ? "invalid" : ""}
                ${cell.highlight ? "highlight" : ""}
                `
            }
            key={`tableCell${row}${column}`}
        >
            <input
                type="text"
                ref={inputRefs.current[row][column]}
                maxLength={1}
                tabIndex={cell.predefined ? -1 : 0}
                onKeyDown={(evt) => checkInput(evt, row, column)}
                onFocus={() => selectHandler(row, column)}
                onBlur={() => selectHandler(-1, -1)}
                value={sudoku[row][column].number}
                readOnly
            >
            </input>
        </td>
    );
    /*
        return (
            <>
                <td
                    className={`__game_field ${options}`}
                >
                    <input type="text" onKeyDown={() => checkInput(idx)} value={sudoku[idx].number}></input>
                </td>
            </>
        )*/
}