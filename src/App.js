const welcome = {
  greeting: 'Hey',
  title: 'React',
};

function getProjectName(name) {
  return name;
}

function App() {
  return (
    <div>
      <h1>{welcome.greeting} {welcome.title}</h1>
      <h2>{getProjectName('Hacker Stories')}</h2>

      <label htmlFor="search">Search:</label>
      <input id='search' type="text"/>
    </div>
  );
}

export default App;
