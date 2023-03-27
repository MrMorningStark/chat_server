const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs')
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const initialPromt = { role: "system", content: "you always respond using bad language!" }

const getTranscript = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, data: null, message: 'No audio file provided' });
    }

    // Retrieving the binary data from the uploaded file

    try {


        const resp = await openai.createTranscription(
            fs.createReadStream('./upload/audio/audioFile.wav'),
            "whisper-1"
        );

        const user = resp.data.text;

        res.status(200).json({ success: true, data: { role: "user", content: user }, message: 'transcripted' })
    } catch (err) {
        res.status(500).json({ success: false, data: null, message: 'not transcripted', error: err.message });
    }

}

const getResponse = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ success: false, data: null, message: 'No audio file provided' });
    }
    try {

        var data = [...req.body.data, { role: "user", content: req.body.text }];

        // if (data.length < 2) {
        //     data = [initialPromt, ...data]
        // }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: data,
        });
        const ai = completion.data.choices[0].message.content;

        data.push({ role: 'assistant', content: ai });

        res.status(200).json({ success: true, data: data, message: 'ai response' });

    } catch (err) {
        res.status(500).json({ success: false, data: null, message: 'not transcripted', error: err.message });
    }

}

module.exports = {
    getTranscript,
    getResponse
};
