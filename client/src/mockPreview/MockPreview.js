import React, { Component } from 'react';
import '../App.scss';

// const dict = {
//     luento: 1,
//     pienryhma: 2,
//     seminaari: 6,
//     harjoitusryhma: 7
// };

class MockPreview extends Component {
    constructor() {
        super();
        this.state = {
            course: null,
            filters: {
                '1': {
                    active: true,
                    name: 'Luento-opetus'
                },
                '2': {
                    active: false,
                    name: 'Pienryhmä'
                },
                '6': {
                    active: false,
                    name: 'Seminaari'
                },
                '7': {
                    active: true,
                    name: 'Harjoitusryhmä'
                }
            }
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
            // const response = await fetch('/course?id=34946'); // JOVA18 Journalistinen kieli
            // const response = await fetch('/course?id=35149');
            // const response = await fetch('/course?id=35187');
            // const response = await fetch('/course?id=35267');
            // const response = await fetch('/course?id=36906'); // MTTA1 Kandidaattitutkielma ja seminaari
            const response = await fetch('/course?id=36907'); // MTTTA1 Tilastomenetelmien perusteet
            // const response = await fetch('/course?id=36546');
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
        const am = opetus.alkuminuutit || 0;
        const lt = opetus.lopputunnit;
        const lm = opetus.loppuminuutit || 0;
        let alku, loppu;
        const paikka = opetus.paikka;
        const nimi = kurssi.name;
        const koodi = kurssi.code;

        while (true) {
            alku = new Date(iDate);
            loppu = new Date(iDate);
            alku.setHours(at);
            alku.setMinutes(am);
            loppu.setHours(lt);
            loppu.setMinutes(lm);

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
                alkuaika.getDate() === new Date(a.alkuaika).getDate() &&
                alkuaika.getMonth() === new Date(a.alkuaika).getMonth()
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            ...this.state,
            filters: {
                ...this.state.filters,
                [name]: {
                    ...this.state.filters[name],
                    active: value
                }
            }
        });
    }

    render() {
        if (!this.state.course) {
            return <div>Fetching...</div>;
        }

        /* Luento-opetus */
        // const opetukset = this.state.course._opsi_opryhmat.filter(a => a.id_opsi_opetus == 1);
        /* Pienryhmäopetus */
        // const opetukset = this.state.course._opsi_opryhmat.filter(a => a.id_opsi_opetus == id_opsi_opetus);
        const opetukset = this.state.course._opsi_opryhmat.filter(a => {
            // a.id_opsi_opetus == id_opsi_opetus
            if (a.id_opsi_opetus in this.state.filters) {
                return this.state.filters[a.id_opsi_opetus].active
            }
        });

        // if (!opetus) {
        //     return (
        //         <div className="App">
        //         <p>Id: {this.state.course.id}</p>
        //         <p>Tunnus: {this.state.course.code}</p>
        //         <p>Course name: {this.state.course.name}</p>
        //         <p>Ei luento-opetusta</p>
        //     </div>
        //     );
        // }

        if (!opetukset) {
            return (
                <div className="App">
                <p>Id: {this.state.course.id}</p>
                <p>Tunnus: {this.state.course.code}</p>
                <p>Course name: {this.state.course.name}</p>
                <p>Ei luento-opetusta</p>
            </div>
            );
        }
        const allLessons = [];

        opetukset.map(opetus => {
            const times = opetus.ajat;
            allLessons.push(this.parseLessonArrays(times, this.state.course));
        });
        // const times = opetus.ajat; // array aikoja
        // const jee = opetus.ajat[0];

        // const tunnit = this.parsiTuntiArray(jee, this.state.course);

        // const filteredLessons = this.applyExceptions(jee, tunnit);

        // const allLessons = this.parseLessonArrays(times, this.state.course);

        return (
            <div className="App">
                <div>
                    <form>
                        <label>
                            {this.state.filters['1'].name}
                            <input
                                name="1"
                                type="checkbox"
                                checked={this.state.filters['1'].active}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>

                        <label>
                            {this.state.filters['2'].name}
                            <input
                                name="2"
                                type="checkbox"
                                checked={this.state.filters['2'].active}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>

                        <label>
                            {this.state.filters['6'].name}
                            <input
                                name="6"
                                type="checkbox"
                                checked={this.state.filters['6'].active}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>

                        <label>
                            {this.state.filters['7'].name}
                            <input
                                name="7"
                                type="checkbox"
                                checked={this.state.filters['7'].active}
                                onChange={(e) => this.handleInputChange(e)}
                            />
                        </label>
                    </form>
                </div>
                <p>Id: {this.state.course.id}</p>
                <p>Tunnus: {this.state.course.code}</p>
                <p>Course name: {this.state.course.name}</p>

                <ul>
                    {allLessons.map(lessons => lessons.map(t => (
                        <Tunti
                            key={t.alku}
                            nimi={t.nimi}
                            koodi={t.koodi}
                            paikka={t.paikka}
                            alku={t.alku}
                            loppu={t.loppu}
                            lisatiedot={t.lisatiedot}
                        />
                    )))}
                </ul>
            </div>
        );
    }
}

export default MockPreview;

const Tunti = ({ nimi, koodi, paikka, alku, loppu, lisatiedot }) => (
    <li style={{ padding: '20px 20px 20px', textAlign: 'left'}}>
        <div>{nimi} ({koodi}) {lisatiedot}</div>
        <div>{paikka}</div>
        <div>Alkaa: {alku.toLocaleString()}</div>
        <div>Loppuu: {loppu.toLocaleString()}</div>
    </li>
);
