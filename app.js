const express = require("express");
const ytdl = require("ytdl-core");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // Configuração para servir arquivos estáticos

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Download YouTube Video", message: "Enter YouTube URL below:" });
});

app.get("/download", async (req, res) => {
  try {
    const { url, quality } = req.query;
    const info = await ytdl.getInfo(url);

    // Escolha o formato com base na qualidade selecionada pelo usuário
    const format = ytdl.chooseFormat(info.formats, { quality });

    const title = info.videoDetails.title;

    res.setHeader(
      "Content-Disposition",
      `attachment; filename*=UTF-8''${encodeURIComponent(title)}.mp4`
    );

    ytdl(url, { format }).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
