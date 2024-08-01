const { useState } = React;
const quotes = [
  { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { quote: "Get busy living or get busy dying.", author: "Stephen King" },
  { quote: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
];

const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 128);
  const green = Math.floor(Math.random() * 128);
  const blue = Math.floor(Math.random() * 128);
  return `rgb(${red}, ${green}, ${blue})`;
};

const transition = "all 1s";

function App() {
  const [quote, setQuote] = useState(getRandomQuote());
  const [randomColor, setRandomColor] = useState(getRandomColor());

  const changeQuote = () => {
    setQuote(getRandomQuote());
    setRandomColor(getRandomColor());
  };

  return (
    <div
      className="background"
      style={{ backgroundColor: randomColor, transition }}
    >
      <div id="quote-box">
        <div
          className="quote-content"
          style={{ color: randomColor, transition }}
        >
          <h2 id="text">
            <i className="fa fa-quote-left" style={{ marginRight: "10px" }}></i>
            <span id="quote-text">{quote.quote}</span>
            <i className="fa fa-quote-right" style={{ marginLeft: "10px" }}></i>
          </h2>
          <h4 id="author">
            - <span id="quote-author">{quote.author}</span>
          </h4>
        </div>
        <div className="buttons">
          <a
            id="tweet-quote"
            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.quote}" - ${quote.author}`}
            style={{
              backgroundColor: randomColor,
              marginRight: "10px",
              transition,
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa fa-twitter" style={{ color: "white" }}></i>
          </a>
          <button
            id="new-quote"
            onClick={changeQuote}
            style={{ backgroundColor: randomColor, transition }}
          >
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(<App />);
