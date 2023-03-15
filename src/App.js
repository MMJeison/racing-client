import './App.css';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

import Login from './components/Login';
import Game from './components/Game';

const socket = io('http://localhost:3030');

function App() {
  const [playerData, setPlayerData] = useState({});
  const [gameData, setGameData] = useState({});

  const handleFindMatch = (nickname) => {
    socket.emit('setNickname', nickname);
  };

  const handleCancelFindMatch = () => {
    socket.emit('leaveGame');
  };

  const handleKeyDown = (e) => {
    socket.emit('setAxis', {
      id: e.key,
      value: true,
    });
  };

  const handleKeyUp = (e) => {
    socket.emit('setAxis', {
      id: e.key,
      value: false,
    });
  };


  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected in useEffect');
    });
    socket.on('nicknameSet', () => {
      socket.emit('joinGame');
      socket.emit('logGames');
    });
    socket.on('nicknameUnavailable', () => {
      console.log('nickname unavailable');
      alert('Nickname is already taken');
    });
    socket.on('gameStarted', (data) => {
      setGameData(data);
    });
    socket.on('gameUpdated', (data) => {
      setGameData(data);
    });
    socket.on('gameJoined', (data) => {
      setGameData(data.game);
      setPlayerData(data.player);
    } );
    socket.on('gameLeft', (data) => {
      setPlayerData(data);
      setGameData({});
    } );
    socket.on('gameFinished', (data) => {
      console.log('game finished');
      console.log(data);
      setGameData(data);
      });
  }, [socket]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      minWidth: '500px',
      minHeight: '600px',
      backgroundImage: 'url(assets/images/background.jpg)',
    }}>
      <div style={{
        backgroundColor: 'rgb(0, 125, 125)',
        width: '500px',
        height: '600px',
        boxShadow: '0 0 10px 10px rgba(0, 255, 255, 0.3)',
        borderRadius: '10px',
      }}>
        {gameData.status && (gameData.status === 'started' || gameData.status === 'finished') ? 
        <Game gameData={gameData} onhandleKeyDown={handleKeyDown} onhandleKeyUp={handleKeyUp} /> : 
        <Login onHandleFindMatch={handleFindMatch} playerData={playerData} handleCancelFindMatch={handleCancelFindMatch}/>}
      </div>
    </div>
  );
}

export default App;
