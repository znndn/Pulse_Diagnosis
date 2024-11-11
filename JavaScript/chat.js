
// const chatWindow = document.getElementById('messages');
// const userInput = document.getElementById('message-input');
// const sendBtn = document.getElementById('send-button');
// const recordList = document.getElementById('record-list');
// const newChatButton = document.getElementById('new-chat-button');

// let chatHistories = []; // 存储所有聊天记录
// let currentChatHistory = []; // 当前聊天记录
// let firstTimestamp = null; // 用于记录当前聊天的初始时间戳
// let isWaitingForReply = false; // 标识是否正在等待助手回复
// let isTyping = false; // 标识是否正在模拟打字机效果输出助手的回复

// // 初始化聊天
// initChat();

// // 发送按钮点击事件
// sendBtn.addEventListener('click', sendMessage);

// // 新建聊天按钮点击事件
// newChatButton.addEventListener('click', newChat);

// // 发送消息的函数
// function sendMessage() {
//     if (isWaitingForReply || isTyping) {
//         // 如果正在等待助手回复或助手正在打字，阻止继续提问
//         return;
//     }

//     const userText = userInput.value.trim();
//     if (userText) {
//         if (!firstTimestamp) {
//             firstTimestamp = new Date().toLocaleString(); // 记录第一次时间戳
//             updateChatRecords(firstTimestamp); // 只在第一次创建聊天记录
//         }

//         const chatEntry = { user: userText, bot: "正在搜索调查...", timestamp: firstTimestamp };
//         currentChatHistory.push(chatEntry); // 添加到当前聊天记录
//         updateMessages(chatEntry); // 显示用户消息
//         userInput.value = '';
//         isWaitingForReply = true; // 设置为等待助手回复状态

//         // 显示助手正在搜索的消息
//         updateMessages({ user: "", bot: "正在搜索调查...", timestamp: firstTimestamp }, true);

//         // 调用 API
//         callLanguageModelAPI(userText)
//             .then(responseText => {
//                 chatEntry.bot = responseText;
//                 isTyping = true; // 开始模拟打字机效果
//                 typeMessage({ user: "", bot: responseText, timestamp: firstTimestamp }, chatEntry); // 逐字输出
//             })
//             .catch(error => {
//                 console.error('Error calling the API:', error);
//                 displayErrorMessage('抱歉，出现了问题，请稍后再试。');
//                 isWaitingForReply = false; // 回复完成，允许继续提问
//             });
//     }
// }

// // 更新聊天窗口
// function updateMessages(chatEntry, isBotResponse = false) {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = isBotResponse ? 'bot-message' : 'user-message';
//     chatWindow.appendChild(messageDiv);
//     chatWindow.scrollTop = chatWindow.scrollHeight;

//     // 如果是助手的回复，显示“助手：”标签
//     if (isBotResponse) {
//         messageDiv.textContent = '助手：' + chatEntry.bot;
//     } else {
//         messageDiv.textContent = '用户：' + chatEntry.user;
//     }
// }

// // 更新聊天记录区域
// function updateChatRecords(timestamp) {
//     // 只在第一次记录时间时，创建记录
//     if (!chatHistories.some(hist => hist.timestamp === timestamp)) {
//         const recordDiv = document.createElement('div');
//         recordDiv.className = 'chat-record';
//         recordDiv.textContent = `聊天记录 (${timestamp})`;
//         recordDiv.addEventListener('click', () => loadChatHistory(timestamp));
//         recordDiv.addEventListener('mouseover', () => recordDiv.classList.add('hover')); // 鼠标悬停效果
//         recordDiv.addEventListener('mouseout', () => recordDiv.classList.remove('hover')); // 鼠标离开时移除效果
//         recordList.appendChild(recordDiv);
//     }
// }

// // 加载对应聊天记录的函数
// function loadChatHistory(timestamp) {
//     // 先清空当前聊天窗口
//     chatWindow.innerHTML = ''; 

//     // 查找与时间戳匹配的聊天记录
//     const chatHistoryToLoad = chatHistories.find(hist => hist.timestamp === timestamp);

//     // 确保找到聊天记录并且该记录有聊天内容
//     if (chatHistoryToLoad && chatHistoryToLoad.chat) {
//         currentChatHistory = chatHistoryToLoad.chat; // 更新当前聊天记录为历史记录
//         firstTimestamp = chatHistoryToLoad.timestamp; // 更新时间戳为该聊天记录的时间戳

//         // 遍历该历史聊天记录并显示
//         chatHistoryToLoad.chat.forEach(entry => {
//             const userDiv = document.createElement('div');
//             userDiv.className = 'user-message';
//             userDiv.textContent = '用户：' + entry.user;
//             chatWindow.appendChild(userDiv);

//             const botDiv = document.createElement('div');
//             botDiv.className = 'bot-message';
//             botDiv.textContent = '助手：' + entry.bot;
//             chatWindow.appendChild(botDiv);
//         });
//     } else {
//         // 如果没有找到聊天记录或该记录为空，显示提示信息
//         const noMessagesDiv = document.createElement('div');
//         noMessagesDiv.className = 'error-message';
//         noMessagesDiv.textContent = '没有找到相关聊天记录。';
//         chatWindow.appendChild(noMessagesDiv);
//     }

//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // 初始化聊天
// function initChat() {
//     currentChatHistory = []; // 清空当前聊天记录
//     firstTimestamp = null; // 重置时间戳
//     const initialEntry = { user: "欢迎使用Pulse诊断助手！", bot: "", timestamp: "" };
//     currentChatHistory.push(initialEntry);
//     chatWindow.innerHTML = ''; // 清空聊天窗口
//     updateMessages(initialEntry); // 显示欢迎消息
// }

// // 新建聊天的函数
// function newChat() {
//     if (firstTimestamp) {
//         // 保存当前聊天记录到聊天历史
//         chatHistories.push({ timestamp: firstTimestamp, chat: currentChatHistory });
//     }
//     firstTimestamp = null; // 重置时间戳
//     initChat(); // 创建新聊天的欢迎信息
// }

// // 调用语言模型 API 的函数
// function callLanguageModelAPI(userInput) {
//     const apiKey = 'sk-dVSYtYhc50Q7GsGmzpJGH2ANjXFMNOhUKNlg8aa2V247lbsL'; // 请替换为您的实际 API 密钥
//     const apiUrl = 'https://api.moonshot.cn/v1/chat/completions';

//     const data = {
//         model: 'moonshot-v1-8k',
//         messages: [{ role: 'user', content: `用户的脉搏数据是：${userInput}，（回答要尽可能简短）` }],
//         max_tokens: 500,
//         temperature: 0.7,
//     };

//     return fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`,
//         },
//         body: JSON.stringify(data),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.choices && data.choices.length > 0) {
//             return data.choices[0].message.content.trim();
//         } else {
//             throw new Error('Invalid API response');
//         }
//     })
//     .catch(error => {
//         console.error('Error calling the API:', error);
//         throw error; // 抛出错误，供上层捕获
//     });
// }

// // 处理API调用错误
// function displayErrorMessage(message) {
//     const errorDiv = document.createElement('div');
//     errorDiv.className = 'error-message';
//     errorDiv.textContent = message;
//     chatWindow.appendChild(errorDiv);
//     chatWindow.scrollTop = chatWindow.scrollHeight;
// }

// // 监听 Enter 键以发送消息
// userInput.addEventListener('keydown', (event) => {
//     if (event.key === 'Enter') {
//         sendMessage();
//     }
// });

// // 按输入框内容变化来启用或禁用发送按钮
// userInput.addEventListener('input', toggleSendButton);
// function toggleSendButton() {
//     const hasInput = userInput.value.trim() !== '';
//     sendBtn.disabled = !hasInput;
//     sendBtn.classList.toggle('enabled', hasInput);
// }

// // 逐字输出函数
// function typeMessage(chatEntry, message, delay = 100) {
//     const botDiv = document.createElement('div');
//     botDiv.className = 'bot-message';
//     chatWindow.appendChild(botDiv);
//     chatWindow.scrollTop = chatWindow.scrollHeight;

//     let charIndex = 0;
//     const interval = setInterval(() => {
//         botDiv.textContent = '助手：' + message.bot.slice(0, charIndex);
//         charIndex++;
//         if (charIndex > message.bot.length) {
//             clearInterval(interval);
//             isWaitingForReply = false;
//             isTyping = false;
//         }
//     }, delay);
// }



const chatWindow = document.getElementById('messages');
const userInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-button');
const recordList = document.getElementById('record-list');
const newChatButton = document.getElementById('new-chat-button');

let chatHistories = []; // 存储所有聊天记录
let currentChatHistory = []; // 当前聊天记录
let firstTimestamp = null; // 用于记录当前聊天的初始时间戳
let isWaitingForReply = false; // 标识是否正在等待助手回复
let isTyping = false; // 标识是否正在模拟打字机效果输出助手的回复

// 初始化聊天
initChat();

// 发送按钮点击事件
sendBtn.addEventListener('click', sendMessage);

// 新建聊天按钮点击事件
newChatButton.addEventListener('click', newChat);

// 发送消息的函数
function sendMessage() {
    if (isWaitingForReply || isTyping) {
        // 如果正在等待助手回复或助手正在打字，阻止继续提问
        return;
    }

    const userText = userInput.value.trim();
    if (userText) {
        if (!firstTimestamp) {
            firstTimestamp = new Date().toLocaleString(); // 记录第一次时间戳
            updateChatRecords(firstTimestamp); // 只在第一次创建聊天记录
        }

        const chatEntry = { user: userText, bot: "正在搜索调查...", timestamp: firstTimestamp };
        currentChatHistory.push(chatEntry); // 添加到当前聊天记录
        updateMessages(chatEntry); // 显示用户消息
        userInput.value = ''; // 清空输入框
        toggleSendButton(); // 更新按钮状态
        isWaitingForReply = true; // 设置为等待助手回复状态

        // 显示助手正在搜索的消息
        // updateMessages({ user: "", bot: "正在搜索调查...", timestamp: firstTimestamp }, true);
        const searchMessage = { user: "", bot: "正在分析数据...", timestamp: firstTimestamp };
        const searchMessageDiv = updateMessages(searchMessage, true);
        // 调用 API
        callLanguageModelAPI(userText)
            .then(responseText => {
                chatWindow.removeChild(searchMessageDiv); 
                chatEntry.bot = responseText;
                isTyping = true; // 开始模拟打字机效果
                // updateMessages({ user: "", bot: responseText, timestamp: firstTimestamp }, true); // 直接显示完整回复
                typeMessage({ user: "", bot: responseText, timestamp: firstTimestamp }, chatEntry); // 逐字输出
                
            })
            .catch(error => {
                console.error('Error calling the API:', error);
                displayErrorMessage('抱歉，您的提问太过于频繁，请间隔1分钟后重试。');
                isWaitingForReply = false; // 回复完成，允许继续提问
            });
    }
}
// 更新聊天窗口
function updateMessages(chatEntry, isBotResponse = false) {
  
    const messageDiv = document.createElement('div');
    messageDiv.className = isBotResponse ? 'bot-message' : 'user-message';
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    // 如果是助手的回复，显示“助手：”标签
    if (isBotResponse|| !chatEntry.user) {
        messageDiv.className = 'bot-message';
        messageDiv.textContent = 'Pulse诊断助手:' + (chatEntry.bot || "");
    } else if (chatEntry.user) {
        messageDiv.className = 'user-message';
        messageDiv.textContent = '您：' + (chatEntry.user || "");
    }
    chatWindow.appendChild(messageDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight; // 保持聊天窗口滚动到底部
    return messageDiv;  // 返回生成的消息元素，用于删除“正在搜索调查...”消息
}
function updateChatRecords(timestamp) {
    // Check if chatHistories already contains the timestamp
    const existingRecord = chatHistories.find(hist => hist.timestamp === timestamp);
    
    // Only add new record if it does not already exist in chatHistories
    if (!existingRecord) {
        const recordDiv = document.createElement('div');
        recordDiv.className = 'chat-record';
        recordDiv.textContent = `聊天记录 (${timestamp})`;

        // When clicked, load the history corresponding to this timestamp
        recordDiv.addEventListener('click', () => loadChatHistory(timestamp));
        recordDiv.addEventListener('mouseover', () => recordDiv.classList.add('hover')); // Mouse hover effect
        recordDiv.addEventListener('mouseout', () => recordDiv.classList.remove('hover')); // Mouse leave effect

        recordList.appendChild(recordDiv);

        // Optionally, you can update `chatHistories` to ensure this timestamp is stored
        chatHistories.push({ timestamp: timestamp, chat: currentChatHistory });
    }
}

// 加载对应聊天记录的函数
function loadChatHistory(timestamp) {
    // 清空当前聊天窗口
    chatWindow.innerHTML = ''; 
    // 查找与时间戳匹配的聊天记录
    const chatHistoryToLoad = chatHistories.find(hist => hist.timestamp === timestamp);

    // 确保找到聊天记录并且该记录有聊天内容
    if (chatHistoryToLoad && chatHistoryToLoad.chat.length > 0) {
        currentChatHistory = chatHistoryToLoad.chat; // 更新当前聊天记录为历史记录
        firstTimestamp = chatHistoryToLoad.timestamp; // 更新时间戳为该聊天记录的时间戳

        // 清空当前聊天窗口
        // chatWindow.innerHTML = ''; 

        // 遍历该历史聊天记录并显示
        chatHistoryToLoad.chat.forEach(entry => {
            if (entry.user || entry.bot) {
            const userDiv = document.createElement('div');
            if (entry.user) { userDiv.className = 'user-message';
            userDiv.textContent = '您：' + (entry.user || "");
            chatWindow.appendChild(userDiv);
            }
            const botDiv = document.createElement('div');
            if (entry.bot) { botDiv.className = 'bot-message';
            botDiv.textContent = 'Pulse诊断助手:' + (entry.bot || "");
            chatWindow.appendChild(botDiv);}}
        });
    } else {
        // 如果没有找到聊天记录或该记录为空，显示提示信息
        const noMessagesDiv = document.createElement('div');
        noMessagesDiv.className = 'error-message';
        noMessagesDiv.textContent = '没有找到相关聊天记录。';
        chatWindow.appendChild(noMessagesDiv);
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 初始化聊天
function initChat() {
    currentChatHistory = []; // 清空当前聊天记录
    firstTimestamp = null; 
    // 重置时间戳
    const initialEntry = { bot: "欢迎使用Pulse诊断助手",timestamp: "" };
    currentChatHistory.push(initialEntry);
    chatWindow.innerHTML = ''; // 清空聊天窗口
    updateMessages(initialEntry); // 显示欢迎消息
}

// 新建聊天的函数
function newChat() {
    if (firstTimestamp) {
        // 保存当前聊天记录到聊天历史
        chatHistories.push({ timestamp: firstTimestamp, chat: currentChatHistory });
    }

   // 清空当前聊天记录和聊天界面
   currentChatHistory = []; // 清空当前聊天记录
   firstTimestamp = null; // 重置时间戳
   chatWindow.innerHTML = ''; // 清空聊天窗口的显示内容
   userInput.value = ''; // 清空输入框
   sendBtn.disabled = false; // 启用发送按钮
   initChat(); // 创建新聊天的欢迎信息

   toggleSendButton(); // 手动调用以检查发送按钮状态
}

// 调用语言模型 API 的函数
function callLanguageModelAPI(userInput) {
    const apiKey = 'sk-dVSYtYhc50Q7GsGmzpJGH2ANjXFMNOhUKNlg8aa2V247lbsL'; // 请替换为您的实际 API 密钥
    const apiUrl = 'https://api.moonshot.cn/v1/chat/completions';

    const data = {
        model: 'moonshot-v1-8k',
        messages: [{ role: 'user', content: `用户的脉搏数据是：${userInput}（请你根据脉搏信息给出建议，回答要尽可能简短）` }],
        max_tokens: 500,
        temperature: 0.7,
    };

    return fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.choices && data.choices.length > 0) {
            return data.choices[0].message.content.trim();
        } else {
            throw new Error('Invalid API response');
        }
    })
    .catch(error => {
        console.error('Error calling the API:', error);
        throw error; // 抛出错误，供上层捕获
    });
}

// 处理API调用错误
function displayErrorMessage(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    chatWindow.appendChild(errorDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// 监听 Enter 键以发送消息
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
        toggleSendButton();// 发送消息后更新按钮状态
    }
    
});
// 逐字输出助手的回复
function typeMessage(chatEntry, message, delay = 100) {
    const botDiv = document.createElement('div');
    botDiv.className = 'bot-message';
    chatWindow.appendChild(botDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    let charIndex = 0;
    const interval = setInterval(() => {
        botDiv.textContent = 'Pulse诊断助手：' + message.bot.slice(0, charIndex);
        charIndex++;
        if (charIndex > message.bot.length) {
            clearInterval(interval);
            isWaitingForReply = false;
            isTyping = false;
        }
    }, delay);
}
function toggleSendButton() {
    const hasInput = userInput.value.trim() !== '';
    sendBtn.disabled = !hasInput;
    sendBtn.classList.toggle('enabled', hasInput);
    
}
