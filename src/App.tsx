import Header from "./components/Header";
import Container from "./components/Container";
import Quote from "./components/Quote";

function App() {
  return (
    <div>
      <Header />
      <Quote />
      <main className="mt-10 flex items-center justify-center">
        <Container />
      </main>
      <footer className="p-10" />
    </div>
  );
}

export default App;
