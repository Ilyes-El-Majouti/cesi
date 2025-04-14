const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const questions = [
    { question: "Quel est la capitale de la France ?", answer: "paris" },
    { question: "Quel est le plus grand océan de la planète ?", answer: "pacifique" },
    { question: "Combien de continents y a-t-il sur Terre ?", answer: "7" },
];

let score = 0;

const ask_question = (question) => {
    return new Promise((resolve) => {
        rl.question(question + " ", (userAnswer) => {
            resolve(userAnswer.trim().toLowerCase());
        });
    });
};

const start_game = async () => {
    console.log("Bienvenue au jeu de devinettes !");
    console.log("Répondez aux questions suivantes :");

    for (const { question, answer } of questions) {
        const user_answer = await ask_question(question);
        if (user_answer === answer) {
            console.log("Bonne réponse !");
            score++;
        } else {
            console.log("Mauvaise réponse, essayez encore !");
        }
    }

    console.log(`Félicitations ! Vous avez terminé le jeu.`);
    console.log(`Votre score : ${score}/${questions.length}`);
    rl.close();
};

start_game();