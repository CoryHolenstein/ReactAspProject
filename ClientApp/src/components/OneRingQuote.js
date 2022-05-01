import React, { Component } from 'react'
import axios from 'axios';
import { Tooltip, Badge } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2'

export class OneRingQuote extends Component {


    constructor(props) {
        super(props);
        this.state = { allQuoteArray: [], randomNum1: "", chosenQuote: "", responseStatus: "", phone: "", loading: true };
        this.handleChange = this.handleChange.bind(this);
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
                if (response.status != 200) {
                    this.setState({ responseStatus: "Error grabbing data from API." });
                }
            });
        console.log(this.state.allQuoteArray);
        this.grabRandomNumbers();
    }

     handleSubmit(event) {
         event.preventDefault();
        var number = this.state.phone;
        event.preventDefault();
         axios.get('https://localhost:7282/api/Vonage/text/' + number)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                if (response.status == 500) {
                    this.setState({ responseStatus: "Error grabbing data from API." });
                }
            });
     
    }

    grabRandomNumbers(event) {
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

    setPhoneNumber(value) {
        this.setState({ phoneNumberInput: value });
    }
   

    static displayRandomQuote(quote) {
        return (
            <div>{quote}</div>
        );

    }

    handleChange(event) {
        console.log("handle change", event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
            let contents = this.state.loading
                ? <p><em>Loading...</em></p>
                : OneRingQuote.displayRandomQuote(this.state.chosenQuote);

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                <p>Your random quote is:</p>
                {contents}
                <button color="primary" onClick={this.grabRandomNumbers.bind(this)}>New quote</button>
                <br></br>
                <Badge
                    color="primary"
                >
                    Send to your friends!
                </Badge>
                <PhoneInput
                    country={'us'}
                    value={this.state.phone}
                    placeholder="Enter your phone number"
                    onChange={phone => this.setState({ phone })}
                    required
                    />
                    <button type="submit"> Send </button>
                </form>
                {this.state.responseStatus}
            </div>
        
            
        );
    }




}
/*
 * 
 * 
 * 
 *  <div>
                    <Tooltip
                    flip
                    target="TooltipInputNumber"
                    toggle={function noRefCheck() { }}
                >
                    Phone number
                </Tooltip></div>*/