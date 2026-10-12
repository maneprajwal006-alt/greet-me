
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Motivational quotes
const quotes = [
    "Believe in yourself!",
    "Never stop learning!",
    "Small steps lead to big success!",
    "Work hard and achieve your dreams!"
];

// Home page
app.get("/", (_req, res) => {
    res.render("home");
});

// Greeting form
app.post("/greet", (req, res) => {
    const name = req.body.name;
    const language = req.body.language;

    const hour = new Date().getHours();

    let greeting;

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 17) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    const greetings = {
        English: greeting,
        Marathi: hour < 12 ? "शुभ सकाळ" :
                 hour < 17 ? "शुभ दुपार" : "शुभ संध्याकाळ",
        Hindi: hour < 12 ? "सुप्रभात" :
               hour < 17 ? "नमस्कार" : "शुभ संध्या"
    };

    const messages = {
        English: "Believe in yourself!",
        Marathi: "स्वतःवर विश्वास ठेवा!",
        Hindi: "खुद पर विश्वास रखो!"
    };

    const quote = quotes[
        Math.floor(Math.random() * quotes.length)
    ];

    res.render("home", {
        name,
        greeting: greetings[language],
        quote: language === "English"
            ? quote
            : messages[language],
        language
    });
});

// REST API
app.get("/api/hello", (_req, res) => {
    res.json({
        message: "Hello from Greeting App!"
    });
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});