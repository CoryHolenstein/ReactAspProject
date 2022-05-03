import axios from 'axios';
import React, { Component } from 'react';
import { Tooltip, Badge } from 'react-bootstrap';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-input-2';


export class LOTRQuote extends Component {


    constructor(props) {
        super(props);
        this.state = { chosenQuote: "", phone: "",loading: true };
    }

    componentDidMount() {
        this.grabRandomQuote();
    }

    async grabRandomQuote() {
        var maxNumber = 1000;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);

       await  axios.get('https://localhost:7282/api/RingQuote/route')
           .then((response) => {
               console.log(response.data.docs[randomNumber].dialog);
                console.log(response.status);
                this.setState({ chosenQuote: response.data.docs[randomNumber].dialog, loading: false });
                if (response.status != 200) {
                    this.setState({ responseStatus: "Error grabbing data from API." });
                }
            });
    
    }

    async vonageCall() {
      
        var number = this.state.phone;
        console.log("vonage time");
        axios.get('https://localhost:7282/api/Vonage/text/' + number)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                if (response.status == 500) {
                    this.setState({ responseStatus: "Error grabbing data from API.", loading: false });
                }
            });
     
    }

    static displayRandomQuote(quote) {
        return (
            <div>{quote}</div>
        );
    }
  
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LOTRQuote.displayRandomQuote(this.state.chosenQuote);
        return (
            <div>
                <div>
                    <p>Your random quote: </p>
                    {contents}
                    <button onClick={this.grabRandomQuote}>New Quote</button>
                </div>
           
                <form>
                <Badge
                    color="primary"
                >
                    Send to your friends!
                </Badge>
                <PhoneInput
                    country={'us'}
                    value={this.state.phone}
                    placeholder="Enter your phone number"
                    required
                    />
                    <button onClick={this.vonageCall}> Send </button>
                </form>
            </div>


        );
    }




}
