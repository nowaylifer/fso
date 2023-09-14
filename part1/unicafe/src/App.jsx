import { useState } from 'react';

const Button = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);

const StatisticLine = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ reviews }) => {
  const { good, neutral, bad } = reviews;
  const all = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / all || 0;
  const positive = ((good / all) * 100 || 0) + '%';

  if (all) {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <StatisticLine name="good" value={good} />
          <StatisticLine name="neutral" value={neutral} />
          <StatisticLine name="bad" value={bad} />
          <StatisticLine name="all" value={all} />
          <StatisticLine name="average" value={average} />
          <StatisticLine name="positive" value={positive} />
        </table>
      </div>
    );
  }

  return (
    <div>
      <h2>Statistics</h2>
      <p>No feedback given</p>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood(good + 1);
  const handleNeutralClick = () => setNeutral(neutral + 1);
  const handleBadClick = () => setBad(bad + 1);

  return (
    <div>
      <h2>Give feedback</h2>
      <Button onClick={handleGoodClick}>good</Button>
      <Button onClick={handleNeutralClick}>neutral</Button>
      <Button onClick={handleBadClick}>bad</Button>
      <Statistics reviews={{ good, neutral, bad }} />
    </div>
  );
};

export default App;
