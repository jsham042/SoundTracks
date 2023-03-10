@Test

const prompt = "Come up with a playlist name for playlist with the following vibe: driving down the 101 with the windows down. I'm with friends who like country music. make it less than 50 characters";
const playlistName = await generatePlaylistName(prompt);
console.log(playlistName);
