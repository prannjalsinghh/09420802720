import { useEffect, useState } from "react";
import EachTrainCard from "./EachTrainCard";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Trains = () => {
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() =>{
        const res = await axios.get('http://localhost:3000/api/getTrains');
        setTrains(res.data);
    }

    const onClickHandler = (trainNumber) =>{
        navigate(`/${trainNumber}`);
    }

    return(
        <>
        <h1 className="font-extrabold ml-[50px] text-xl text-teal-700">Trains</h1>

        {trains.map((train) => (
            <EachTrainCard train={train} key={train.trainNumber} onClickHandler={onClickHandler}/>
        ))} 

        </>
    )
}

export default Trains;