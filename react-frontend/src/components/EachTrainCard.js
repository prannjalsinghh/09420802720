const EachTrainCard = (props)=>{
    return(
        <div className="bg-gray-100 m-[40px] p-[20px] rounded-xl cursor-pointer" onClick={(e) => props.onClickHandler(props.train.trainNumber)}>
            <div className="">
                <h5 className="">Train Name : {props.train.trainName}</h5>
                <h6 className="">Train Number : {props.train.trainNumber}</h6>
                <p className="">Departure Time : {props.train.departureTime.Hours} : {props.train.departureTime.Minutes}</p>
                <p className="font-bold">Seats Available</p>
                <p>AC : {props.train.seatsAvailable.AC}   </p>
                <p className="">Sleeper : {props.train.seatsAvailable.sleeper}   </p>
                <p className="font-bold">Price</p>
                <p className= "">AC : {props.train.price.AC}</p>
                <p>Sleeper : {props.train.price.sleeper}</p>
                <p className="text-red-600">Delayed By: {props.train.delayedBy}</p>
            </div>
        </div>
    )
}
export default EachTrainCard;