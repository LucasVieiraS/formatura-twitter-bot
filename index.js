const rwClient = require("./twitterClient.js");
const CronJob = require("cron").CronJob;

const postarDias = async () => {
    try {
        var result = pegarDias();
        if (result) {
            console.log("Twittando => " + message)
            await rwClient.v1.tweet(message);
        } else {
            console.log("Não irá twittar, resultado nulo.")
        }
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
        if (dias > 0) {
            return dias + ' dias até a formatura!';
        }
    }
    
    return null;
}

//everyday 5 am
const job = new CronJob("0 6 * * *", () => {
    console.log("Iniciou ciclo de postagem");
    postarDias();
});

console.log("Deve começar em breve.");

postarDias();
job.start();