//Sets initial state without which Redux would error containing an array of the 
//analogous model data from the API, a loading boolean for if requests are in 
//progress, and an empty object for a currently introspected upon deletedNote.

const initialState = {
  notes: [],
  loading: false,
  deletedNote: {},
  trash: []
}

// Passes initial state and ability to have actions into reducer, switch case of
// types includes a case for when notes are loading, returning non-mutated state
// and setting loading to true, case for fetching notes from the API to keep
// store current, resetting loading to false and giving the action payload as
// notes, creating a new note into the store, updating the notes, deleting a note,
// clearing the state of the deleted note.

export default function notesReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOADING_NOTES':
      return {
        ...state,
        loading: true
      }
    case 'FETCH_NOTES':
      return {
        ...state,
        notes: action.payload,
        loading: false,
      }
    case 'FETCH_TRASH':
      return{
        ...state,
        trash: action.payload,
        loading: false
      }
    case 'CREATE_NOTE':
      return {
        ...state,
        loading: false,
        notes: [
          ...state.notes,
          action.payload
        ]
      }
    case 'UPDATE_NOTE':
      const noteData = action.payload
      const updatedNoteArray = state.notes.map(note => note.id === noteData.id
          ? noteData : note)
          return {
          ...state,
          loading: false,
          notes: updatedNoteArray
        }
    case 'DELETE_NOTE':
          return {
          ...state,
          loading: false,
          notes: state.notes.filter(note => action.payload.id !== note.id),
          deletedNote: action.payload,
          trash: [...state.trash, action.payload]
        }
      case 'RESTORE_NOTE':
      //Gets Id of the note to be restored
      const restoredId = action.payload.id
      //Finds the next highest id note
      const nextGreatestIdNote = state.notes.find(function (note){
        return note.id > restoredId
      })
      //Gets the index of that note 
      const nextGreatestIdIndex = state.notes.indexOf(nextGreatestIdNote)
      //Tests to see if there IS A note of a higher id, if not, returns last index
      const nextGreatestOrLast = nextGreatestIdIndex === -1 ? state.notes.length : nextGreatestIdIndex
      //Duplicates state.notes
      let updatedArray = [...state.notes]
      //splices array to put back into analogous position
      updatedArray.splice(nextGreatestOrLast, 0, action.payload)
      return {
        ...state,
        loading: false,
        notes: updatedArray,
        trash: state.trash.filter(trashNote => action.payload.id !== trashNote.id)
      }
    case 'HARD_DELETE_NOTE':
      return {
        ...state,
        loading: false,
        deletedNote: action.payload,
        notes: state.notes.filter(note => action.payload.id !== note.id)
      }
    case 'HARD_WIPE_NOTE':
      return {
        ...state,
        loading: false,
        deletedNote: action.payload,
        trash: state.trash.filter(trashNote => action.payload.id !== trashNote.id)
      }
    case 'CLEAR_TRASH':
      return {
        ...state, 
        loading: false,
        trash: []
      }
    case 'CLEAR_DELETED_NOTE':
      return {
        ...state,
        deletedNote: {}
      }
    default:
      return state;
  }
}