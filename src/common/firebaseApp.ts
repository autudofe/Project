import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/auth';
import appInit from 'firebase';
import firebaseConfig from './firebaseConfig';

const app = firebase.initializeApp(firebaseConfig);

/* export default app; */

export default !appInit.apps.length
  ? appInit.initializeApp(firebaseConfig)
  : appInit.app();

export const firestore = appInit.firestore();
