import { useEffect } from "react";

const Game = ({ gameData, onhandleKeyDown, onhandleKeyUp }) => {

    const handleKeyDown = (e) => {
        onhandleKeyDown(e);
    }

    const handleKeyUp = (e) => {
        onhandleKeyUp(e);
    }

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    console.log(gameData);

    return (
        <div style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#52576d',
            position: 'relative',
            overflow: 'hidden',
            borderLeft: '7px outset white',
            borderRight: '7px inset white',
        }}>
            {(gameData.seconds >= 0) && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                }}>
                    <label style={{
                        fontSize: '50px',
                        fontWeight: 'bold',
                        color: 'white',
                    }}>
                        Game will start in {gameData.seconds}
                    </label>
                </div>
            )}
            <div style={{
                height: '100%',
                width: '480px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '30px',
                position: 'relative',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                overflow: 'hidden',
                opacity: (gameData.status === "finished") ? 0.3 : 1,
            }}>
                {gameData.players.filter((player) => player.status !== 'dead').map((player, index) => {
                    return (
                        <img src={`assets/images/car${player.position}.png`} alt="rock" style={{
                            height: '100px',
                            width: '60px',
                            position: 'absolute',
                            top: player.location.y,
                            left: player.location.x,
                            zIndex: 2,
                        }} />
                    )
                })
                }
                {gameData.roadLines.map((line, index) => {
                    return (
                        <div style={{
                            height: '100px',
                            width: '10px',
                            backgroundColor: 'white',
                            position: 'absolute',
                            top: line.location.y,
                            left: line.location.x,
                        }}></div>
                    )
                })}
                {gameData.enemys.map((enemy, index) => {
                    return (
                        <img src={`assets/images/car.png`} alt="car" style={{
                            height: '100px',
                            width: '50px',
                            position: 'absolute',
                            top: enemy.location.y,
                            left: enemy.location.x,
                            backgroundColor: enemy.color,
                            borderRadius: '10px',
                        }} />
                    )
                })}
            </div>
            <div style={{
                display: gameData.winner ? 'flex' : 'none',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
                zIndex: 3,
            }}>
                <label style={{
                    fontSize: '50px',
                    fontWeight: 'bold',
                    color: 'white',
                }}>
                    {gameData.winner && `${gameData.winner} won the game`}
                </label>
                <button style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: 'black',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                }} onClick={() => window.location.reload()}>
                    Back to Home
                </button>
            </div>
        </div>
    )
};

export default Game;