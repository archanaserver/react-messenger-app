import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';//this one is pulling from our config file
import firebase from 'firebase'; //this one is pulling from actual firebase module
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';


function App() {
  const [input, setInput] = useState('');
  //to storing those messages
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');
  // console.log(input);
  // console.log(messages);


  //`its a listener` and most powerful
  useEffect(() => {
    //run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()}))) //`docs`is the entire document and we are looping through all docs
    })
  }, [])


  useEffect(() => {
    //if it's blank inside [], this code run ONCE when the app component loads.
    //if we have a variable like input, it runs everytime input changes
    // const name = prompt('Please enter your name');
    setUsername(prompt('Your username'))

  }, []) //condition

  const sendMessage = (event) => {
    //all the logic to send meg goes here
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // setMessages([
    //   ...messages, {username: username, message: input}
    // ]);
    setInput('');
  }
  return (
    <div className="App">
      <h1>hi babe 💃🏻 let's build this 🚀</h1>
      <h3>Welcome {username}</h3>

      <form className="app__form">
      <FormControl className="app__formControl">
        {/* <InputLabel>enter a msg ...</InputLabel> */}

        <Input className="app__input" placeholder="What's on your mind?" value={input} onChange={event => setInput(event.target.value)}/>
        <IconButton className="app__iconButton" disabled={!input} variant='contained' color='primary' type='submit' onClick={sendMessage}>
          <SendIcon />
        </IconButton>

      </FormControl>
      </form>
      
      {/*input field*/}
      {/*button*/}
      {/* message themselves*/}   

      {/*jsx */}

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
