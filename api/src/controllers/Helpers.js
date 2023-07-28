const findTimeDiff = (currentTime,departureTime) => {
    const diff = departureTime - currentTime;
    const diffInMinutes = Math.floor(diff / 60);
    return diffInMinutes;
}

module.exports = {findTimeDiff};