import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase'; //* this one is pulling from our config file
import firebase from 'firebase'; //* this one is pulling from actual firebase module
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); //* to storing those messages
  const [username, setUsername] = useState('');
  
  //!Test
  // console.log(input);
  // console.log(messages);


  //* `its a listener` and most powerful
  //* run once when the app component loads
  useEffect(() => { 
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))) //`docs`is the entire document and we are looping through all docs
    })
  }, [])

  //* if it's blank inside [], this code run ONCE when the app component loads.
  //* if we have a variable like some input, it runs everytime input changes
  useEffect(() => {
    setUsername(prompt('what is your username?✨'))

  }, []) //condition

  const sendMessage = (event) => {
    //* all the logic to send msg goes here
    event.preventDefault(); //* prevent from instant refresh

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('');
  }
  return (
    <div className="app">
      <h1>hi there 🌻 say hi 🦄 let's talk 💬</h1>
      <h3>ya! you are in {username}</h3>

      {/* CHATBOX FUNCTIONALITY */}
      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder="What's on your mind?" value={input} onChange={event => setInput(event.target.value)}/>
          <IconButton className="app__iconButton" disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      {/*MATERIAL UI STUFFS*/}
      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message}/>
          ))
        }
      </FlipMove>
      
    </div>
  );
}

export default App;