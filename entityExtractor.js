function extractEntities(userInput, state) {
    const input = userInput.toLowerCase();
    const entities = {};
    
    // Extract location
    if (input.includes('delhi')) entities.location = 'Delhi';
    if (input.includes('bangalore') || input.includes('bengaluru')) entities.location = 'Bangalore';
    
    // Extract outlet
    const outlets = {
      'connaught place': 'Connaught Place',
      'vasant kunj': 'Vasant Kunj',
      'janakpuri': 'Janakpuri',
      'koramangala': 'Koramangala',
      'jp nagar': 'JP Nagar',
      'electronic city': 'Electronic City',
      'indiranagar': 'Indiranagar'
    };
    
    Object.keys(outlets).forEach(key => {
      if (input.includes(key)) entities.outlet = outlets[key];
    });
    
    // Extract date/time for booking states
    if (state === "date_time" || state === "contact_info") {
      // Simple date extraction (would need more sophisticated parsing in real app)
      const dateMatch = input.match(/(\d{1,2}(st|nd|rd|th)?\s+\w+|\w+\s+\d{1,2}(st|nd|rd|th)?)/);
      if (dateMatch) entities.date = dateMatch[0];
      
      // Simple time extraction
      const timeMatch = input.match(/(\d{1,2}[:.]\d{2}\s*(am|pm)|(\d{1,2})\s*(am|pm))/i);
      if (timeMatch) entities.time = timeMatch[0];
    }
    
    // Extract guest count for pax state
    if (state === "pax_count") {
      const paxMatch = input.match(/(\d+)\s*(people|persons|guests|pax|individuals)/i);
      if (paxMatch) entities.guestCount = parseInt(paxMatch[1]);
    }
    
    // Extract contact info for contact info state
    if (state === "contact_info") {
      // Extract phone number (simple pattern)
      const phoneMatch = input.match(/(\d{10})/);
      if (phoneMatch) entities.phone = phoneMatch[0];
      
      // Extract email
      const emailMatch = input.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i);
      if (emailMatch) entities.email = emailMatch[0];
      
      // Extract name (basic implementation)
      if (input.includes("name is") || input.includes("call me")) {
        const nameMatch = input.match(/name is\s+([a-zA-Z\s]+)|call me\s+([a-zA-Z\s]+)/i);
        if (nameMatch) entities.name = (nameMatch[1] || nameMatch[2]).trim();
      }
    }
    
    return entities;
  }
  
  module.exports = { extractEntities };