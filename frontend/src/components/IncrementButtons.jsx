

export default function IncrementButtons ({ index, field, handleIncrement, handleReset}) {

    const increments = [1,5,10,100,-1];

    return (
        <div className="flex-row space-x-4 py-2 ">
            {increments.map((inc) => (
                <button 
                    key = {inc}
                    onClick = {() => handleIncrement(index, field, inc)}
                    className = 'card-button'
                >
                    {inc}
                </button>
            ))}
            <button 
                onClick={() => handleReset(index, field)} className = 'card-button'
            >
                Reset 
            </button>
        </div>
    );
};

