import { Dispatch, SetStateAction } from "react";
import { HiOutlineLightBulb } from "react-icons/hi"
import { IoReloadOutline } from "react-icons/io5"

interface GameControlsProps
{
    newGame: boolean
    isLoading: boolean
    setNewGame: Dispatch<SetStateAction<boolean>>;
}

export function GameControls({ newGame, setNewGame, isLoading }: GameControlsProps)
{
    return (
        <>
            <div className="game__controls">
                <button className={`game__btn btnNewGame
                    ${isLoading ? "btnInactive" : ""}
                `}
                    onClick={() => setNewGame(!newGame)}
                    tabIndex={-1}
                >
                    <IoReloadOutline size={20} />
                    <span>Neues Spiel</span>
                </button>
                <button className={`game__btn btnHint
                    ${isLoading ? "btnInactive" : ""}
                `}
                    tabIndex={-1}
                >
                    <HiOutlineLightBulb size={20} />
                    <span>Hinweis</span>
                </button>
            </div>
        </>
    )
}