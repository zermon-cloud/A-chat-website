document.getElementById('send-btn').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    const messages = document.getElementById('messages');
    
    if (userInput.trim() === '') {
        return;
    }
    
    // إضافة رسالة المستخدم إلى صندوق الرسائل
    const userMessage = document.createElement('div');
    userMessage.className = 'alert alert-secondary';
    userMessage.textContent = `أنت: ${userInput}`;
    messages.appendChild(userMessage);
    
    // استدعاء GPT-3 API
    fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
        },
        body: JSON.stringify({
            prompt: userInput,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'alert alert-primary';
        aiMessage.textContent = `الذكاء الاصطناعي: ${data.choices[0].text.trim()}`;
        messages.appendChild(aiMessage);
        
        // التمرير إلى أسفل صندوق الرسائل
        messages.scrollTop = messages.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        const aiMessage = document.createElement('div');
        aiMessage.className = 'alert alert-danger';
        aiMessage.textContent = 'الذكاء الاصطناعي: حدث خطأ، يرجى المحاولة مرة أخرى.';
        messages.appendChild(aiMessage);
    });
    
    // مسح حقل الإدخال
    document.getElementById('user-input').value = '';
});
