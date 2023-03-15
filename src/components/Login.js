import { useState, useEffect } from 'react';

//regex to check if the string is only letters and numbers
const regex = /^[a-zA-Z0-9]+$/;

const Login = ({ onHandleFindMatch, playerData, handleCancelFindMatch }) => {
    const [nickname, setNickname] = useState('');
    const handleNicknameChange = (e) => {
        let nickn = e.target.value.trim();
        if (nickn.length > 1) {
            if (nickn.length > 10) return;
            if (!regex.test(nickn)) return;
        }
        setNickname(nickn.toUpperCase());
    };

    const handleFindMatch = () => {
        if (nickname.length < 1) {
            alert('Nickname must be at least 1 characters long');
            return;
        }
        console.log('find match');
        onHandleFindMatch(nickname);
    };

    const handleKeyDown = (e) => {
        //console.log(e.key);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div style={{
            height: '100%',
            width: '100%',
            position: 'relative',
        }}>
            <div style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                opacity: playerData.status === 'findingGame' ? 0.3 : 1,
            }} >
                <label style={{
                    width: '400px',
                    fontSize: '50px',
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                }}>
                    Enter your NickName
                </label>
                <input type="text" placeholder="NickName" style={{
                    width: '300px',
                    height: '70px',
                    borderRadius: '10px',
                    border: 'none',
                    boxShadow: '0 0 10px 10px rgba(0, 255, 255, 0.3)',
                    outline: 'none',
                    padding: '0 20px',
                    fontSize: '40px',
                }} value={nickname} onChange={handleNicknameChange} onKeyUp={(e) => {
                    if (e.key === 'Enter') handleFindMatch();
                }} disabled={playerData.status === 'findingGame' ? true : false} />
                <button style={{
                    width: '300px',
                    height: '80px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 10px rgba(150, 255, 155, 0.3)',
                    borderColor: 'none',
                    padding: '0 20px',
                    fontSize: '50px',
                    backgroundColor: 'rgb(0, 125, 125)',
                    color: 'white',
                }} onClick={handleFindMatch} disabled={playerData.status === 'findingGame' ? true : false} >
                    Find Match
                </button>
            </div>
            <div style={{
                height: '100%',
                width: '100%',
                display: playerData.status === 'findingGame' ? 'flex' : 'none',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <label style={{
                    width: '400px',
                    fontSize: '50px',
                    fontWeight: 'bold',
                    color: 'black',
                    textAlign: 'center',
                    textShadow: '0 0 10px rgba(250, 0, 255, 0.5)',
                }}>
                    Buscando partida...
                </label>
                <button style={{
                    width: '280px',
                    height: '80px',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 10px rgba(150, 255, 155, 0.3)',
                    borderColor: 'none',
                    padding: '0 20px',
                    fontSize: '50px',
                    fontWeight: 'bold',
                    backgroundColor: 'rgb(0, 125, 125)',
                    color: 'white',
                }} onClick={handleCancelFindMatch} >
                    Cancelar
                </button>
            </div>
        </div>
    )
};

export default Login;