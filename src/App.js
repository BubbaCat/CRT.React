
import { React, useState } from 'react'
import './App.css';
import { Header } from './components/Header/Header';

const Card = ({ person: { firstName, lastName }, club, teamGoals, cardClick }) => {
  const [goals, setGoals] = useState(0);

  const handleCardClick = () => {
    /*Код снизу выполнится, не так, как вы можете ожидать, кол-во голов увеличится не на 3, а на 1
    Т.к в каждый момент вызова функции setGoals, переменная goals еще не будет содержать в себе другое значение(компонент еще не перерендерился)
    Подробнее про это поговорим на лекции 27.12
    */
    setGoals(goals + 1);
    //перменная goals не изменилась, она все также равно прошлому значению, т.к компонентов еще не обновился в дереве реакта 
    setGoals(goals + 1);
    //перменная goals не изменилась, она все также равно прошлому значению, т.к компонентов еще не обновился в дереве реакта
    setGoals(goals + 1);
    /*
    Весь код сверху будет равносилен просто вызову setGoals 1 раз, 
    чтобы код отработал по нужному на сценарию,при каждом вызове передеавайте функцию которая первым параметром принимает предыдущее значение состояния
    код снизу увеличит состояния на 3
    setGoals((prevGoals) => prevGoals + 1);
    setGoals((prevGoals) => prevGoals + 1);---> тут prevGoals уже будет увеличен на 1 благодаря вызову функции выше
    setGoals((prevGoals) => prevGoals + 1);---> тут prevGoals уже будет увеличен на 2 благодаря вызову функций выше и после вызова этой станет увеличен на 3
    */
    cardClick();
  }
  return (
    <div onClick={handleCardClick}>
      <h3>
        {firstName} {lastName}
      </h3>
      <span>
        Играет в клубе: {club}
      </span>
      <h3>
        Кол-во забитых голов: {goals}
        Кол-во забитых голов: {teamGoals}
      </h3>
    </div>
  );
}


function App() {
  const [teamGoals, setTeamGoals] = useState(0);

  const handleCardClick = () => {
    setTeamGoals(teamGoals + 1);
  }

  return (
    <div className="App">

      <Header headerText={`Количество командных голов: ${teamGoals}`} />

      <header className="App-header">
        <Card
          cardClick={handleCardClick}
          person={{ firstName: 'Ivan', lastName: 'Messi' }}
          club="ЦСКА"
          teamGoals={teamGoals} />
        <Card
          cardClick={handleCardClick}
          person={{ firstName: 'Oleg', lastName: 'Messi' }}
          club="Зенит"
          teamGoals={teamGoals} />
        <Card
          cardClick={handleCardClick}
          person={{ firstName: 'Bob', lastName: 'Messi' }}
          club="Спартак"
          teamGoals={teamGoals} />
      </header>
    </div>
  );
}

export default App;
