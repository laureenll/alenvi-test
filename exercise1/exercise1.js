const moment = require('moment');

const getVersionOfSubscribeByDate = (date, subscription) => {
  const searchedDate = moment(date, "YYYY/MM/DD");
  const allVersions = (subscription.versions || []).map(v => {
    const clone = { ...v };
    clone.startDate = moment(v.startDate, "YYYY/MM/DD");
    return clone;
  }).sort((a, b) => b.startDate.valueOf() - a.startDate.valueOf())

  let beginDate = moment();

  let versions = allVersions.map(v => {
    if (searchedDate.isBetween(v.startDate, beginDate)) {
      return v;
    } else {
      beginDate = v.startDate;
      return null;
    }
  }).filter(v => v !== null);

  return versions.length > 0 ? versions[0] : null;
};

module.exports.getVersionOfSubscribeByDate = getVersionOfSubscribeByDate;