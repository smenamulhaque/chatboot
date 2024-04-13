const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");
const API_KEY = "API KEY"; // Paste your API key here

export const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

export const generateResponse = (chatElement,userMessage,prompt) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Use correct model name
            messages: [{role: "user", content: userMessage},{role: "assistant", content: prompt}], // Use "assistant" instead of "system" for GPT-3.5-Turbo
            max_tokens: 150, // Use "max_tokens" instead of "max_token"
            stop: "\n"
        })
    };

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content.trim();
    }).catch(() => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}
export function setElementColor(selector, bgColor, color) {
    const element = document.querySelector(selector);
    if (element) {
        element.style.backgroundColor = bgColor;
        element.style.color = color;
    } else {
        console.error(`Element with selector '${selector}' not found.`);
    }
}
