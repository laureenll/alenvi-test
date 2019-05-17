const { getVersionOfSubscribeByDate } = require('./exercise1/exercise1');

const date = '2019/02/16';
const customer = {
  _id: '1234567890',
  identity : { lastname : 'X' },
  subscription: {
    _id: 'qwertyuio',
    service: {
      name: 'Aide à l\'autonomie',
    },
    versions: [
      { startDate: '2019/04/15', unitTTCPrice: 22 },
      { startDate: '2019/02/01', unitTTCPrice: 24 },
      { startDate: '2019/03/01', unitTTCPrice: 21 },
    ],
  },
};
const version = getVersionOfSubscribeByDate(date, customer.subscription);
// console.log(`Mme X est actuellement dans la version : \n ${version}`);

console.log('version', version);