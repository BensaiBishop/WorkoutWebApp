import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function WorkoutFeed () {

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

    const groupWorkouts = workouts.reduce((acc, workout) => {
        if(!acc[workout.postDate]) {
            acc[workout.postDate] = [];
        }
        acc[workout.postDate].push(workout);
        return acc;
    }, {});

    const sortedDates = Object.keys(groupWorkouts).sort((a,b) => new Date(b) - new Date(a));

    return (

        <InfiniteScroll
            dataLength={workouts.length}
            next={fetchWorkouts}
            hasMore={hasMore}
            loader={<h1>Loading...</h1>}
            className="workout-feed"
        >
            {sortedDates.map((date) => (
                <div key={date} className="date-group">
                    <div className="date-divider m-3 p-3 rounded-3xl bg-zinc-700 inline-block">{date}</div>
                    {groupWorkouts[date].map((workout, index) => (
                        <div key={index} className='bg-zinc-900 p-4 m-2 rounded flex'>
                        <h1 className='uppercase mx-2'>{workout.username}</h1>
                        <div className='w-1 mx-2 bg-yellow-500 rounded'></div>
                        <h2 className="mx-2">{workout.exerciseName}</h2>
                        <p className="mx-2">Weight: {workout.weight}</p>
                        <p className="mx-2">Reps: {workout.reps}</p>
                        <p className="mx-2">Sets: {workout.sets}</p>
                        <p>ID: {workout.id}</p>
                        <p className="mx-2">Date: {new Date(workout.postDate).toLocaleDateString()}</p>
                    </div>
                    ))}
                </div>
            ))}
        </InfiniteScroll> 
    );
}