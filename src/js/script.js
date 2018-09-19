console.log('Script file working');

import React from 'react';
import ReactDOM from 'react-dom';
import GetSheetDone from 'get-sheet-done';
import Tabletop from 'tabletop';

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit?usp=sharing';

function getData() {
  console.log('getdata')
  return new Promise((resolve) => {
    Tabletop.init({key: publicSpreadsheetUrl, callback: showInfo, simpleSheet: true})
    resolve('Done');
  })
}

// old fashion way keep this here aslong the function on line 28 doesn't work
// function showInfo (data, tabletop) {
//   console.log('Successfully processed!');
//   let gymExercises = [];
//   gymExercises.push(...data);
//   console.log(gymExercises);
//   console.log(data)
//   return data
// }
let arrayWithData = [];

function showInfo (data, tabletop) {
  console.log('showInfo active');
  arrayWithData.push(...data);
  return new Promise(resolve => {
    console.log(arrayWithData, 'data is here')
    resolve(arrayWithData) // This doesn't work yet
  })
}

 //showInfo().then(data => {
  //  console.log(data, 'data from the Promise')
  //}) // This doensn't work

getData()
//  This will render the reactblock
//  .then(function renderReactToDom(hint) {
//   ReactDOM.render(<Board/>, document.querySelector('#root'))
// })

function promiseChain() {
  return new Promise(resolve => {
    resolve(1)
  })
}

promiseChain()
  .then(thisIsOne => {
    console.log(thisIsOne)

    return thisIsOne + 1
  })
  .then(thisIsTwo => {
    console.log(thisIsTwo)

    return thisIsTwo + 1
  })
  .then(thisIsThree => {
    console.log(thisIsThree);
  })
