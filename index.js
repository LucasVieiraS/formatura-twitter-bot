const rwClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

const postar = async (message) => {
    try {
        console.log("Twittando => " + message)
        await rwClient.v1.tweet(message);
    } catch (er) {
        console.log(er)
    }
};

function pegarDias() {
    var date1 = new Date('12/07/2023');
    var date2 = new Date();

    var df = date1.getTime() - date2.getTime();
    var dias = Math.ceil(df / (1000 * 3600 * 24)) - 1;

    if (dias == 0) {
        return 'O dia da formatura chegou!';
    } else {
        return dias + ' dias até a formatura!';
    }
}

//everyday 5 am
const job = new CronJob("55 20 * * *", () => {
    console.log("Iniciou ciclo de postagem")
    postar(pegarDias())
});

console.log("Deve começar em breve.")
job.start();