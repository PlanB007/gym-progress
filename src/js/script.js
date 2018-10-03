import React from 'react';
import ReactDOM from 'react-dom';
import GetSheetDone from 'get-sheet-done';
import Tabletop from 'tabletop';

class Board extends React.Component {
  render() {
    const week = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Week}</span>);
    const oefening = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Oefening}</span>);
    const gewicht = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Gewicht}</span>);

    return (
      <div className="progress-board">
        {week}
        {oefening}
        {gewicht}
      </div>
    );
  }
}

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit?usp=sharing';

function getData() {
  return new Promise((resolve, reject) => {
    Tabletop.init({key: publicSpreadsheetUrl,
      callback: function (data, tabletop) {
        resolve(showInfo(data, tabletop));
      },
      simpleSheet: true})
      console.log('promsie running');
      Promise.reject(new Error('fail')).then(function() {
      // not called
      }, function(error) {
        console.log(error); // Stacktrace
      });
  })
}

let arrayWithData = [];

function showInfo (data, tabletop) {
  arrayWithData.push(...data);
  return arrayWithData;
}

 getData()
  .then(function renderReactToDom(hint) {
    console.log(hint,'hitn');

    ReactDOM.render(
      <Board gymProgresses={hint} />,
      document.querySelector('#root')
    )
  })
