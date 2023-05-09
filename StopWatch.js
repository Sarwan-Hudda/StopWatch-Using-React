import React, { useState, useRef } from 'react';
export default function Stopwatch() {
    const [elapsedTime, setElapsedTime] = useState({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const intervalRef = useRef(null);
    const [laps, setLaps] = useState([]);

    function handleStart() {
        intervalRef.current = setInterval(() => {
            setElapsedTime(prevElapsedTime => {
                const newElapsedTime = { ...prevElapsedTime };
                newElapsedTime.milliseconds += 10;
                if (newElapsedTime.milliseconds >= 1000) {
                    newElapsedTime.seconds += 1;
                    newElapsedTime.milliseconds -= 1000;
                }
                if (newElapsedTime.seconds >= 60) {
                    newElapsedTime.minutes += 1;
                    newElapsedTime.seconds -= 60;
                }
                if (newElapsedTime.minutes >= 60) {
                    newElapsedTime.hours += 1;
                    newElapsedTime.minutes -= 60;
                }
                return newElapsedTime;
            });
        }, 10);
    }

    function handlePause() {
        clearInterval(intervalRef.current);
    }

    function handleReset() {
        clearInterval(intervalRef.current);
        setElapsedTime({ hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
        setLaps([]);
    }

    function handleLap() {
        setLaps(prevLaps => [...prevLaps, elapsedTime]);
    }

    return (
        <div className='container'>
            <h1 className='m-5 text-center text-purple'>StopWatch</h1>
            <h1 className='d-flex justify-content-center'>{elapsedTime.hours.toString().padStart(2, '0')}:{elapsedTime.minutes.toString().padStart(2, '0')}:{elapsedTime.seconds.toString().padStart(2, '0')}:{elapsedTime.milliseconds.toString().padStart(2, '0')}</h1>
            <div className='container d-flex justify-content-center'>
                <button onClick={handleStart} className='btn btn-success m-3'>Start</button>
                <button onClick={handlePause} className='btn btn-primary m-3'>Pause</button>
                <button onClick={handleLap} className='btn btn-warning m-3'>Lap</button>
                <button onClick={handleReset} className='btn btn-danger m-3'>Reset</button>
            </div>
            <div className='container ms-5'>
            <table class = 'table'>
                <thead>
                    <tr>
                        <th>Lap</th>
                        <th>Hours</th>
                        <th>Minutes</th>
                        <th>Seconds</th>
                        <th>Milliseconds</th>
                    </tr>
                </thead>
                <tbody>
                    {laps.map((lap, index) => (
                        <tr key={index}>
                            <td class ='class="w-25'>{index + 1}</td>
                            <td class ='class="w-25'>{lap.hours.toString().padStart(2, '0')}</td>
                            <td class ='class="w-25'>{lap.minutes.toString().padStart(2, '0')}</td>
                            <td class ='class="w-25'>{lap.seconds.toString().padStart(2, '0')}</td>
                            <td  >{lap.milliseconds.toString().padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

