export default function (jogs) {
  function distance(amt, unit) {
    return amt * (unit === 'km' ? 1 : 1.60934);
  }
  function time(amt, unit) {
    return amt * (unit === 'min' ? 60 : 1);
  }

  const totDistance = jogs.reduce((a, j) => a + distance(j.distance, j.distanceFormat), 0);
  const totTime = jogs.reduce((a, j) => a + time(j.time, j.timeFormat), 0);

  return {
    totDistance,
    totTime,
    aveDistance: totDistance / jogs.length,
    aveTime: totTime / jogs.length,
    aveSpeed: totDistance / totTime,
  };
}

