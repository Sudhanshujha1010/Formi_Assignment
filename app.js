const stateMachine = require('./stateMachine');
const responseGenerator = require('./responseGenerator');
const entityExtractor = require('./entityExtractor');

// This function simulates a conversation turn
async function processTurn(userMessage, conversationContext = {}) {
  // Extract or initialize state
  let currentState = conversationContext.state || "welcome";
  let sessionData = conversationContext.sessionData || {};
  
  console.log(`Current state: ${currentState}`);
  console.log(`User said: "${userMessage}"`);
  
  // Process user input
  const nextState = stateMachine.determineNextState(currentState, userMessage);
  console.log(`Moving to state: ${nextState}`);
  
  // Extract entities from user input
  const entities = entityExtractor.extractEntities(userMessage, nextState);
  console.log(`Extracted entities:`, entities);
  
  // Update session data
  sessionData = {
    ...sessionData,
    ...entities
  };
  console.log(`Updated session data:`, sessionData);
  
  // Generate response based on new state
  const response = await responseGenerator.generateResponse(nextState, userMessage, sessionData);
  console.log(`Agent response: "${response}"`);
  console.log("-".repeat(50));
  
  // Return updated context
  return {
    response: response,
    conversationContext: {
      state: nextState,
      sessionData: sessionData
    }
  };
}

// Function to run a test conversation
async function runTestConversation() {
  console.log("=== Starting Barbeque Nation Chatbot Test ===");
  console.log("=".repeat(50));
  
  let context = {};
  
  // First turn - welcome
  let result = await processTurn("", context);
  context = result.conversationContext;
  
  // Second turn - user asks about information
  result = await processTurn("I want information about Delhi restaurants", context);
  context = result.conversationContext;
  
  // Third turn - user specifies outlet
  result = await processTurn("I'm interested in Connaught Place", context);
  context = result.conversationContext;
  
  // Fourth turn - user asks about timings
  result = await processTurn("What are your timings?", context);
  context = result.conversationContext;
  
  // Fifth turn - user wants to make a reservation
  result = await processTurn("I'd like to make a reservation", context);
  context = result.conversationContext;
  
  // Sixth turn - user provides location
  result = await processTurn("Delhi", context);
  context = result.conversationContext;
  
  // Seventh turn - user provides outlet
  result = await processTurn("Connaught Place", context);
  context = result.conversationContext;
  
  // Eighth turn - user provides date and time
  result = await processTurn("This Saturday at 8 PM", context);
  context = result.conversationContext;
  
  // Ninth turn - user provides guest count
  result = await processTurn("We will be 4 people", context);
  context = result.conversationContext;
  
  // Tenth turn - user provides contact info
  result = await processTurn("My name is John Doe, my number is 9876543210, email is john@example.com", context);
  context = result.conversationContext;
  
  console.log("=== Conversation Test Complete ===");
}

// Run the test conversation
runTestConversation().catch(console.error);