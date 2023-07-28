const fetch = require("node-fetch");
const { findTimeDiff } = require("./Helpers");
const getTrains = async  (req,res) =>{
    
    const userResponse = await fetch('http://20.244.56.144/train/auth',{
        method: 'POST',
        body: JSON.stringify({
            companyName: "Train Central",
            clientID: "3bed5750-a20a-4b00-96d5-cbbc7978fde6",
            clientSecret: "ySwyPabigedrbCac",
            ownerName: "Pranjal Singh",
            ownerEmail: "pranjalsingh531@gmail.com",
            rollNo: "09420802720"
    })
    })

    const userData = await userResponse.json();
    // console.log(userData);

    const trainResponse = await fetch('http://20.244.56.144/train/trains',{
        method: 'GET',
        headers: {
            "Authorization": `${userData.token_type} ${userData.access_token}`
        }
    })
    

    const trainData = await trainResponse.json();
    // console.log(trainData);

    //30min train ignore      //prev train ignore
    const trains = []

    const currTime = new Date();
    const hours = currTime.getHours();
    const minutes = currTime.getMinutes();
    const seconds = currTime.getSeconds();
    const currentTime = hours * 60 * 60 + minutes *60 + seconds;

    trainData.forEach((ele) => {
        let depTime = ele.departureTime.Hours * 60 * 60 + ele.departureTime.Minutes *60 + ele.departureTime.Seconds;
        if(findTimeDiff(currentTime, depTime) > 30){
            trains.push(ele);
        }
    });
  

    //sort on price   //descending sort on tickets available   //descending sort on departure time

    const now = new Date();
    const nowInMinutes = now.getHours() * 60 + now.getMinutes();
    const nowInMilliseconds = nowInMinutes * 60 * 1000;

    const allowedTimeWindowInMilliseconds = 12 * 60 * 60 * 1000;


    const trainsAfterAllowedTimeWindow = trains.filter(train => {
        const departureTime = train.departureTime.Hours * 60 * 60 * 1000 + train.departureTime.Minutes * 60 * 1000 + train.departureTime.Seconds * 1000;
    
        return departureTime - nowInMilliseconds < allowedTimeWindowInMilliseconds;
    });

    const trainsSorted = trainsAfterAllowedTimeWindow.sort((a, b) => {
        if (a.price.sleeper + a.price.AC !== b.price.AC + b.price.sleeper) {
            return a.price.sleeper + a.price.AC - b.price.sleeper - b.price.AC;
        } 
        if (a.seatsAvailable.sleeper + a.seatsAvailable.AC !== b.seatsAvailable.sleeper + b.seatsAvailable.AC) {
            return b.seatsAvailable.sleeper + b.seatsAvailable.AC - a.seatsAvailable.sleeper + a.seatsAvailable.AC;
        }
        const aDepartureTime = new Date(a.departureTime.Hours * 60 * 60 * 1000 + a.departureTime.Minutes * 60 * 1000 + a.departureTime.Seconds * 1000);
        const bDepartureTime = new Date(b.departureTime.Hours * 60 * 60 * 1000 + b.departureTime.Minutes * 60 * 1000 + b.departureTime.Seconds * 1000);

        const aDepartureTimeInMinutes = aDepartureTime.getHours() * 60 + aDepartureTime.getMinutes() + a.delayedBy;
        const bDepartureTimeInMinutes = bDepartureTime.getHours() * 60 + bDepartureTime.getMinutes() + b.delayedBy;
        return aDepartureTimeInMinutes - bDepartureTimeInMinutes;
    });

    res.status(200).json(trainsSorted);


}


module.exports = {getTrains};