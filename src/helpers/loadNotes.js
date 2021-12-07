import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../firebase/firebase-config";

const loadNotes = async ( uid ) => {
    const notesSnap = await getDocs( query( collection( db, `${uid}/journal/notes`) ) );
    const notes = [];
    
    notesSnap.forEach( snapChild => {
        notes.push({
            id: snapChild.id,
            ...snapChild.data()
        });
    });

    return notes;
}

export default loadNotes;