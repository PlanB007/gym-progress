import React from 'react';
import ReactDOM from 'react-dom';
import GetSheetDone from 'get-sheet-done';
import Tabletop from 'tabletop';

//
//{week}
//{oefening}
//{gewicht}

class Board extends React.Component {
  render() {
    const week = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Week}</span>);
    const oefening = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Oefening}</span>);
    const gewicht = this.props.gymProgresses.map((gymProgress, idx) => <span key={idx}>{gymProgress.Gewicht}</span>);

    return (
      <canvas id="chart" className="progress-board">

      </canvas>
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
    // console.log(arrayWithData[0].Oefening)
    ReactDOM.render(
      <Board gymProgresses={hint} />,
      document.querySelector('#root')
    )


    const filteredLabels = arrayWithData.map(moetje => moetje.Oefening);
    const filterdWeight = arrayWithData.map(({ Gewicht }) => Gewicht);
    const colors = arrayWithData.map(function rgba() {
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      const a = Math.random().toFixed(2);

      return `rgba(${r},${g},${b},${a})`
    })

    let ctx = document.getElementById("chart").getContext('2d');
    let gymChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: filteredLabels,
        datasets: [{
            label: 'Max gewicht',
            data: filterdWeight,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1
        }]
      },
      options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
      }
    });
    console.log('working')
  })
