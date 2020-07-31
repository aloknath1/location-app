import React, {Component} from 'react';
import Records from './records';
import './location.css';

class Location extends Component {
    constructor(props){
        super(props);

        this.state = {
            locations: []
        };

       // this.fetchData = this.fetchData.bind(this);
    }

    // fetchData = () => {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //     .then(res => res.json())
    //     .then(data => this.setState({users: data}));
    // }

    componentDidMount(){
        //this.fetchData();
    }

    render() {
        const locations = this.state.locations;
    return (

        );
    }
}
export default Location;