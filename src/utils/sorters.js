export default term => {
  switch (term) {
    case ('date'):
      return function (a, b) {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);
        return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
      };
    case 'distance':
      return function (a, b) {
        const aDistance = a.distance * (a.distanceFormat === 'km' ? 1 : 1.60934);
        const bDistance = b.distance * (b.distanceFormat === 'km' ? 1 : 1.60934);
        return aDistance > bDistance ? -1 : aDistance < bDistance ? 1 : 0;
      };
    case 'time':
      return function (a, b) {
        const aDistance = a.time * (a.timeFormat === 'min' ? 60 : 1);
        const bDistance = b.time * (b.timeFormat === 'min' ? 60 : 1);
        return aDistance > bDistance ? -1 : aDistance < bDistance ? 1 : 0;
      };
    default:
      return function (a, b) { return 1; };
  }
};
