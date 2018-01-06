import React, { Component } from 'react';
import LessonsCard from './LessonsCard';
import './Course.scss';

class Course extends Component {
    applyExceptions(teaching, lessons) {
        const exceptionTimes = teaching.poikkeusajat;
        let additionalInfo;
        let location;
        let startTime;
        let exceptionLesson;
        const filteredLessons = [];

        lessons.map(lesson => {
            startTime = new Date(lesson.start);

            exceptionLesson = exceptionTimes.find(a => (
                startTime.getDate() === new Date(a.alkuaika).getDate() &&
                startTime.getMonth() === new Date(a.alkuaika).getMonth()
            ));
            if (exceptionLesson) {
                additionalInfo = exceptionLesson.lisatiedot;
                location = exceptionLesson.paikka;

                if (/ei opetusta/.test(additionalInfo.toLowerCase()) || /no lectures/.test(additionalInfo.toLowerCase())) {
                    return;
                } else if (location) {
                    if (exceptionLesson.alkutunnit && exceptionLesson.lopputunnit) {
                        const start = lesson.start;
                        const end = lesson.end;
                        start.setHours(exceptionLesson.alkutunnit);
                        start.setMinutes(exceptionLesson.alkuminuutit || 0); // TODO: check if this is correct
                        end.setHours(exceptionLesson.lopputunnit);
                        end.setMinutes(exceptionLesson.loppuminuutit || 0); // TODO: check if this is correct
                        filteredLessons.push({
                            ...lesson,
                            start,
                            end,
                            location,
                            additionalInfo
                        });
                    } else {
                        filteredLessons.push({
                            ...lesson,
                            location,
                            additionalInfo
                        });
                    }
                }
            } else {
                filteredLessons.push(lesson)
            }
        });

        return filteredLessons;
    }

    parseLessonArrays(times, course) {
        const t = times.map(time => (
            this.applyExceptions(time, this.parseLessonArray(time, course))
        ))
        // .reduce((a, b) => a.concat(b));

        return t;
    }

    parseOpsiRyhma(course, group) {
        const groupName = group.nimi || 'Lecture'; // nimi is like "Harjoitusryhmä 1", or empty string for lectures
        const groupType = group.id_opsi_opetus; // TODO: map these with some sort of dict ("Luento-opetus", "pienryhmäopetus"...)
        const times = [];

        group.ajat.map(t => {
            times.push(this.applyExceptions(t, this.newParseLessonArray(t, course, groupName, groupType)))
        });

        // return null if there are no lessons (which is apparently a bug in the UTA system)
        return times.length > 0 ? times : null;
    }

    newParseLessonArray(teaching, course, groupName, groupType) {
        const lessons = [];
        const iDate = new Date(teaching.alkuaika);
        const startHours = teaching.alkutunnit;
        const startMinutes = teaching.alkuminuutit || 0;
        const endHours = teaching.lopputunnit;
        const endMinutes = teaching.loppuminuutit || 0;
        let start, end;
        const location = teaching.paikka;
        const { name, code, id } = course;

        while (true) {
            start = new Date(iDate);
            end = new Date(iDate);
            start.setHours(startHours);
            start.setMinutes(startMinutes);
            end.setHours(endHours);
            end.setMinutes(endMinutes);

            lessons.push({
                name,
                code,
                id,
                location,
                start,
                end,
                groupName,
                groupType
            });

            if (iDate.getTime() >= teaching.toistuvuus_saakka || !teaching.toistuvuus) {
                break;
            }

            iDate.setDate(iDate.getDate() + 7); // advance by a week
        }

        return lessons;
    }

    render() {
        console.log(this.props.course);
        const { course } = this.props;

        const teachings = course._opsi_opryhmat; // TODO: filter only the ones we want to include

        return (
            <div className="course-wrapper">
                <div className="course-info">
                    <h2>{course.name} ({course.code})</h2>
                    {
                        (teachings.length === 0 || (teachings.length === 1 && teachings[0].ajat.length === 0))
                        && (<span>This course seems to have no lectures</span>)
                    }
                </div>

                <div className="lessons-cards-wrapper">
                    {teachings.map(t => (
                        <LessonsCard
                            lessons={this.parseOpsiRyhma(course, t)}
                            groupName={t.nimi || null}
                            groupType={t.id_opsi_opetus}
                            key={Math.random()}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default Course;
