import React, { Component } from 'react'
import './Landing.css';


export class Landing extends Component {


    constructor(props) {
        super(props);
       
    }

  

    render() {
    
        return (
            <div>
                <body>
                <div class="fade"></div>

                <section class="star-wars-text">
                    <div class="crawl">
                        <div class="title">
                            <p>Episode Cory's Hope</p>
                            <h1></h1>
                        </div>

                        <p>It is a period of great unrest. He works at an externship as a game developer but they are having funding issues.</p>
                        <p>Neudesic seems like a perfect fit for Cory, as everyone seems awesome and he loves PDITI!</p>
                        <p>Will Cory learn the ways of React and .net before the interview?</p>
                        <p>Or will he be doomed as an extern... forever...</p>


                    </div>
                    </section>
                    </body>
            </div>
        );
    }




}
