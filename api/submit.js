export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const data = req.body;
        
        // Format Telegram message
        const telegramMessage = formatTelegramMessage(data);
        
        // Send to Telegram
        const telegramSuccess = await sendTelegramMessage(telegramMessage);
        
        if (!telegramSuccess) {
            throw new Error('Failed to send to Telegram');
        }
        
        // Log for debugging
        console.log('Test submitted:', {
            student: data.studentName,
            group: data.studentGroup,
            score: data.score,
            time: data.timeTaken
        });
        
        return res.status(200).json({ 
            success: true, 
            message: 'Test submitted successfully'
        });
        
    } catch (error) {
        console.error('Error in submit API:', error);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}

function formatTelegramMessage(data) {
    const emoji = data.score >= 80 ? '🎉' : data.score >= 60 ? '👍' : '📝';
    const date = new Date(data.timestamp).toLocaleString();
    
    let message = `*📚 Test Submission Received* ${emoji}\n\n`;
    message += `*👤 Student:* ${data.studentName}\n`;
    message += `*👥 Group:* ${data.studentGroup}\n`;
    message += `*📊 Score:* ${data.score}% (${data.correctAnswers}/${data.totalQuestions})\n`;
    message += `*⏱️ Time Taken:* ${data.timeTaken}\n`;
    message += `*📝 Answered:* ${data.answeredQuestions}/${data.totalQuestions}\n`;
    message += `*🔄 Tab Changes:* ${data.pageChanges}\n`;
    message += `*📅 Submitted:* ${date}\n\n`;
    
    message += `*Detailed Answers:*\n`;
    
    data.answers.forEach((answer, index) => {
        const status = answer.isCorrect ? '✅' : '❌';
        message += `\n${index + 1}. ${answer.question}\n`;
        message += `   Selected: ${answer.selected}\n`;
        message += `   Correct: ${answer.correct}\n`;
        message += `   ${status}\n`;
    });
    
    return message;
}

async function sendTelegramMessage(message) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials not configured');
        return false;
    }
    
    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
                disable_web_page_preview: true
            })
        });
        
        const result = await response.json();
        return result.ok === true;
        
    } catch (error) {
        console.error('Telegram API error:', error);
        return false;
    }
}
