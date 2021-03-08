import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import * as trivia from '../../../core/trivia';
import * as player from '../../../core/player';

import ButtonNext from '../../../components/ButtonNext';
import GameRound from './GameRound';

import * as ranking from '../../../core/ranking';
import * as action from '../../../actions';

import clock from '../../../assets/clock.png';

import {
  GAME_ROUNDS,
  GAME_TIME_LIMIT,
  SECOND,
  SCORE_BASE,
} from '../../../common/Defs';

function GameMatch() {
  const history = useHistory();
  const dispatch = useDispatch();
  // states
  const [time, setTime] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [round, setRound] = useState(null);
  const [matches, setMatches] = useState(0);
  const [done, setDone] = useState(true);
  //

  const gameInit = async () => {
    const data = await trivia.getQuestions();
    setMatches(matches + 1);
    setIsDisabled(false);
    setTime(GAME_TIME_LIMIT);
    setRound(1);
    setDone(false);
    setQuestions(data);
    player.updateScore(0);
    player.updateAssert(0);
  };

  const gameEnd = async () => {
    setIsDisabled(false);
    setTime(null);
    setDone(true);
  };

  useEffect(() => {
    if (!questions) {
      setTimeout(() => {
        gameInit();
      }, SECOND);
    }
  }, [questions]);

  const gameNext = () => {
    setTime(GAME_TIME_LIMIT);
    setRound(round + 1);
    setIsDisabled(false);
    setDone(false);
    if (round >= GAME_ROUNDS) {
      const rank = {
        name: player.getPlayer().player.name,
        score: player.getPlayer().player.score,
        picture: player.getPlayer().player.gravatarEmail,
      };
      ranking.saveScore(rank);
      history.push('/feedback');
    }
  };

  const handleChoice = (value) => {
    if (value && time > 0) {
      const points = (questions[round - 1].score * time) + SCORE_BASE;
      dispatch(action.updateScore(points));
      dispatch(action.updateAssert(1));
      player.updateScore(player.getPlayer().player.score + points);
      player.updateAssert(player.getPlayer().player.assertions + 1);
    }
    setTime(0);
    setDone(true);
  };

  useEffect(() => {
    if (round === GAME_ROUNDS && time === 0) {
      setTimeout(() => {
        gameEnd();
      }, 1);
    }
  }, [round, time]);

  useEffect(() => {
    const timerTick = setInterval(() => {
      if (time > 0 && !done && round) {
        return setTime(time - 1);
      }
      if (time <= 0 && !done && round) {
        setIsDisabled(true);
        return handleChoice(false);
      }
    }, SECOND);
    return () => {
      clearInterval(timerTick);
    };
  }, [handleChoice]);

  return (
    <section className="game-match">
      <section
        className={ done ? 'game-match-time semi-hidden'
          : 'game-match-time blinkme' }
      >
        <img
          src={ clock }
          alt="clock"
          className="game-match-clock-img"
        />
        <span
          className="game-match-clock-display"
        >
          {time}

        </span>
      </section>

      { questions
      && <GameRound
        question={ questions[round - 1] }
        round={ round }
        onChoice={ handleChoice }
        done={ done }
        isDisabled={ isDisabled }
      /> }
      <section className="game-footer">
        { round <= GAME_ROUNDS
        && questions && done
        && <ButtonNext onClick={ gameNext } />}
      </section>
    </section>
  );
}

export default GameMatch;
