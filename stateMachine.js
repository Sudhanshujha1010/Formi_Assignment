function determineNextState(currentState, userInput) {
    const input = userInput.toLowerCase();
    
    switch(currentState) {
      case "welcome":
        if (input.includes("question") || input.includes("information") || input.includes("timings") || input.includes("menu") || input.includes("address"))
          return "faq_query";
        else if (input.includes("book") || input.includes("reservation") || input.includes("table") || input.includes("reserve"))
          return "booking_intent";
        else if (input.includes("cancel") || input.includes("change") || input.includes("update") || input.includes("modify"))
          return "cancel_update_intent";
        else
          return "welcome"; // Stay in welcome if intent is unclear
      
      case "faq_query":
        if (input.includes("delhi") || input.includes("bangalore") || input.includes("bengaluru"))
          return "location_selection_faq";
        else
          return "location_selection_faq"; // Proceed to location selection if not specified
      
      case "location_selection_faq":
        if (input.includes("connaught") || input.includes("vasant") || input.includes("janakpuri") || 
            input.includes("koramangala") || input.includes("jp nagar") || input.includes("electronic city") || input.includes("indiranagar"))
          return "outlet_selection_faq";
        else
          return "outlet_selection_faq"; // Proceed to outlet selection
      
      case "outlet_selection_faq":
        return "query_resolution"; // After outlet selection, proceed to resolution
      
      case "query_resolution":
        if (input.includes("thank") || input.includes("bye") || input.includes("that's all") || input.includes("that is all"))
          return "confirmation";
        else if (input.includes("book") || input.includes("reservation"))
          return "booking_intent";
        else
          return "query_resolution"; // Stay for more questions
      
      case "booking_intent":
        return "location_selection_booking";
      
      case "location_selection_booking":
        return "outlet_selection_booking";
      
      case "outlet_selection_booking":
        return "date_time";
      
      case "date_time":
        return "pax_count";
      
      case "pax_count":
        return "contact_info";
      
      case "contact_info":
        return "confirmation";
      
      case "cancel_update_intent":
        return "booking_id";
      
      case "booking_id":
        return "confirm_action";
      
      case "confirm_action":
        return "confirmation";
      
      case "confirmation":
        if (input.includes("another") || input.includes("more") || input.includes("else") || input.includes("different"))
          return "welcome"; // Start over if they want something else
        else
          return "confirmation"; // Stay in end state
      
      default:
        return "welcome"; // Default to welcome state
    }
  }
  
  module.exports = { determineNextState };