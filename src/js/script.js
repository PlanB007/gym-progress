console.log('Script file working');

import React from 'react';
import ReactDOM from 'react-dom';
import GetSheetDone from 'get-sheet-done';
import Tabletop from 'tabletop';


class Board extends React.Component {
  render() {
    return (
      <div className="progress-board">
      </div>
    );
  }
}

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit?usp=sharing';

function getData() {
  return new Promise((resolve, reject) => {
    Tabletop.init({key: publicSpreadsheetUrl,
      callback: function (data, tabletop) { resolve(showInfo(data, tabletop)); },
      simpleSheet: true})
      console.log('promsie running');
      Promise.reject(new Error('fail')).then(function() {
        // not called
      }, function(error) {
        console.log(error); // Stacktrace
      });
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

// showInfo() get runned twice
function showInfo (data, tabletop) {
  console.log('showInfo active');
  arrayWithData.push(...data);
  console.log(arrayWithData, 'data is here')
  return arrayWithData;
}

 getData()
  .then(data => {
   console.log(data, 'data from the Promise')
  })
  .then(function renderReactToDom(hint) {
   ReactDOM.render(<Board/>, document.querySelector('#root'))
  })
   // This doesn't work

// getData()
//  This will render the reactblock


// function promiseChain() {
//   return new Promise(resolve => {
//     resolve(1)
//   })
// }
//
// promiseChain()
//   .then(thisIsOne => {
//     console.log(thisIsOne)
//
//     return thisIsOne + 1
//   })
//   .then(thisIsTwo => {
//     console.log(thisIsTwo)
//
//     return thisIsTwo + 1
//   })
//   .then(thisIsThree => {
//     console.log(thisIsThree);
//   })
