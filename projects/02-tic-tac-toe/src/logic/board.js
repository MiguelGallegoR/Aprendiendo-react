import { WINNER_COMBOS } from "../constants";

export const checkWinnerFrom = (boardToCheck) =>{

    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] && // 0-> x u o
        boardToCheck[a] === boardToCheck[b] && //xx u oo
        boardToCheck[a] === boardToCheck[c] //3 en raya
      ) {
          return boardToCheck[a] //ganador
      }
    }
    //si no hay ganador
    return null

}

export const checkEndGame = (newBoard)=>{
    //Si todas las casillas estan rellenas 
    return newBoard.every((square)=> square !==null)
}