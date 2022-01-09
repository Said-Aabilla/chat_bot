class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button'),
            audioButton: document.querySelector('.audio__button'),
            selectLang: document.querySelector('#langs'),
        }
        this.lang = "";
        this.state = false;
        this.messages = [];
    }

    display() {
        const {openButton, chatBox, sendButton, audioButton, selectLang} = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        audioButton.addEventListener('click', () => this.onAudioButton(chatBox))

        selectLang.addEventListener('change',  (val) => {
            this.setLang( val.target.value);
        });

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({key}) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    setLang(value) {
        this.lang = value;
        console.log(this.lang);
    }

    toggleState(chatbox) {
        this.state = !this.state;
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value
        if (text1 === "") {
            return;
        }

        let msg1 = {name: "User", message: text1}
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({message: text1}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = {name: "Sam", message: r.answer};
                this.messages.push(msg2);
                this.updateChatText(chatbox)
                textField.value = ''

            }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    onAudioButton(chatbox) {
        fetch($SCRIPT_ROOT + '/audio', {
            method: 'POST',
            body: JSON.stringify({message: null, lang: this.lang}),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let question = {name: "User", message: r.question};
                let response = {name: "Sam", message:r.answer};
                this.messages.push(question);
                this.messages.push(response);
                this.updateChatText(chatbox);
                textField.value = ''

            }).catch((error) => {
            console.error('Error:', error);
            this.updateChatText(chatbox)
            textField.value = ''
        });
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }

}

function decode_utf8(s) {
    return decodeURIComponent(escape(s));
}

const chatbox = new Chatbox();
chatbox.display();

