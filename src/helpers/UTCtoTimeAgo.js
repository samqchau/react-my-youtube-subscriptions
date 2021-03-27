function UTCtoTimeAgo(UTCTimestring) {
  let date = new Date(UTCTimestring);
  let timeDifference = Math.abs(date - Date.now());
  if (timeDifference > 31556952000) {
    let numYears = Math.floor(timeDifference / 31556952000);
    return `${numYears} ${numYears > 1 ? 'years' : 'year'}`;
  } else if (timeDifference > 86400000) {
    let numDays = Math.floor(timeDifference / 86400000);
    return `${numDays} ${numDays > 1 ? 'days' : 'day'}`;
  } else if (timeDifference > 3600000) {
    let numHours = Math.floor(timeDifference / 3600000);
    return `${numHours} ${numHours > 1 ? 'hours' : 'hour'}`;
  } else if (timeDifference > 60000) {
    let numMinutes = Math.floor(timeDifference / 60000);
    return `${numMinutes} ${numMinutes > 1 ? 'minutes' : 'minute'}`;
  } else {
    let numSeconds = Math.floor(timeDifference > 1000);
    return `${numSeconds} ${numSeconds > 1 ? 'seconds' : 'second'}`;
  }
}

export default UTCtoTimeAgo;
