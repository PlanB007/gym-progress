import React from 'react';
import ReactDOM from 'react-dom';
import Tabletop from 'tabletop';


const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1YlxxDzUQzca-4dpiiXyhi2T6eB-2_V8s4U3ZRnnCfaU/edit?usp=sharing';


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: 'Kevin'
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.createChart = this.createChart.bind(this)
    this.generateDateSets = this.generateDateSets.bind(this)
  }

  componentDidMount() {
    console.log('component did mount, vet he!?')
    console.log('this: ', this)



    this.getData()
      .then (data => {
        const instances = data.Exercise.elements
        const dates = instances.map( instance =>  instance.datum)
        const filterDates = dates => dates.filter((item, idx, dates) => dates.indexOf(item) === idx)

        const workoutsNames = instances.map( instance =>  instance.naam)
        console.log(JSON.stringify(instances))
        const filterWorkoutNames = workouts => workouts.filter((item, idx, workouts) => workouts.indexOf(item) == idx)
        console.log(filterWorkoutNames(workoutsNames))

        this.setState({
          dates: filterDates(dates)
        })

        return {instances, filterDates: filterDates(dates), filterWorkoutNames: filterWorkoutNames(workoutsNames)}
      })
    .then(this.generateDateSets)
    .then(this.createChart)
  }

  getData() {
    return new Promise((resolve, reject) => {
      Tabletop.init({key: publicSpreadsheetUrl,
        callback: function (data) {
          resolve(data);
        },
      });
    })
  }

  handleNameChange(e) {
    this.setState({
      name: e.target.value
    })
  }

  createChart(filterWorkoutByDate) {
    let ctx = this.refs.exerciseProgress.getContext('2d')

    const sets = filterWorkoutByDate.map(workoutDate => workoutDate.map(workout => workout.gewicht))
    console.log({ sets })

    const gymChart = new Chart(ctx, {
      type: "line",
      options: {
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              max: 100,
              callback: v=> `${v}kg`
            }
          }]
        }
      },
      data: {
        labels: this.state.dates,
        datasets: [{
            label: 'Bench press',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[0],
            fill: false
          }, {
            label: 'Deadlift',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[1],
            fill: false
          },
          {
            label: 'Squad',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[2],
            fill: false
          },{
            label: 'Trapbar',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[1],
            fill: false
          },
          {
            label: 'Legg Press',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[4],
            fill: false
          },
          {
            label: 'Barble row',
            backgroundColor: '#F00',
            borderColor: '#cecece',
            data: sets[5],
            fill: false
          }
        ]}
    })
  }

  creatEmptyInstance(ins) {
    return {
    breakMinutes: "0",
    datum: ins.datum,
    gewicht: "0",
    id: null,
    naam: ins.naam,
    personKey: ins.personKey,
    reps: "1",
    round: "1"}
  }

  generateDateSets(randomObjex) {
    const {instances, filterDates, filterWorkoutNames} = randomObjex
    console.log(randomObjex)

    function generateAccumArray(len) {
      let arr = []
      for(let i = 0; i < len; i++) {
        arr.push([])
      }
      return arr
    }

    const totalAcc = generateAccumArray(filterDates.length)

    // filter all objects by key 'type', push all devices to dedicated type array
    const filterWorkoutByDate = instances.reduce((accum, instance) => {
      filterDates.map((date, jdx) => {
        if (instance.datum === date) {

          console.log(accum[jdx])
          accum[jdx].push(instance)
        } else {
          // accum[jdx].push(this.creatEmptyInstance(instance))
        }
      })

      return accum
    }, totalAcc)

    console.log({filterWorkoutByDate})
    return filterWorkoutByDate
  }

  render() {
    return (
      <div>
        {this.state.name}

        <input type="text" onChange={this.handleNameChange}/>
        <canvas ref="exerciseProgress" id="chart"></canvas>
      </div>
    )
  }
}

 ReactDOM.render(
   <App/>,
   document.querySelector('#root')
 )


 //
 // getData()
 //  .then(function renderReactToDom(data) {
 //     console.log(data ,'hint');
 //
 //
 //    const instances = data.Exercise.elements
 //    console.log(instances);
 //     instances.map    console.log(instances[1].datum);
 //
 //



    // const filteredLabels = arrayWithData.map(moetje => moetje.Oefening);
    // const filterdWeight = arrayWithData.map(({ Gewicht }) => Gewicht);

    // console.log(filterdWeight, filteredLabels);
    // const colors = arrayWithData.map(function rgba() {
    //   const r = Math.floor(Math.random() * 255)
    //   const g = Math.floor(Math.random() * 255)
    //   const b = Math.floor(Math.random() * 255)
    //   const a = Math.random().toFixed(2);
    //
    //   return `rgba(${r},${g},${b},${a})`
    // });
  //   //
    // let ctx = document.getElementById("chart").getContext('2d');
  //   //
  //   let gymChart = new Chart(ctx, {
  //     type: "line",
  //     data: {
  //       labels: ['28/02/2019', '28/02/2019 2', '29/02/2019 3'],
  //       datasets: [{
  //           label: 'oefening 1',
  //           backgroundColor: '#F00',
  //           borderColor: '#cecece',
  //           data: [20, ,30, 60, 40 ],
  //           fill: false
  //         }, {
  //           label: 'oefening 2',
  //           backgroundColor: '#F00',
  //           borderColor: '#cecece',
  //           data: [10, ,40, 55, 15],
  //           fill: false
  //         }
  //       ]}
  //   });
  // })
