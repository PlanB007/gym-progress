console.log('script file working');

import GetSheetDone from 'get-sheet-done';
import Tabletop from 'tabletop'

let gymExercises = [];
const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit?usp=sharing';

function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
  }

  function showInfo(data, tabletop) {
    alert('Successfully processed!')
    gymExercises.push(...data);

    let gymExerciseWeek = gymExercises.map(gymExercise => gymExercise.Week);
    console.log(gymExerciseWeek);

    let gymExerciseNames = gymExercises.map(gymExercise => gymExercise.Oefening);
    console.log(gymExerciseNames);

    let gymExerciseWeight = gymExercises.map(gymExercise => gymExercise.Gewicht);
    console.log(gymExerciseWeight);

    let gymExercisesInfo = gymExercises.map(gymExercises => [gymExercises.Week, gymExercises.Oefening, gymExercises.Gewicht]);
    //console.log(gymExercisesInfo);

    let gymExerciseInfo = gymExercisesInfo.map(gymExerciseInfo => console.log(gymExerciseInfo));

  }

window.addEventListener('DOMContentLoaded', init)
