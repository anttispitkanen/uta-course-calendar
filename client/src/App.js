import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
    constructor() {
        super();
        this.state = {
            course: null,
            // lessons: null
        };
    }

    async componentDidMount() {
        try {
            // const response = await fetch('/course?id=35678'); // Tietokantaohjelmointi
            // const response = await fetch('/course?id=36903'); // Tilastotiede
            // const response = await fetch('/course?id=36871'); // Lineaarialgebra 1A
            // const response = await fetch('/course?id=36911'); // MTTTA4 Statistical Inference 1
            // const response = await fetch('/course?id=36867'); // MTTMY1
            // const response = await fetch('/course?id=36868'); // MTTMP1A Johdatus analyysiin
            // const response = await fetch('/course?id=34940'); // JOVP3 Viestinnän etiikka
            const response = await fetch('/course?id=34946'); // JOVA18 Journalistinen kieli
            const resJSON = await response.json();
            this.setState({ course: resJSON });
            console.log(resJSON);
            // const response = await fetch('/calendar?id=36903');
            // console.log(response)
            // const text = await response.text();
            // console.log(text);

        } catch (e) {
            console.error(e);
        }
    }

    parsiTuntiArray(opetus, kurssi) {
        const tunnit = [];
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
                nimi,
                koodi,
                paikka,
                alku,
                loppu
            });

            if (iDate.getTime() >= opetus.toistuvuus_saakka || !opetus.toistuvuus) {
                break;
            }

            iDate.setDate(iDate.getDate() + 7); // advance by a week
        }


        return tunnit;
    }

    applyExceptions(opetus, tunnit) {
        const poikkeusajat = opetus.poikkeusajat;
        let lisatiedot;
        let paikka;
        let alkuaika;
        let poikkeustunti;
        const filteredTunnit = [];

        tunnit.map(tunti => {
            alkuaika = new Date(tunti.alku);

            poikkeustunti = poikkeusajat.find(a => (
                alkuaika.toLocaleDateString() === new Date(a.alkuaika).toLocaleDateString() &&
                alkuaika.toLocaleDateString() === new Date(a.alkuaika).toLocaleDateString()
            ));
            if (poikkeustunti) {
                lisatiedot = poikkeustunti.lisatiedot;
                paikka = poikkeustunti.paikka;

                if (/ei opetusta/.test(lisatiedot.toLowerCase()) || /no lectures/.test(lisatiedot.toLowerCase())) {
                    return;
                } else if (paikka) {
                    if (poikkeustunti.alkutunnit && poikkeustunti.lopputunnit) {
                        const alku = tunti.alku;
                        const loppu = tunti.loppu;
                        alku.setHours(poikkeustunti.alkutunnit);
                        loppu.setHours(poikkeustunti.lopputunnit);
                        filteredTunnit.push({
                            ...tunti,
                            alku,
                            loppu,
                            paikka,
                            lisatiedot
                        });
                    } else {
                        filteredTunnit.push({
                            ...tunti,
                            paikka,
                            lisatiedot
                        });
                    }
                }
            } else {
                filteredTunnit.push(tunti)
            }
        });

        return filteredTunnit;
    }

    parseLessonArrays(times, course) {
        const t = times.map(time => (
            this.applyExceptions(time, this.parsiTuntiArray(time, course))
        ))
        .reduce((a, b) => a.concat(b));

        console.log(t);
        return t;
    }

    render() {
        if (!this.state.course) {
            return <div>Fetching...</div>;
        }

        const opetus = this.state.course._opsi_opryhmat.find(a => a.id_opsi_opetus == 1);

        if (!opetus) {
            return (
                <div className="App">
                <p>Id: {this.state.course.id}</p>
                <p>Tunnus: {this.state.course.code}</p>
                <p>Course name: {this.state.course.name}</p>
                <p>Ei luento-opetusta</p>
            </div>
            );
        }
        const times = opetus.ajat; // array aikoja
        const jee = opetus.ajat[0];

        const tunnit = this.parsiTuntiArray(jee, this.state.course);

        const filteredLessons = this.applyExceptions(jee, tunnit);

        const allLessons = this.parseLessonArrays(times, this.state.course);

        return (
            <div className="App">
                <p>Id: {this.state.course.id}</p>
                <p>Tunnus: {this.state.course.code}</p>
                <p>Course name: {this.state.course.name}</p>

                <ul>
                    {allLessons.map(t => (
                        <Tunti
                            key={t.alku}
                            nimi={t.nimi}
                            koodi={t.koodi}
                            paikka={t.paikka}
                            alku={t.alku}
                            loppu={t.loppu}
                            lisatiedot={t.lisatiedot}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}

export default App;

const Tunti = ({ nimi, koodi, paikka, alku, loppu, lisatiedot }) => (
    <li style={{ padding: '20px 20px 20px', textAlign: 'left'}}>
        <div>{nimi} ({koodi}) {lisatiedot}</div>
        <div>{paikka}</div>
        <div>Alkaa: {alku.toLocaleString()}</div>
        <div>Loppuu: {loppu.toLocaleString()}</div>
    </li>
);
