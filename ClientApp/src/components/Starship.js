import React, { Component } from 'react'
import axios from 'axios';
import { Badge, Button, Table } from 'react-bootstrap';

export class Starship extends Component {


    constructor(props) {
        super(props);
        this.state = { allStarships: "",  nextPage: "", previousPage: "", loading: true };
    }

    componentDidMount() {


        this.grabAllStarships();

    }
    async grabAllStarships() {
        await axios.get('https://localhost:7282/api/Starship/get-all-starships')
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allStarships: response.data.results,  nextPage: response.data.next, previousPage:response.data.previous, loading: false });
           

            });
    }
   async loadNextPage(pageNum) {
       await axios.get('https://localhost:7282/api/Starship/get-next-page/' + pageNum)
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allStarships: response.data.results, nextPage: response.data.next, previousPage: response.data.previous });

            });
    }

    static renderStarshipsTable(starships) {
        return (
            <Table className="styled-table" aria-labelledby="tabelLabel" >
                <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>HyperDrive Rating</th>
                        <th>Length</th>
                        <th>Information</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {starships.map(starship => 
                        <tr key={starship.name} >
                            <td>{starship.name}</td>
                            <td>{starship.starship_class}</td>
                            <td>{starship.hyperdrive_rating}</td>
                            <td>{starship.length} </td>
                          <td> <Button>Details</Button></td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );

    }
    spliceUrlString(page) {

        var num = page.slice(-1);
        console.log("sliced page: ", num);
        this.loadNextPage(num);
    }

   

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Starship.renderStarshipsTable(this.state.allStarships);

        return (
           
            <div className=".hero-page">
                <h1><Badge bg="danger">Starships</Badge></h1>
   
                {contents}
                
           

                <Button variant="primary" disabled={!this.state.previousPage} onClick={() => { this.spliceUrlString(this.state.previousPage) }} > Previous Page</Button>{" "}
                    <Button variant="primary" disabled={!this.state.nextPage} onClick={() => { this.spliceUrlString(this.state.nextPage) }} > Next Page</Button>
            </div>
             
             
        );
    }




}


