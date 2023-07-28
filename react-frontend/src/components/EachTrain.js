import { useParams } from "react-router-dom";
import EachTrainCard from "./EachTrainCard";
import axios from 'axios';
import { useEffect, useState } from "react";

const EachTrain = () => {
    const params = useParams();
    console.log(params);
    
    useEffect(() => {
        fetchData();
    }, []);

    const defaultTrain = 
    { 
        trainNumber: "", 
        trainName: "",
        seatsAvailable:{
            AC: 0,
            sleeper: 0
        },
        price:{
            AC: 0,
            sleeper: 0
        },
        departureTime:{
            Hours: 0,
            Minutes: 0,
            Seconds:0,
        },
        delayedBy: 0

    }

    const [trains, setTrains] = useState(defaultTrain);


    const fetchData = async() =>{
        const res = await axios.get('http://localhost:4000/api/getTrains');
        const data = res.data

        const train = data.find((train) => train.trainNumber === params.id);
        console.log(train);
        setTrains(train);
    }

    return(<>
        <h1 className="font-extrabold ml-[50px] text-xl text-teal-700">Train Details</h1>
        <EachTrainCard train={trains} />
    </>
    )
}

export default EachTrain;