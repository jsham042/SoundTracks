// Information to reach API
const API_URL = "https://api.openai.com/v1/engines/text-davinci-003/completions";


//Asynchronous functions
export const generateSongRecommendations = async(prompt) => {


    const data = JSON.stringify({
      prompt: prompt,
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            }
            });
            if(response.ok){
            const jsonResponse = await response.json();
            const responseArray = jsonResponse.choices[0].text.split(/\d+\.\s/g);
            const filteredResponse = responseArray.map((element) => {
                return element.replace(/\n|\d+\./g, "").trim();
            }).filter((element) => element !== "");
            return(filteredResponse);
        }
    } catch (error) {
            console.log(error);
        }
    }

export const generatePlaylistName = async(prompt) => {
    const data = JSON.stringify({
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            }
        });
        if(response.ok){
            const jsonResponse = await response.json();
            const textResponse = jsonResponse.choices[0].text
            return(textResponse);
        }
    } catch (error) {
        console.log(error);
    }

}
// const prompt = "Come up with a playlist name for playlist with the following vibe: driving down the 101 with the windows down. I'm with friends who like country music. make it less than 50 characters";
// const playlistName = await generatePlaylistName(prompt);
// console.log(playlistName);


export const generateImage = async(prompt) => {


    const data = JSON.stringify({
        "model": "image-alpha-001",
        "prompt": prompt,
        "num_images": 1,
        "size": "512x512"
    });

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            body: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            }
        });
        if(response.ok){
            const jsonResponse = await response.json();
            return jsonResponse.data[0].url;
        }
    } catch (error) {
        console.log(error);
    }
}



export default {generateSongRecommendations, generatePlaylistName};
