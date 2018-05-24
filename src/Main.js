import React from 'react'

import Sidebar from './Sidebar'
import NoteList from './NoteList'
import NoteForm from './NoteForm'
import base from './firebase.js'

import './Main.css'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      currentNote: this.blankNote(),
      notes: [],
    }
  }

  blankNote = () => {
    return {
      id: null,
      title: '',
      body: '',
    }
  }

  setCurrentNote = (note) => {
    this.setState({ currentNote: note })
  }

  resetCurrentNote = () => {
    this.setCurrentNote(this.blankNote())
  }

  saveNote = (note) => {
    const notes = [...this.state.notes]

    if (!note.id) {
      note.id = Date.now()
      notes.push(note)
    } else {
      const i = notes.findIndex(currentNote => currentNote.id === note.id)
      notes[i] = note
    }

    this.setState({ notes })
    this.setCurrentNote(note)
  }

  removeNote = (note) => {
    const notes = [...this.state.notes]
    const i = notes.findIndex(currentNote => currentNote.id === note.id);
    notes.splice(i,1)
    this.setState({notes})
    this.setCurrentNote(this.blankNote())
  }

  componentWillMount(){
    localStorage.getItem('notes') && this.setState({
        notes: JSON.parse(localStorage.getItem('notes'))
    })
  }

    // componentWillMount(){
    //   base.syncState('Notes', {
    //     context: this,
    //     state: 'notes',
    //   })
    // }

    // componentDidMount(){
    //   base.syncState('Notes', {
    //     context: this,
    //     state: 'notes',
    //     asArray: true
    //   });
    // }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem('notes', JSON.stringify(nextState.notes))
  }

  render() {
    return (
      <div className="Main" style={style}>
        <Sidebar resetCurrentNote={this.resetCurrentNote} />
        <NoteList
          notes={this.state.notes}
          setCurrentNote={this.setCurrentNote}
        />
        <NoteForm
          currentNote={this.state.currentNote}
          saveNote={this.saveNote}
          removeNote={this.removeNote}
        />
      </div>
    )
  }
}

const style = {
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}

export default Main
