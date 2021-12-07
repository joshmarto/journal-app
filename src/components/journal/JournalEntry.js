import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({ id, title, body, url, date }) => {

    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleClickedEntry = () => {
        const note = {
            id,
            title,
            body,
            url,
            date
        };

        dispatch( activeNote( id, note ) );
    }

    return (
        <div className="journal__entry animate__animated animate__fadeIn animate__faster" onClick={ handleClickedEntry }>
            {
                url &&
                    <div
                        className="journal__entry-picture"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`
                        }}
                    ></div>
            }
            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    {/* Un nuevo dia */}
                    { title }
                </p>
                <p className="journal__entry-content">
                    {/* Sit duis fugiat aute ex. Culpa eiusmod elit commodo esse commodo cillum. */}
                    { body }
                </p>
            </div>
            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd') }</span>
                <h4>{ noteDate.format('DD') }</h4>
            </div>
        </div>
    )
}
