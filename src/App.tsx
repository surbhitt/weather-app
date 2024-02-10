import Header from "./components/Header";
import Container from "./components/Container";

function App() {
  return (
    <div>
      <Header />
      <main className="flex items-center justify-center pt-24">
        {/**if you want to see the sunshine you have to weather the storm - frank lane */}
        <Container />
      </main>
      <footer className="p-10" />
    </div>
  );
}

export default App;
