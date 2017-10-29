import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  params: {
    uname: 'spaceInvader',
    pwd: 'AllYourBaseAreBelongToUs',
    dbinstance: '@ds121225.mlab.com:21225/spaceinvaders',
    spaces: [
      'Lounge',
      'Conference room',
    ],
  },
});

export { api as default };
