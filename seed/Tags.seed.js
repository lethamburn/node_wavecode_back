const mongoose = require("mongoose");
const Tag = require("../models/Tag.model");
const db = require("../db");

const tagSeed = [
  {
    title: "Hip-Hop",
    description:
      "Hip hop or hip-hop is a culture and art movement that was created by African Americans, with heavy influence by Afro-Latino Americans and Caribbean Americans in the Bronx, New York City.",
    image:
      "https://image.freepik.com/vector-gratis/conjunto-objetos-cultura-hip-hop_9645-1061.jpg",
    playlist: [],
  },
  {
    title: "Chill-Hop",
    description:
      "A genre of instrumental music, characterized by a relaxed tone and a rhythmic beat. The word was probably formed by combining the morphs “chill” and “hop”.",
    image:
      "https://chillhop.com/wp-content/uploads/2019/08/ChillhopWebsiteBackground.jpg",
    playlist: [],
  },
  {
    title: "Jazz",
    description:
      "American music developed especially from ragtime and blues and characterized by propulsive syncopated rhythms, polyphonic ensemble playing, varying degrees of improvisation, and often deliberate distortions of pitch and timbre.",
    image:
      "https://www.ciudadvalencia.com.ve/wp-content/uploads/2020/04/Jazz.jpg",
    playlist: [],
  },
  {
    title: "Chill",
    description:
      "Chill-out (shortened as chill; also typeset as chillout or chill out) is a loosely defined form of popular music characterized by slow tempos and relaxed moods. ... Some of the genres associated with chill include downtempo, classical, dance, jazz, hip hop, world, pop, lounge, and ambient.",
    image: "https://m.media-amazon.com/images/I/51rOR5HJpWL._SS500_.jpg",
    playlist: [],
  },
  {
    title: "Instrumental",
    description:
      "An instrumental is a recording normally without any vocals, although it might include some inarticulate vocals, such as shouted backup vocals in a big band setting. Through semantic widening, a broader sense of the word song may refer to instrumentals.",
    image:
      "https://www.eldiadecordoba.es/2020/12/26/cordoba/clasificacion-instrumental_1532257096_129835532_1200x675.jpg",
    playlist: [],
  },
];

mongoose
  .connect(db.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Introduciendo datos de tag desde el seed");

    const allTags = await Tag.find();

    if (allTags.length) {
      await Tag.collection.drop();
      console.log("Se ha eliminado la colección correctamente");
    }
  })
  .then(async () => {
    await Tag.insertMany(tagSeed);
    console.log("Agregadas tags correctamente");
  })
  .catch((error) => {
    console.log("Error al ejecutar el seed --> ", error);
  })
  .finally(() => {
    mongoose.disconnect();
  });
