import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Try a more interesting route...",
  });
});

app.get("/eat/apple", (req, res) => {
  res.json({
    message: "Yum yum - you ate an apple!",
  });
});

app.get("/eat/banana", (req, res) => {
  res.json({
    message: "Yum yum - you ate a banana!",
  });
});

app.get("/eat/carrot", (req, res) => {
  res.json({
    message: "Yum yum - you ate a carrot!",
  });
});

app.get<{ word: string }>("/eat/:word", (req, res) => {
  const foodWord = req.params.word.toLowerCase();
  const vowels = ["a", "e", "i", "o", "u"];
  const firstLetter = foodWord[0];
  res.json({
    message: `Yum yum - you ate ${
      vowels.includes(firstLetter) ? "an" : "a"
    } ${foodWord}!`,
  });
});

app.get<{ exampleRouteParameter: string }>(
  "/echo/:exampleRouteParameter",
  (req, res) => {
    const echoContent = req.params.exampleRouteParameter;
    res.json({
      echo: echoContent,
      message: `I am echoing back to you: ${echoContent}`,
    });
  }
);

app.get<{ numOne: string; numTwo: string }>(
  "/multiply/:numOne/:numTwo",
  (req, res) => {
    /**
     * Note that `numOne` and `numTwo` are both typed as string.
     * (Hover over with your mouse to see!)
     *
     * Route params are, by default, typed as strings when they
     * are parsed by Express.
     */
    const { numOne, numTwo } = req.params;
    const multiplication = parseInt(numOne) * parseInt(numTwo);
    res.json({
      original: `${numOne} x ${numTwo}`,
      result: multiplication,
    });
  }
);

/**
 * `app.get` can take a type argument.
 *
 *  This could be the name of an existing type (e.g. an interface)
 *    or a literal object type that is provided directly, as below.
 */
app.get<{ name: string }>("/happy-birthday/:name", (req, res) => {
  res.json({
    lyrics: [
      "Happy birthday to you",
      "Happy birthday to you",
      /**
       * The type argument stops us from, e.g., the silly typo
       * of `req.params.namw` - try it, and see!
       */
      `Happy birthday dear ${req.params.name}`,
      "Happy birthday to you!",
    ],
  });
});

app.get<{ word: string }>("/shout/:word", (req, res) => {
  const shoutWord = `${req.params.word.toUpperCase()}!`;
  res.json({
    shout: shoutWord,
    result: `I am shouting back to you: ${shoutWord}`,
  });
});

app.get<{ numOne: string; numTwo: string; numThree: string }>(
  "/add/:numOne/:numTwo/:numThree?",
  (req, res) => {
    const { numOne, numTwo, numThree } = req.params;

    const stringNumArray = [numOne, numTwo, numThree || "0"];
    const numArray = stringNumArray.map((val) => parseInt(val));
    const addition = numArray.reduce(
      (prevValue, currentValue) => prevValue + currentValue,
      0
    );
    res.json({
      original: `${numOne} + ${numTwo} ${numThree ? `+ ${numThree}` : ""}`,
      result: addition,
    });
  }
);

// using 4000 by convention, but could be changed
const PORT_NUMBER = 4000;

app.listen(PORT_NUMBER, () => {
  console.log(`Server is listening on ${PORT_NUMBER}`);
});
