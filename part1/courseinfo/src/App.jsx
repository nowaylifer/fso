const Header = ({ text }) => {
  return <h1>{text}</h1>;
};

const Part = ({ data }) => {
  return (
    <p>
      {data.name} {data.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return parts.map((data, id) => <Part data={data} key={id} />);
};

const Total = ({ parts }) => {
  return (
    <p>Number of exercises {parts.reduce((acc, i) => i.exercises + acc, 0)}</p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
