async function queryKnowledgeBase(location, outlet, question) {
    try {
      // In a real implementation, this would be a fetch call to your API
      console.log(`Querying knowledge base for: ${location}, ${outlet}, "${question}"`);
      
      // For testing purposes, simulate an API response
      return `Here is information about ${outlet} in ${location} regarding "${question}"`;
      
      // Actual implementation would be:
      // const response = await fetch(`https://bbq-knowledgebase-api.onrender.com/api/faq?location=${location}&outlet=${outlet}&question=${question}`);
      // const data = await response.json();
      // return data.answer;
    } catch (error) {
      console.error("Error querying knowledge base:", error);
      return "I'm sorry, I couldn't retrieve that information at the moment.";
    }
  }
  
  module.exports = { queryKnowledgeBase };