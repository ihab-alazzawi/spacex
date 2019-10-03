import React from "react";
import Table from "./components/Table";
import api from "./api";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      reused: false,
      with_reddit: false,
      land_success: false,
      isLoading: true,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleDataFetch = this.handleDataFetch.bind(this);
  }
  componentDidMount() {
    this.handleDataFetch();
  }

  async handleDataFetch() {
    try {
      const { reused, with_reddit, land_success } = this.state;
      const res = await api.getData(reused, with_reddit, land_success);
      this.setState({ data: res.data, isLoading: false });
    } catch (err) {
      this.setState({ error: err.message, isLoading: false });
    }
  }

  handleChange(e) {
    e.stopPropagation();
    const { id, checked } = e.target;
    this.setState({ [id]: checked }, () => {
      this.handleDataFetch();
    });
  }

  handleRefresh() {
    this.handleDataFetch();
  }

  render() {
    const {
      data,
      reused,
      with_reddit,
      land_success,
      isLoading,
      error
    } = this.state;

    if (error) {
      return <h1>{error}</h1>;
    }
    if (isLoading) {
      return <h1>...Loading</h1>;
    }

    return (
      <div className="App">
        <h1>SpaceX Launches</h1>
        <p className="count">Showing: {data && data.length} records</p>
        <div id="container">
          <Table
            rockets={data}
            handleChange={this.handleChange}
            handleRefresh={this.handleRefresh}
            reused={reused}
            with_reddit={with_reddit}
            land_success={land_success}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}

export default App;
