const api = require('./api');

// Store the state prompt messages
const statePrompts = {
  welcome: "Welcome to Barbeque Nation! I'm BBQ Assistant. How can I help you today? I can assist with answering questions about our outlets in Delhi and Bangalore, making new reservations, or updating/canceling existing reservations.",
  
  faq_query: "I'd be happy to help with information. Which city are you interested in - Delhi or Bangalore?",
  
  location_selection_faq: "Great! We have several outlets in that city. Which specific outlet would you like information about?",
  
  outlet_selection_faq: "Perfect! What would you like to know about this outlet? I can provide information about timings, menu, address, or special offerings.",
  
  query_resolution: "Is there anything else you'd like to know about our outlets?",
  
  booking_intent: "I'd be happy to help you make a reservation. Which city would you like to dine in - Delhi or Bangalore?",
  
  location_selection_booking: "Excellent choice! Which specific outlet would you prefer?",
  
  outlet_selection_booking: "Great! When would you like to visit? Please let me know your preferred date and time.",
  
  date_time: "How many people will be dining?",
  
  pax_count: "To complete your reservation, I'll need your contact information. Could you please provide your full name, phone number, and email address?",
  
  contact_info: "Thank you! Let me confirm your reservation details.",
  
  cancel_update_intent: "I'll help you manage your reservation. Could you please provide your booking reference number? If you don't have it, I can look it up with your name and reservation date.",
  
  booking_id: "What changes would you like to make to your reservation? You can cancel it, change the date/time, change the number of guests, or change the outlet location.",
  
  confirm_action: "I've updated your reservation successfully.",
  
  confirmation: "Thank you for choosing Barbeque Nation! Is there anything else I can help you with today?"
};

async function generateResponse(state, userInput, sessionData) {
  // Return the appropriate response based on the current state
  let response = statePrompts[state] || "I'm sorry, I didn't understand that.";
  
  // For some states, we need custom logic
  if (state === "query_resolution" && sessionData.location && sessionData.outlet) {
    // Extract the question from user input
    const question = userInput;
    
    // Call the knowledge base API to get an answer
    try {
      const answer = await api.queryKnowledgeBase(sessionData.location, sessionData.outlet, question);
      response = answer + "\n\nIs there anything else you'd like to know?";
    } catch (error) {
      response = "I'm sorry, I couldn't retrieve that information at the moment.";
    }
  }
  
  // Customize confirmation response with booking details
  if (state === "confirmation" && sessionData.location && sessionData.outlet) {
    if (sessionData.date && sessionData.time && sessionData.guestCount) {
      // Generate a fake booking reference number
      const bookingRef = `BBQ-${Math.floor(Math.random() * 9000) + 1000}`;
      
      response = `Great! Your reservation at Barbeque Nation ${sessionData.outlet}, ${sessionData.location} is confirmed for ${sessionData.date} at ${sessionData.time} for ${sessionData.guestCount} guests. Your booking reference number is ${bookingRef}. We've sent a confirmation to your contact details. Thank you for choosing Barbeque Nation! Is there anything else I can help you with?`;
    }
  }
  
  return response;
}

module.exports = { generateResponse };