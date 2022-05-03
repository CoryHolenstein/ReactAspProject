import React, { Component } from 'react'
import axios from 'axios';

export class Hero extends Component {


    constructor(props) {
        super(props);
        this.state = { allHeros: "", heroName: "", nextPage: "", previousPage: "", loading: true };
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
                this.setState({ allHeros: response.data.results, heroName: response.data.name, nextPage: response.data.next, previousPage:response.data.previous, loading: false });
           

            });
    }
   async loadNextPage(pageNum) {
        await axios.get('https://localhost:7282/api/Hero/get-next-page/' + pageNum)
            .then((response) => {
                console.log(response);
                console.log(response.status);
                console.log(response.data.next);
                console.log(response.data.previous);
                this.setState({ allHeros: response.data.results, heroName: response.data.name, nextPage: response.data.next, previousPage: response.data.previous });

            });
    }

    static renderHerosTable(heros) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Characters</th>
                        <th>Birth Year</th>
                        <th>Eye color</th>
                        <th>Height</th>
                    </tr>
                </thead>
                <tbody>
                    {heros.map(hero =>
                        <tr key={hero.name}>
                            <td>{hero.name}</td>
                            <td>{hero.birth_year}</td>
                            <td>{hero.eye_color}</td>
                            <td>{hero.height} cm</td>

                        </tr>
                    )}
                </tbody>
            </table>
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
            <div>
                <h1 id="tabelLabel" >Test Hero</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                {this.state.heroName}
                Next Page: {this.state.nextPage}

                <button disabled={!this.state.previousPage} onClick={() => { this.spliceUrlString(this.state.previousPage) }} > Previous Page</button>
                <button disabled={!this.state.nextPage} onClick={() => { this.spliceUrlString(this.state.nextPage) }} > Next Page</button>
            </div>
        );
    }




}


