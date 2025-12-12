export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const submission = req.body;
        
        // Format Telegram message
        const message = formatTelegramMessage(submission);
        
        // Send to Telegram
        const telegramSent = await sendToTelegram(message);
        
        if (telegramSent) {
            // Also save to database or file if needed
            console.log('Test submitted:', {
                student: submission.studentName,
                group: submission.studentGroup,
                score: submission.score,
                timestamp: submission.timestamp
            });
            
            return res.status(200).json({ 
                success: true, 
                message: 'Test submitted successfully' 
            });
        } else {
            throw new Error('Failed to send to Telegram');
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Failed to process submission' 
        });
    }
}

function formatTelegramMessage(submission) {
    const emoji = submission.score >= 80 ? '🎉' : submission.score >= 60 ? '👍' : '📝';
    
    return `*📚 New Test Submission* ${emoji}

*Student:* ${submission.studentName}
*Group:* ${submission.studentGroup}
*Score:* ${submission.score}% (${submission.correct}/${submission.total})
*Time Taken:* ${submission.timeTaken}
*Questions Answered:* ${submission.answered}/${submission.total}
*Page Changes:* ${submission.pageChanges}
*Submitted:* ${new Date(submission.timestamp).toLocaleString()}

*📊 Summary:*
Correct: ${submission.correct}
Incorrect: ${submission.total - submission.correct}
Not Answered: ${submission.total - submission.answered}

*📝 Detailed Answers:*
${submission.answers.map((ans, idx) => 
    `${idx + 1}. ${ans.question}
    ➤ Selected: ${ans.selected}
    ➤ Correct: ${ans.correct}
    ➤ Status: ${ans.isCorrect ? '✅ Correct' : '❌ Incorrect'}
    `
).join('\n')}`;
}

async function sendToTelegram(message) {
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
    
    if (!BOT_TOKEN || !CHAT_ID) {
        console.error('Telegram credentials not configured');
        return false;
    }
    
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
                disable_notification: false
            })
        });
        
        const data = await response.json();
        return data.ok;
    } catch (error) {
        console.error('Telegram API error:', error);
        return false;
    }
}
