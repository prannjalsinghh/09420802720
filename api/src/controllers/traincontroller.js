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
    const finalData = []

    const currTime = new Date();
    const hours = currTime.getHours();
    const minutes = currTime.getMinutes();
    const seconds = currTime.getSeconds();
    const currentTime = hours * 60 * 60 + minutes *60 + seconds;

    trainData.forEach((ele) => {
        let depTime = ele.departureTime.Hours * 60 * 60 + ele.departureTime.Minutes *60 + ele.departureTime.Seconds;
        if(findTimeDiff(currentTime, depTime) > 30){
            finalData.push(ele);
        }
    });
  

    //sort on price
    finalData.sort((a,b) => {
        return (a.price.sleeper + a.price.AC) - (b.price.sleeper + b.price.AC) ;
    })

    //descending sort on tickets 
    // finalData.sort((a,b) => {
    //     return (b.seatsAvailable.sleeper + b.seatsAvailable.AC) - (a.seatsAvailable.sleeper + a.seatsAvailable.AC);
    // })

    //descending order of departure time

    // finalData.sort((a,b) => {
    //     let aTime = a.departureTime.Hours * 60 * 60 + a.departureTime.Minutes *60 + a.departureTime.Seconds;
    //     let bTime = b.departureTime.Hours * 60 * 60 + b.departureTime.Minutes *60 + b.departureTime.Seconds;
    //     return bTime - aTime;
    // })
    console.log(finalData);

}


module.exports = {getTrains};