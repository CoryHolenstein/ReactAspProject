import React, { Component } from 'react'
import axios from 'axios';
import { Tooltip, Badge } from 'react-bootstrap';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-input-2'

export class OneRingQuote extends Component {


    constructor(props) {
        super(props);
        this.state = { allQuoteArray: [], randomNum: "", chosenQuote: "", responseStatus: "", phone: "", loading: true };
    }
    
  
    componentWillMount() {
        this.grabQuoteArray();

    }
    
    async grabQuoteArray() {
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

    }

     handleSubmit(event) {
         event.preventDefault();
        var number = this.state.phone;
         axios.get('https://localhost:7282/api/Vonage/text/' + number)
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                if (response.status == 500) {
                    this.setState({ responseStatus: "Error grabbing data from API.", loading: false });
                }
            });
     
    }

    grabRandomNumbers() {
        var maxNumber = 1000;
        var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
        this.setState({ randomNum: randomNumber });
        console.log(this.state.randomNum);
       
    }

    getRandomQuote() {
        this.grabRandomNumbers();
        var num = this.state.randomNum;
        console.log(num);
     
        this.setState({ chosenQuote: this.state.allQuoteArray[num].dialog });
        console.log(this.state.chosenQuote);
    }


   

    static displayRandomQuote(quote) {
        return (
            <div>{quote}</div>
        );

    }



    render() {

        return (
            <div>
                <button color="primary" onClick={this.getRandomQuote.bind(this)}>New quote</button>
                <form onSubmit={this.handleSubmit}>
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