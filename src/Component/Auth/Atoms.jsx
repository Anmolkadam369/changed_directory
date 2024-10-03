import { atom } from 'recoil';

export const tokenState = atom({
  key: 'tokenState', 
  default: '',
});

export const userIdState = atom({
    key: 'userIdState', 
    default: '',
  });
  export const typeState = atom({
    key: 'typeState', 
    default: '',
  });