import * as fs from 'fs';

function totalScore() {
  const input = fs.readFileSync('day2Input.txt', 'utf8');
  const roundStrategyList = input.split('\n').map((round: string) => {
    const [opponent, player] = round.split(' ');
    return {opponent, player};
  });
  let totalScore = 0;
  roundStrategyList.forEach(currentRound => {
    const currentRoundScore = roundScore(currentRound);
    totalScore = totalScore + currentRoundScore;
  });
  console.log(totalScore);
}

function updatedTotalScore() {
  const input = fs.readFileSync('day2Input.txt', 'utf8');
  const roundStrategyList = input.split('\n').map((round: string) => {
    const [opponent, player] = round.split(' ');
    return {opponent, player};
  });
  let totalScore = 0;
  roundStrategyList.forEach(currentRound => {
    const currentRoundScore = updatedRoundScore(currentRound);
    totalScore = totalScore + currentRoundScore;
  });
  console.log(totalScore);
}

function roundScore({
  opponent,
  player,
}: {
  opponent: string;
  player: string;
}): number {
  const resultMatrix = {
    X: {defaultScore: 1, win: 'C', lose: 'B', draw: 'A'},
    Y: {defaultScore: 2, win: 'A', lose: 'C', draw: 'B'},
    Z: {defaultScore: 3, win: 'B', lose: 'A', draw: 'C'},
  };
  let roundScore = resultMatrix[player].defaultScore;
  if (opponent === resultMatrix[player].draw) {
    roundScore = roundScore + 3;
  } else if (resultMatrix[player].win === opponent) {
    roundScore = roundScore + 6;
  }
  return roundScore;
}

function updatedRoundScore({
  opponent,
  player,
}: {
  opponent: string;
  player: string;
}): number {
  const resultMatrix = {
    A: {playerShape: 'Rock', X: 'Scissor', Y: 'Rock', Z: 'Paper'},
    B: {playerShape: 'Paper', X: 'Rock', Y: 'Paper', Z: 'Scissor'},
    C: {playerShape: 'Scissor', X: 'Paper', Y: 'Scissor', Z: 'Rock'},
  };
  const defaultScore = {Rock: 1, Paper: 2, Scissor: 3};
  if (player === 'X') {
    return defaultScore[resultMatrix[opponent].X];
  }
  if (player === 'Y') {
    return 3 + defaultScore[resultMatrix[opponent].Y];
  }
  if (player === 'Z') {
    return 6 + defaultScore[resultMatrix[opponent].Z];
  }
  return 0;
}

totalScore();
updatedTotalScore();