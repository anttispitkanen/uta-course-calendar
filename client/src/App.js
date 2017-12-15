import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            course: null
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('/course?id=36903');
            const resJSON = await response.json();
            this.setState({ course: resJSON });
            console.log(resJSON);
        } catch (e) {
            console.error(e);
        }
    }

    parsiTuntiArray(opetus, kurssi) {
        const tunnit = [];
        const weekMs = 7 * 24 * 60 * 60 * 1000; // number of milliseconds in one week
        const iDate = new Date(opetus.alkuaika);
        const at = opetus.alkutunnit;
        const lt = opetus.lopputunnit;
        let alku, loppu;
        const paikka = opetus.paikka;
        const nimi = kurssi.name;
        const koodi = kurssi.code;


        while (true) {
            alku = new Date(iDate);
            loppu = new Date(iDate);
            alku.setHours(at);
            loppu.setHours(lt);

            tunnit.push({
                id: Math.round(Math.random() * 10000000),
                nimi,
                koodi,
                paikka,
                alku,
                loppu
            });

            if (iDate.getTime() > opetus.toistuvuus_saakka) break;
            iDate.setTime(iDate.getTime() + weekMs);
        }

        return tunnit;
    }

    // applyExceptions(opetus, tunnit) {
    //     const poikkeusajat = opetus.poikkeusajat;
    //     let lisatiedot;
    //     let alkuaika;
    //     let poikkeustunti;
    //     const filteredTunnit = [];
    //     // poikkeusajat.map(a => {
    //     //     alkuaika = new Date(a.alkuaika);
    //     //     poikkeustunti = tunnit.find(tunti => (tunti.alku.getMonth() === alkuaika.getMonth() && tunti.alku.getDay() === alkuaika.getDay()));
    //     //     if (poikkeustunti) {
    //     //         console.log('löytyi ' + alkuaika.toLocaleString())
    //     //         // console.log('löytyi indeksistä ' + tunnit.indexOf(poikkeustunti))
    //     //         console.log(poikkeustunti)
    //     //         poikkeusTunninIndeksi = 
    //     //     }
    //     // });
    //     tunnit.map(tunti => {
    //         alkuaika = new Date(a.alkuaika);
    //         poikkeustunti = poikkeusajat.find(a => (tunti.alku.getMonth() === alkuaika.getMonth() && tunti.alku.getDay() === alkuaika.getDay()));
    //         if 
    //     });
    //     return filteredTunnit;
    // }

    render() {
        if (!this.state.course) {
            return <div>Fetching...</div>;
        }

        // console.log(this.state.course._opsi_opryhmat)
        const opetus = this.state.course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);
        console.log(opetus.ajat[0])
        const jee = opetus.ajat[0];

        const tunnit = this.parsiTuntiArray(jee, this.state.course);
        console.log(tunnit)

        // this.applyExceptions(jee, tunnit)

        return (
            <div className="App">
                <p>Id: {this.state.course.id}</p>
                <p>Tunnus: {this.state.course.code}</p>
                <p>Course name: {this.state.course.name}</p>

                <ul>
                    {tunnit.map(t => (
                        <Tunti
                            key={t.alku}
                            nimi={t.nimi}
                            koodi={t.koodi}
                            paikka={t.paikka}
                            alku={t.alku}
                            loppu={t.loppu}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;

const Tunti = ({ nimi, koodi, paikka, alku, loppu }) => (
    <li style={{ padding: '20px 20px 20px', textAlign: 'left'}}>
        <div>{nimi} ({koodi})</div>
        <div>{paikka}</div>
        <div>Alkaa: {alku.toLocaleString()}</div>
        <div>Loppuu: {loppu.toLocaleString()}</div>
    </li>
);
