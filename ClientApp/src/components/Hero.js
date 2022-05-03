import React, { Component } from 'react'
import axios from 'axios';
import { Badge, Button, Table } from 'react-bootstrap';
import './Table.css';


export class Hero extends Component {


    constructor(props) {
        super(props);
        this.state = { allHeros: "",  nextPage: "", previousPage: "", loading: true };
    }

    componentDidMount() {


        this.grabHeroTest();

    }
    async grabHeroTest() {
        await axios.get('https://localhost:7282/api/Hero/get-all-heros')
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allHeros: response.data.results,  nextPage: response.data.next, previousPage:response.data.previous, loading: false });
           

            });
    }
   async loadNextPage(pageNum) {
        await axios.get('https://localhost:7282/api/Hero/get-next-page/' + pageNum)
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allHeros: response.data.results,nextPage: response.data.next, previousPage: response.data.previous });

            });
    }

    static renderHerosTable(heros) {
        return (
            <Table className="styled-table" aria-labelledby="tabelLabel" >
                <thead className="thead">
                    <tr>
                        <th>Characters</th>
                        <th>Birth Year</th>
                        <th>Eye color</th>
                        <th>Height</th>
                        <th>Hair Color</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {heros.map(hero => 
                        <tr key={hero.name} >
                        <td>{hero.name}</td>
                            <td>{hero.birth_year}</td>
                            <td>{hero.eye_color}</td>
                            <td>{hero.height} cm</td> 
                            <td>{hero.hair_color}</td>
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
            : Hero.renderHerosTable(this.state.allHeros);

        return (
           
            <div className=".hero-page">
                <h1><Badge bg="danger">Heros</Badge></h1>
                {contents}
                
           

                <Button variant="primary" disabled={!this.state.previousPage} onClick={() => { this.spliceUrlString(this.state.previousPage) }} > Previous Page</Button>{" "}
                    <Button variant="primary" disabled={!this.state.nextPage} onClick={() => { this.spliceUrlString(this.state.nextPage) }} > Next Page</Button>
            </div>
             
             
        );
    }




}


