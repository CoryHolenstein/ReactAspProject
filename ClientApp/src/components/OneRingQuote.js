import React, { Component } from 'react'
import axios from 'axios';

export class OneRingQuote extends Component {


    constructor(props) {
        super(props);
        this.state = { allQuoteArray: [], randomNum1: "",  chosenQuote: "", loading: true };
    }

    componentDidMount() {
        this.grabRandomQuote();

    }
    
    async grabRandomQuote() {
        await axios.get('https://localhost:7282/api/RingQuote/route')
            .then((response) => {
                console.log(response.data.docs[100]);
                console.log(response.status);
                this.setState({ allQuoteArray: response.data.docs })
            });
        console.log(this.state.allQuoteArray);
        this.grabRandomNumbers();
    }
    grabRandomNumbers() {
        var maxNumber = 1000;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        this.setState({ randomNum1: randomNumber });
        console.log(this.state.randomNum1);
        this.getRandomQuote();
    }

    getRandomQuote() {
        var num = this.state.randomNum1;
        console.log(num);
     
        this.setState({ chosenQuote: this.state.allQuoteArray[num].dialog, loading: false });
        console.log(this.state.chosenQuote);
    }

    static displayRandomQuote(quote) {
        return (
            <div>{quote}</div>
        );

    }

    render() {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : OneRingQuote.displayRandomQuote(this.state.chosenQuote);

        return (
            <div>
                <p>Your random quote is:</p>
                {contents}
            </div>
        );
    }




}