// // Text formatting utilities

// export function formatTimestamp(date) {
//   const now = new Date();
//   const diff = now - date;

//   // Less than 1 minute
//   if (diff < 60000) {
//     return 'Just now';
//   }

//   // Less than 1 hour
//   if (diff < 3600000) {
//     const mins = Math.floor(diff / 60000);
//     return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
//   }

//   // Less than 1 day
//   if (diff < 86400000) {
//     const hours = Math.floor(diff / 3600000);
//     return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
//   }

//   // Format as date
//   return date.toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//     hour: '2-digit',
//     minute: '2-digit'
//   });
// }

// export function exportAsText(messages) {
//   let text = 'AI Chatbot Conversation\n';
//   text += '========================\n\n';

//   messages.forEach(msg => {
//     const role = msg.role === 'user' ? 'You' : 'AI';
//     text += `${role}:\n${msg.content}\n\n`;
//   });

//   return text;
// }

// export function exportAsJSON(messages) {
//   return JSON.stringify({
//     exported: new Date().toISOString(),
//     provider: process.env.REACT_APP_AI_PROVIDER,
//     messages: messages
//   }, null, 2);
// }

// export function exportAsMarkdown(messages) {
//   let md = '# AI Chatbot Conversation\n\n';

//   messages.forEach(msg => {
//     const role = msg.role === 'user' ? '**You**' : '**AI**';
//     md += `${role}:\n\n${msg.content}\n\n---\n\n';
//   });

//   return md;
// }

// export function downloadFile(content, filename, type = 'text/plain') {
//   const blob = new Blob([content], { type });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement('a');
//   link.href = url;
//   link.download = filename;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }




// Text formatting utilities

export function formatTimestamp(date) {
  const now = new Date();
  const diff = now - date;
  
  // Less than 1 minute
  if (diff < 60000) {
    return 'Just now';
  }
  
  // Less than 1 hour
  if (diff < 3600000) {
    const mins = Math.floor(diff / 60000);
    return `${mins} ${mins === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  // Less than 1 day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  // Format as date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function exportAsText(messages) {
  let text = 'AI Chatbot Conversation\n';
  text += '========================\n\n';
  
  messages.forEach(msg => {
    const role = msg.role === 'user' ? 'You' : 'AI';
    text += `${role}:\n${msg.content}\n\n`;
  });
  
  return text;
}

export function exportAsJSON(messages) {
  return JSON.stringify({
    exported: new Date().toISOString(),
    provider: process.env.REACT_APP_AI_PROVIDER,
    messages: messages
  }, null, 2);
}

export function exportAsMarkdown(messages) {
  let md = '# AI Chatbot Conversation\n\n';
  
  messages.forEach(msg => {
    const role = msg.role === 'user' ? '**You**' : '**AI**';
    md += `${role}:\n\n${msg.content}\n\n---\n\n`;
  });
  
  return md;
}

export function downloadFile(content, filename, type = 'text/plain') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
