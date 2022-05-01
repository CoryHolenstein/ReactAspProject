import React, { Component } from 'react'
import axios from 'axios';

export class Vonage extends Component {


    constructor(props) {
        super(props);
        this.state = { hero: "", heroName: "", loading: true };
    }

    componentDidMount() {


        this.grabHeroTest();

    }
    async grabHeroTest() {
        await axios.get('https://localhost:7282/api/Vonage/text')
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
          

            });
    }


    static renderHerosTable(heros) {
        return (
            <div></div>
        );

    }

    render() {
      

        return (
            <div>
             <p>ss</p>
            </div>
        );
    }




}