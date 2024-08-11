import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WorkoutFeed ({currentUsername}) {

    const [workouts, setWorkouts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchWorkouts();
    },[]);

    const fetchWorkouts = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/workouts?page=${page}&limit=${itemsPerPage}`);
            const fetchWorkouts = response.data.map(workout => ({
                ...workout,
                postDate: new Date(workout.postDate).toLocaleDateString(), 
            }));

            //combine workouts by id to avoid displaying duplicates
            const uniqueWorkouts = [...new Set([...workouts, ...fetchWorkouts].map(workout => workout.id))]
            .map(id => [...workouts, ...fetchWorkouts].find(workout => workout.id === id));
            setWorkouts(uniqueWorkouts);

            //setWorkouts((prevWorkouts) => [...prevWorkouts, ...response.data]);
            if(response.data.length < itemsPerPage) {
                setHasMore(false);
            }
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error('Error fetching workouts:', error);
        }
    };

    //gather workouts by date & user to assemble under corresponding date & user
    const groupWorkoutsByDateAndUser = workouts.reduce((acc, workout) => {
        if(!acc[workout.postDate]) {
            acc[workout.postDate] = [];
        }
        if(!acc[workout.postDate][workout.username]) {
            acc[workout.postDate][workout.username] = [];
        }
        acc[workout.postDate][workout.username].push(workout);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupWorkoutsByDateAndUser).sort((a,b) => new Date(b) - new Date(a));

    return (
        <div className="root flex">
            <div className="w-1 ml-auto bg-zinc-500"></div>
            <div className="overflow-auto">
                <InfiniteScroll
                    dataLength={workouts.length}
                    next={fetchWorkouts}
                    hasMore={hasMore}
                    loader={<h1 className="px-5 opacity-5">Loading...</h1>}
                    className="workout-feed"
                >
                    {sortedDates.map((date) => (
                        <div key={date} className="date-group">
                            <div className="date-divider m-2 p-3 rounded bg-zinc-700">{date}</div>
                            {Object.keys(groupWorkoutsByDateAndUser[date]).sort().map((username) => (
                            <div key={username} className="user-group">      
                                    <h1 className="user-divider mx-3 mt-3 p-3 rounded uppercase bg-slate-500 font-bold">{username}</h1>
                                    {groupWorkoutsByDateAndUser[date][username].map((workout, index) => (
                                        <div key={index} className=' mx-4 my-1 rounded pt-0.5 grid grid-cols-6 bg-zinc-900 overflow-hidden'>
                            
                                            <div className='h-1 w-4 ml-3 my-3 bg-yellow-500 rounded'></div>
                                            
                                            <div className=" col-span-1 overflow-hidden mr-5">
                                                <h3 className="uppercase">{workout.exerciseName}</h3>
                                            </div>

                                            <div className=" col-span-1 overflow-hidden mr-5">
                                                {workout.weight != null && workout.weight !== 0 && (
                                                    <p>Wt: {workout.weight} LB</p> 
                                                )}
                                            </div>
                                            
                                            <div className=" col-span-1 overflow-hidden mr-5">
                                                {workout.reps != null && workout.reps !== 0 && (
                                                    <p>Reps: {workout.reps}</p> 
                                                )}
                                            </div>
                                            <div className=" col-span-1 overflow-hidden mr-5">
                                                {workout.sets != null && workout.sets !== 0 && (
                                                    <p>Sets: {workout.sets}</p> 
                                                )}
                                            </div>

                                            <p className="hidden">ID: {workout.id}</p>

                                            {workout.username === currentUsername && (
                                                <div className="flex col-span-1 overflow-hidden">
                                                    <div className="px-4 mx-2 rounded opacity-15  hover:opacity-100">
                                                        <button className="">
                                                            Edit
                                                        </button>
                                                    </div>
                                                    <div className="px-4 mx-2 rounded opacity-15 hover:opacity-100">
                                                        <button className="">
                                                            Del
                                                        </button>
                                                    </div> 
                                                </div>   
                                            )}     
                                                                                         
                                            <p className="mx-2 hidden">Date: {new Date(workout.postDate).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                    <div className="h-1 mx-3 mt-1.5 rounded bg-zinc-700"></div>
                            </div> 
                            ))}                    
                        </div>
                    ))}
                </InfiniteScroll> 
            </div>
        </div>
    );
}