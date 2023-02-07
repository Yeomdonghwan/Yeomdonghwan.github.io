    import {
        Configuration,
        OpenAIApi
    } from 'https://cdn.skypack.dev/openai';

    function sendText() {
        let text = $('#input').val();
        let template =
            `<div class="line">
                <span class="chat-box mine">${text}</span>
            </div>`;

        $('#input').val('');
        $('.chat-content').append(template);


        $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'));

        const configuration = new Configuration({
            apiKey: '#',
        });
        const openai = new OpenAIApi(configuration);

        openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${text}`,
            temperature: 0.7,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        }).then((result) => {

            let answer = result.data.choices[0].text;
            let template =
                `<div class="line">
               <div class="profile">
                   <img src="images/%ED%86%A0%EB%A6%AC%ED%94%84%EB%A1%9C%ED%95%84.jpg"style="width:100%">
               </div>
                <span class="chat-box">${answer}</span>
            </div>`;

            $('.chat-content').append(template);

            $('.chat-content').scrollTop($('.chat-content').prop('scrollHeight'));


        })
    }
    $('#send').click(function () {
        sendText();
    })

    $('#input').keypress(function (e) {
        if (e.keyCode == 13) {
            sendText();
        }
    })

    
