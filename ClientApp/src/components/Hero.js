import React, { Component } from 'react'
import axios from 'axios';

export class Hero extends Component {


    constructor(props) {
        super(props);
        this.state = { hero: "", heroName: "", loading: true };
    }

    componentDidMount() {


        this.grabHeroTest();

    }
    async grabHeroTest() {
        await axios.get('https://localhost:7282/api/Hero/route')
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                this.setState({ hero: response.data, heroName: response.data.name, loading: false });

            });
    }


    static renderHerosTable(heros) {
        return (
            <div></div>
        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Hero.renderHerosTable(this.state.hero);

        return (
            <div>
                <h1 id="tabelLabel" >Test Hero</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
                {this.state.heroName}
                <p> YOU GOT THIS LETS GOOOOOOOOOOOOOOOOOOOOOOOOOOOOO</p>
            </div>
        );
    }




}
//https://localhost:7282/api/Hero


/*
 *    <thead>
                    <tr>
                        <th>Name</th>

                    </tr>
                </thead>
                <tbody>
                    {heros.map(hero =>
                        <tr key={hero.name}>
                            <td>{hero.name}</td>
                        </tr>
                    )}
                </tbody>
 * 
 * 
 * */
/*
 * 
 *   async grabHeroTest() {
        const response = await fetch('https://localhost:7282/api/Hero/route', {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        const data = await response.json();
        console.log(response.json);
        this.setState({ hero: data, loading: false });
    }

 * 
 * */
