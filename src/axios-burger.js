import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-1e64b.firebaseio.com/'
});
export default instance;
