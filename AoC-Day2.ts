import * as fs from 'fs';

function totalScore() {
  const input = fs.readFileSync('input.txt', 'utf8');
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
  // const dictionary = {
  //   X: 'Rock',
  //   Y: 'Paper',
  //   Z: 'Scissor',
  //   A: 'Rock',
  //   B: 'Paper',
  //   C: 'Scissor',
  // };
  const resultMatrix = {
    A: {playerShape: 'Rock', X: 'Paper', Y: 'Rock', Z: 'Scissor'},
    B: {playerShape: 'Paper', X: 'Scissor', Y: 'Paper', Z: 'Rock'},
    C: {playerShape: 'Scissor', X: 'Rock', Y: 'Scissor', Z: 'Paper'},
  };
  const defaultScore = {Rock: 1, Paper: 2, Scissor: 3};
  if (player === 'X') {
    return defaultScore[resultMatrix[opponent][player]];
  }
  if (player === 'Y') {
    return 3 + defaultScore[resultMatrix[opponent][player]];
  }
  if (player === 'Z') {
    return 6 + defaultScore[resultMatrix[opponent][player]];
  }
  return 0;
}

totalScore();
