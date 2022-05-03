import React, { Component, useContext } from 'react'
import axios from 'axios';
import { Badge, Button, Table } from 'react-bootstrap';
import './Table.css';


export class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = { allMovies: "", nextPage: "", previousPage: "", loading: true };
    }

    componentDidMount() {


        this.grabAllMovies();

    }
    async grabAllMovies() {
        await axios.get('https://localhost:7282/api/Movie/get-all-movies')
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allMovies: response.data.results,  nextPage: response.data.next, previousPage:response.data.previous, loading: false });
           

            });
    }
   async loadNextPage(pageNum) {
        await axios.get('https://localhost:7282/api/Movie/get-next-page/' + pageNum)
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allMovies: response.data.results,nextPage: response.data.next, previousPage: response.data.previous });

            });
    }

    static renderMoviesTable(movies) {
        return (
            <Table className="styled-table" aria-labelledby="tabelLabel" >
                <thead className="thead">
                    <tr>
                        <th>Name</th>
                        <th>Episode ID</th>
                        <th>Release Date</th>
                        <th>Director</th>
                        <th>Producer</th>
                      
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => 
                        <tr key={movie.title} >
                            <td>{movie.title}</td>
                            <td>{movie.episode_id}</td>
                            <td>{movie.release_date}</td>
                            <td>{movie.director}</td>
                            <td>{movie.producer}</td>
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
            : Movie.renderMoviesTable(this.state.allMovies);

        return (
           
            <div className=".hero-page">
                <h1><Badge bg="danger">Movies</Badge></h1>
   
                {contents}
                
           

                <Button variant="primary" disabled={!this.state.previousPage} onClick={() => { this.spliceUrlString(this.state.previousPage) }} > Previous Page</Button>{" "}
                    <Button variant="primary" disabled={!this.state.nextPage} onClick={() => { this.spliceUrlString(this.state.nextPage) }} > Next Page</Button>
            </div>
             
             
        );
    }




}


