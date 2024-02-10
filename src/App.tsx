import Header from "./components/Header";
import Container from "./components/Container";

function App() {
  return (
    <div>
      <Header />
      <main className="flex items-center justify-center pt-24">
        <Container />
      </main>
    </div>
  );
}

export default App;
