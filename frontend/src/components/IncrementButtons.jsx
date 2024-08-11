export default function IncrementButtons ({ index, field, handleIncrement, handleReset}) {

    const increments = [1,5,10,100,-1];

    return (
        <div className="flex-row space-x-4 py-1">
            {increments.map((inc) => (
                <button 
                    key = {inc}
                    onClick = {() => handleIncrement(index, field, inc)}
                    className = 'p-3 bg-zinc-600 rounded-2xl w-14 hover:bg-zinc-800'
                >
                    {inc}
                </button>
            ))}
            <button 
                onClick={() => handleReset(index, field)} 
                className = 'p-3 bg-yellow-600 rounded w-14 hover:bg-yellow-800 hidden'
            >
                Clear
            </button>
        </div>
    );
};

