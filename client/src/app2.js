import React, { Component } from 'react';
import './app2.css';
import Chart from './components/chart';
import Axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      number_of_followers: "",
      name: "",
      myData: [],
      chartData: {}
    }
  }

  componentWillMount() {
    this.getChartData()
  }

  getChartData() {
    Axios.get("/posts/chart").then(res => {
      const vacation_data = res.data.data;
      let labels = [];
      let data = [];
      vacation_data.forEach(element => {
        if (element.number_of_followers > 0) {
          data.push(element.number_of_followers);
          labels.push(element.name);

        }

        console.log(vacation_data)
        console.log(labels)
        console.log(data)
      });

      this.setState({
        chartData: {
          labels: labels,
          datasets: [
            {
              label: 'All vacation followers',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86,1)',
                'rgba(153, 102, 255,1)',
                'rgba(75, 192, 192, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)'
              ]
            }
          ]
        }
      });
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
        </div>
        {Object.keys(this.state.chartData).length &&
          <Chart chartData={this.state.chartData} location="Vacations" legendPosition="bottom" />}
      </div>
    );
  }


}

export default App;

