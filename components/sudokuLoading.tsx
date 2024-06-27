interface SudokoLoadingProps
{
    isLoading: boolean;
}

export function SudokuLoading({ isLoading }: SudokoLoadingProps)
{

    return (
        <>
            <div className={`overlay
                ${isLoading ? "" : "overlay__hidden"}
            `}
            >
                <div className="overlay__inner">
                    <div className="overlay__content"><span className="spinner"></span></div>
                </div>
            </div>
        </>
    )
}