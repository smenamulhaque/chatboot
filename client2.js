// Import necessary functions from main.js
import { createChatLi, generateResponse, setElementColor } from './main.js';

// Get DOM elements
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

// Initialize variables
let userMessage = null; 
let chatGptPrompt = "You are a sales consultant on a shoe sales site, your job is to answer customer questions and help them buy"; 
let firstMessage = "Hi there 👋<br>How can I help you today?"; 
// Set colors for chatbot header and toggler
setElementColor(".chatbot header", 'red','black');
setElementColor(".chatbot-toggler", 'red','black');
setElementColor(".chatbox", 'white','black');


const inputInitHeight = chatInput.scrollHeight;


// Function to add the first message dynamically when the DOM content is loaded
const addFirstMessage = () => {
  const firstMessageLi = createChatLi(firstMessage, "incoming");
  chatbox.appendChild(firstMessageLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
}

// Call the function to add the first message when the DOM content is loaded
document.addEventListener("DOMContentLoaded", addFirstMessage);

// Function to handle user chat input
const handleChat = () => {
  userMessage = chatInput.value.trim(); // Get user entered message and remove extra whitespace
  if (!userMessage) return;

  // Clear the input textarea and set its height to default
  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  // Add user message to the chatbox
  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  // Add "Thinking..." message while waiting for the response
  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);
  chatbox.scrollTo(0, chatbox.scrollHeight);
  
  // Generate response asynchronously
  setTimeout(() => {
    generateResponse(incomingChatLi, userMessage, chatGptPrompt);
  }, 600);
}

// Resize the input textarea based on its content
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

// Handle user input when Enter key is pressed
chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

// Handle user input when the send button is clicked
sendChatBtn.addEventListener("click", handleChat);

// Close the chatbot when the close button is clicked
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));

// Toggle the chatbot visibility when the chatbot toggler is clicked
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
