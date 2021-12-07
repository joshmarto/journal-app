import React from 'react'
import { useSelector } from 'react-redux';
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    // const entries = [1, 2, 3, 4, 5, 6, 7, 8, 9, 19];
    const { notes: entries } = useSelector( state => state.notes );

    return (
        <div className="journal__entries">
            {
                entries.map( note => (
                    <JournalEntry key={ note.id } { ...note } />
                ))
            }
        </div>
    )
}
