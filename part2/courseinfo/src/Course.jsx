const Header = ({ text }) => <h1>{text}</h1>;

const Part = ({ data }) => (
  <p>
    {data.name} {data.exercises}
  </p>
);

const Content = ({ parts }) =>
  parts.map((data, id) => <Part data={data} key={id} />);

const Total = ({ parts }) => (
  <p>
    <b>Total of exercises {parts.reduce((acc, i) => i.exercises + acc, 0)}</b>
  </p>
);

const Course = ({ course }) => (
  <>
    <Header text={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </>
);

export default Course;
