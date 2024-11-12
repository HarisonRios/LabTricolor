// var ambiente_processo = 'producao';
var ambiente_processo = "desenvolvimento";
var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var avisosRouter = require("./src/routes/avisos");
var medidasRouter = require("./src/routes/medidas");
var sociotorcedorRouter = require("./src/routes/socioTorcedor");
var quizRouter = require("./src/routes/quiz");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/avisos", avisosRouter);
app.use("/medidas", medidasRouter);
app.use("/sociotorcedor", sociotorcedorRouter);
app.use("/quiz", quizRouter);

app.listen(PORTA_APP, function () {
  console.log(`

    ███████╗██████╗ ███████╗ ██████╗
    ██╔════╝██╔══██╗██╔════╝██╔════╝
    ███████╗██████╔╝█████╗  ██║     
    ╚════██║██╔═══╝ ██╔══╝  ██║     
    ███████║██║     ██║     ╚██████╗
    ╚══════╝╚═╝     ╚═╝      ╚═════╝

    🎉 Servidor iniciado com sucesso!                       
    🏟️ Atenção, torcedor! Seu servidor está a mil por hora! Acesse agora e fique por dentro da ação: http://${HOST_APP}:${PORTA_APP} ⚽️\n\n` +
      `🚀 Você está jogando em um ambiente de: ${process.env.AMBIENTE_PROCESSO}.\n\n` +
      `- 🟢 Se for desenvolvimento, você está fazendo uma partida no banco local.\n` +
      `- 🔴 Se for produção, é hora de brilhar com o banco remoto!\n\n` +
      `🔧 Para mudar seu ambiente, basta comentar ou descomentar as linhas 1 ou 2 no arquivo 'app.js'.\n\n` +
    `💪🏽🏆 Vamos juntos rumo à vitória! `);
});
