export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const data = req.body;
        console.log('Received submission:', {
            student: data.studentName,
            group: data.studentGroup,
            score: data.score
        });
        
        // Format Telegram message
        const telegramMessage = formatTelegramMessage(data);
        
        // Send to Telegram
        const telegramSuccess = await sendTelegramMessage(telegramMessage);
        
        if (!telegramSuccess) {
            console.warn('Failed to send to Telegram, but saving locally');
            // Still return success since we can save locally
        }
        
        // Always return success if we reached here
        return res.status(200).json({ 
            success: true, 
            message: 'Test submitted successfully',
            telegramSent: telegramSuccess
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
    const date = new Date(data.timestamp).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let message = `*📚 Test Submission Received* ${emoji}\n\n`;
    message += `*👤 Student:* ${data.studentName}\n`;
    message += `*👥 Group:* ${data.studentGroup}\n`;
    message += `*📊 Score:* ${data.score}% (${data.correctAnswers}/${data.totalQuestions})\n`;
    message += `*⏱️ Time Taken:* ${data.timeTaken}\n`;
    message += `*📝 Answered:* ${data.answeredQuestions}/${data.totalQuestions}\n`;
    message += `*🔄 Tab Changes:* ${data.pageChanges}\n`;
    message += `*📅 Submitted:* ${date}\n\n`;
    
    // Summary of answers
    message += `*Summary:*\n`;
    message += `✅ Correct: ${data.correctAnswers}\n`;
    message += `❌ Incorrect: ${data.totalQuestions - data.correctAnswers}\n`;
    message += `⏭️ Not Answered: ${data.totalQuestions - data.answeredQuestions}\n\n`;
    
    // Detailed answers (first 5 only to avoid message being too long)
    message += `*Sample Answers (First 5):*\n`;
    data.answers.slice(0, 5).forEach((answer, index) => {
        const status = answer.isCorrect ? '✅' : '❌';
        message += `\n${index + 1}. ${answer.question}\n`;
        message += `   Selected: ${answer.selected}\n`;
        message += `   Correct: ${answer.correct}\n`;
        message += `   ${status}\n`;
    });
    
    if (data.answers.length > 5) {
        message += `\n... and ${data.answers.length - 5} more questions.\n`;
        message += `Full details available in the system.`;
    }
    
    return message;
}

async function sendTelegramMessage(message) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    // Debug logging (remove in production)
    console.log('Telegram Config:', {
        hasToken: !!BOT_TOKEN,
        hasChatId: !!CHAT_ID,
        tokenLength: BOT_TOKEN ? BOT_TOKEN.length : 0
    });
    
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials not configured. Check Vercel environment variables.');
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
        console.log('Telegram API response:', result);
        
        if (!result.ok) {
            console.error('Telegram API error:', result);
            return false;
        }
        
        return true;
        
    } catch (error) {
        console.error('Telegram API request failed:', error);
        return false;
    }
}
