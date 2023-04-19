import OpenAiAPIRequest, {
    generatePlaylistName,
    generateImage,
    generateSongRecommendations
} from "../src/util/OpenAiAPIRequest.js";
import expect from "expect";
import Spotify from "../src/util/Spotify.js";


test('generateAlbumArt should return an image URL', async () => {
    const imageUrl = await generateImage('test');
    expect(typeof imageUrl).toBe('object');
});

test('makeRecommendations returns results',()=>{
    expect(Spotify.makeRecommendation(''));
});

test('one plus one equals two', () => {
    expect(1 + 1).toBe(2);
});

//write a test for the openAiSearch function
test('openAiSearch returns results',()=>{
    expect(Spotify.openAiSearch(''));
})
