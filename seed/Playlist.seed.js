const mongoose = require("mongoose");
const Playlist = require("../models/Playlist.model");
const db = require("../db");

const playlistSeed = [
  {
    title: "Lofi Coding (beats to code/relax to)",
    description: "https://open.spotify.com/playlist/3DIjw8eboATMgRN2RC6mz6",
    image: "https://i.ytimg.com/vi/f02mOEt11OQ/maxresdefault.jpg",
    tags: [],
    playlistID: "3DIjw8eboATMgRN2RC6mz6",
  },
  {
    title: "Coding Lo-Fi-Programming",
    description: "https://open.spotify.com/playlist/3vXUEGi4ip1EhI9OtdgdCy",
    image: "https://i.ytimg.com/vi/SigIbCVMTzU/maxresdefault.jpg",
    tags: [],
    playlistID: "3vXUEGi4ip1EhI9OtdgdCy",
  },
  {
    title: "Programming and Coding Lofi Hip-Hop",
    description: "https://open.spotify.com/playlist/6ck3rYLGEOELZjQnUE0srv",
    image: "https://i.ytimg.com/vi/PuxvZo8Hrlo/maxresdefault.jpg",
    tags: [],
    playlistID: "6ck3rYLGEOELZjQnUE0srv",
  },
  {
    title: "CODING LO-FI",
    description: "https://open.spotify.com/playlist/0KkE0nt5R2ZhZmq6JdzdJn",
    image: "https://i.ytimg.com/vi/bmVKaAV_7-A/maxresdefault.jpg",
    tags: [],
    playlistID: "0KkE0nt5R2ZhZmq6JdzdJn",
  },
  {
    title: "Lofi Code - Beats to study or coding",
    description: "https://open.spotify.com/playlist/5CwTOCWMVQ7yLdq79rZ6lC",
    image: "https://i.ytimg.com/vi/_ITiwPMUzho/maxresdefault.jpg",
    tags: [],
    playlistID: "5CwTOCWMVQ7yLdq79rZ6lC",
  },
  {
    title: "Lo-Fi Coding & Rocket League",
    description: "https://open.spotify.com/playlist/5RTGiLH35aOXJKkpa4nE8z",
    image: "https://i.ytimg.com/vi/vFRGhAKbAU4/hqdefault.jpg",
    tags: [],
    playlistID: "5RTGiLH35aOXJKkpa4nE8z",
  },
  {
    title: "Lofi filtered from the masses",
    description: "https://open.spotify.com/playlist/0fTnjUDTt2TdPUcFevfppy",
    image: "https://i.scdn.co/image/ab67616d0000b2735ca5a4fceb9a1f1e414d8d87",
    tags: [],
    playlistID: "0fTnjUDTt2TdPUcFevfppy",
  },
  {
    title: "Lo-Fi | Beats",
    description: "https://open.spotify.com/playlist/7bm54ih3uLZDjbPcVlseQW",
    image:
      "https://i2.wp.com/www.ismorbo.com/wp-content/uploads/2020/03/screen-shot-2020-03-23-at-3-04-37-pm.jpg?fit=2378%2C1336&ssl=1",
    tags: [],
    playlistID: "7bm54ih3uLZDjbPcVlseQW",
  },
  {
    title: "Power Coding",
    description: "https://open.spotify.com/playlist/6bHn6PG7WLLalbAoWOhH3o",
    image: "https://axiomq.com/wp-content/uploads/2019/08/Coder-1-1024x682.jpg",
    tags: [],
    playlistID: "6bHn6PG7WLLalbAoWOhH3o",
  },
  {
    title: "Coding Concentration",
    description: "https://open.spotify.com/playlist/7gOACZMdo4V3IP1NnbXtPV",
    image: "https://i1.sndcdn.com/artworks-BbrW2HKldbKi-0-t500x500.jpg",
    tags: [],
    playlistID: "7gOACZMdo4V3IP1NnbXtPV",
  },
  {
    title: "Lo-fi / Trip Hop",
    description: "https://open.spotify.com/playlist/39532XfnpVDtheQx6cAX1Z",
    image: "https://miro.medium.com/max/2560/1*hPiuY_EZQfVSwmVND3FSUA.jpeg",
    tags: [],
    playlistID: "39532XfnpVDtheQx6cAX1Z",
  },
  {
    title: "L⊚-Fi | チルビート",
    description: "https://open.spotify.com/playlist/6zvSltDvmTp7Y60bOoDi9O",
    image: "https://i.ytimg.com/vi/z4C09UelmvA/hqdefault.jpg",
    tags: [],
    playlistID: "6zvSltDvmTp7Y60bOoDi9O",
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Introduciendo datos de playlist desde el seed");

    const allPlaylists = await Playlist.find();

    if (allPlaylists.length) {
      await Playlist.collection.drop();
      console.log("Se ha eliminado la colección correctamente");
    }
  })
  .then(async () => {
    await Playlist.insertMany(playlistSeed);
    console.log("Agregadas playlists correctamente");
  })
  .catch((error) => {
    console.log("Error al ejecutar el seed --> ", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
