// // server.js
// const express = require('express');
// const fetch = require('node-fetch');
// const app = express();

// app.use(express.json());

// app.post('/api/getDiagnosis', async (req, res) => {
//     const userInput = req.body.userInput;
//     const apiKey = 'sk-dVSYtYhc50Q7GsGmzpJGH2ANjXFMNOhUKNlg8aa2V247lbsL'; // 安全地存储您的 API 密钥，例如使用环境变量
//     const apiUrl = 'https://api.moonshot.cn/v1/chat/completions';

//     const data = {
//         model: 'https://api.moonshot.cn/v1/models',
//         messages: [
//             { role: 'user', content: `用户的脉搏数据是：${userInput}\n请根据脉搏数据给出诊断意见。` }
//         ],
//         max_tokens: 150,
//         temperature: 0.7,
//     };

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${apiKey}`,
//             },
//             body: JSON.stringify(data),
//         });
//         const result = await response.json();
//         if (result.choices && result.choices.length > 0) {
//             res.json({ diagnosis: result.choices[0].message.content.trim() });
//         } else {
//             res.status(500).json({ error: 'Invalid API response' });
//         }
//     } catch (error) {
//         console.error('Error calling the API:', error);
//         res.status(500).json({ error: 'Error calling the API' });
//     }
// });

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });





//   const navLinks = document.querySelectorAll('.nav-links li a');
//   const dropdownMenu = document.querySelector('.dropdown-menu');
//   const dropdownContents = document.querySelectorAll('.dropdown-content');
//   const mainContent = document.querySelector('.main-content');

//   navLinks.forEach(link => {
//       link.addEventListener('mouseenter', () => {
//           // 获取对应的下拉内容
//           const menuName = link.getAttribute('data-menu');
//           const targetContent = document.querySelector(`.dropdown-content[data-menu="${menuName}"]`);

//           if (targetContent) {
//               // 添加变暗效果
//               navLinks.forEach(otherLink => {
//                   if (otherLink !== link) {
//                       otherLink.classList.add('dimmed');
//                   } else {
//                       otherLink.classList.remove('dimmed');
//                   }
//               });

//               // 显示下拉菜单
//               dropdownMenu.classList.add('show');

//               // 隐藏所有下拉内容
//               dropdownContents.forEach(content => {
//                   content.style.display = 'none';
//               });

//               // 显示对应的下拉内容
//               targetContent.style.display = 'block';

//               // 添加模糊效果
//               mainContent.classList.add('blurred');
//           }
//       });

//       link.addEventListener('mouseleave', () => {
//           // 鼠标离开导航链接时，检查鼠标是否进入下拉菜单
//           setTimeout(() => {
//               if (!dropdownMenu.matches(':hover') && !link.matches(':hover')) {
//                   hideDropdown();
//               }
//           }, 100);

//           // 移除变暗效果
//           navLinks.forEach(otherLink => {
//               otherLink.classList.remove('dimmed');
//           });
//       });
//   });

//   // 当鼠标离开下拉菜单时，隐藏下拉菜单并移除变暗效果
//   dropdownMenu.addEventListener('mouseleave', () => {
//       hideDropdown();
//   });

//   function hideDropdown() {
//       dropdownMenu.classList.remove('show');
//       mainContent.classList.remove('blurred');

//       // 移除所有导航链接的变暗效果
//       navLinks.forEach(link => {
//           link.classList.remove('dimmed');
//       });
//   }
//   // 获取元素
//   const chatIcon = document.getElementById('chat-icon');
//   const chatDialog = document.getElementById('chat-dialog');
//   const closeBtn = document.querySelector('.close-btn');
//   const sendBtn = document.getElementById('send-btn');
//   const userInput = document.getElementById('user-input');
//   const chatWindow = document.getElementById('chat-window');
//   console.log(closeBtn);
//   // 点击图标，显示对话框
//   chatIcon.addEventListener('click', () => {
//       chatDialog.style.display = 'block';
//   });

//   // 点击关闭按钮，隐藏对话框
//   closeBtn.addEventListener('click', () => {
//       chatDialog.style.display = 'none';
//   });

//   // 点击发送按钮，处理用户输入
//   sendBtn.addEventListener('click', () => {
//       const userText = userInput.value.trim();
//       let botMessage; // 在函数顶部声明 botMessage
//       if (userText) {
//           // 显示用户输入
//           const userMessage = document.createElement('div');
//           userMessage.className = 'user-message';
//           userMessage.textContent = '用户：' + userText;
//           chatWindow.appendChild(userMessage);

//           // 清空输入框
//           userInput.value = '';

//           // 滚动到底部
//           chatWindow.scrollTop = chatWindow.scrollHeight;
//           // 模拟系统回复
//           // const botMessage = document.createElement('div');
//           // botMessage.className = 'bot-message';
//           // botMessage.textContent = '系统：' + '您输入的脉搏数据是 ' + userText + '。我们将尽快为您分析。';
//           // chatWindow.appendChild(botMessage);
//           // 显示系统正在处理的消息
//           botMessage = document.createElement('div'); // 这里赋值
//           botMessage.className = 'bot-message';
//           botMessage.textContent = '系统：正在分析您的脉搏数据，请稍候...';
//           chatWindow.appendChild(botMessage);

//           // 调用语言模型 API
//           callLanguageModelAPI(userText)
//               .then(response => {
//                   // 更新系统回复
//                   botMessage.textContent = '系统：' + response;
//                   // 滚动到底部
//                   chatWindow.scrollTop = chatWindow.scrollHeight;
//               })
//               .catch(error => {
//                   console.error('Error:', error);
//                   botMessage.textContent = '系统：抱歉，处理您的请求时出现错误。';
//               });
//       }
//   });
//   function callLanguageModelAPI(userInput) {
//     const apiKey = 'sk-dVSYtYhc50Q7GsGmzpJGH2ANjXFMNOhUKNlg8aa2V247lbsL'; // 请替换为您的实际 API 密钥
//     const apiUrl = 'https://api.moonshot.cn/v1/chat/completions'; // 确认这是正确的 API 端点
   
//     // 构造请求数据
//     const data = {
//         model: 'moonshot-v1-8k', // 或者您使用的其他模型
//         messages: [
//             { role: 'user', content: `用户的脉搏数据是：${userInput}\n请根据脉搏数据给出诊断意见。` }
//         ],
//         max_tokens: 150,
//         temperature: 0.7,
//     };

//     // 返回一个 Promise
//     return fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`, // 在请求头中包含 API 密钥
//         },
//         body: JSON.stringify(data),
//     })
//     // .then(response => {
//     //     if (!response.ok) {
//     //         throw new Error(`HTTP error! status: ${response.status}`);
//     //     }
//     //     return response.json();
//     // })
//     // .then(data => {
//     //   console.log('Response Data:', data);
//     //     // 根据 API 的响应格式解析回复
//     //     if (data.choices && data.choices.length > 0) {
//     //         return data.choices[0].message.content.trim();
//     //     } else {
//     //         throw new Error('Invalid API response');
//     //     }
//     // })
//     .then(response => {
//         // 清空 botMessage 的内容
//         botMessage.textContent = '系统：';
//         // 调用函数，实现逐字显示效果
//         typeWriterEffect(botMessage, response, 50); // 50 是每个字符显示的间隔时间，单位毫秒
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         if (botMessage) {
//             botMessage.textContent = '系统：抱歉，处理您的请求时出现错误。';
//         } else {
//             // 如果 botMessage 未定义，可以创建一个新的消息元素来显示错误
//             const errorMessage = document.createElement('div');
//             errorMessage.className = 'bot-message';
//             errorMessage.textContent = '系统：抱歉，处理您的请求时出现错误。';
//             chatWindow.appendChild(errorMessage);
//         }
//     });
// }
// function typeWriterEffect(element, text, delay) {
//     let index = 0;
//     function addChar() {
//         if (index < text.length) {
//             element.textContent += text.charAt(index);
//             index++;
//             setTimeout(addChar, delay);
//             // 滚动到底部
//             chatWindow.scrollTop = chatWindow.scrollHeight;
//         }
//     }
//     addChar();
// }


//   // 使聊天图标可拖动
//   function makeElementDraggable(elem) {
//       let posX = 0, posY = 0, initialX = 0, initialY = 0;

//       elem.addEventListener('mousedown', dragMouseDown);

//       function dragMouseDown(e) {
//           e.preventDefault();

//           // 获取鼠标的初始位置
//           initialX = e.clientX;
//           initialY = e.clientY;

//           // 绑定事件
//           document.addEventListener('mousemove', elementDrag);
//           document.addEventListener('mouseup', closeDragElement);
//       }

//       function elementDrag(e) {
//           e.preventDefault();

//           // 计算鼠标移动的距离
//           posX = initialX - e.clientX;
//           posY = initialY - e.clientY;
//           initialX = e.clientX;
//           initialY = e.clientY;

//           // 计算元素的新位置
//           let newTop = elem.offsetTop - posY;
//           let newLeft = elem.offsetLeft - posX;

//           // 获取窗口的尺寸
//           const windowWidth = window.innerWidth;
//           const windowHeight = window.innerHeight;

//           // 获取元素的尺寸
//           const elemWidth = elem.offsetWidth;
//           const elemHeight = elem.offsetHeight;

//           // 限制元素在窗口内移动
//           if (newLeft < 0) newLeft = 0;
//           if (newTop < 0) newTop = 0;
//           if (newLeft + elemWidth > windowWidth) newLeft = windowWidth - elemWidth;
//           if (newTop + elemHeight > windowHeight) newTop = windowHeight - elemHeight;

//           // 设置元素的新位置
//           elem.style.top = newTop + "px";
//           elem.style.left = newLeft + "px";
//       }

//       function closeDragElement() {
//           // 停止移动时移除事件监听器
//           document.removeEventListener('mousemove', elementDrag);
//           document.removeEventListener('mouseup', closeDragElement);
//       }
//   }

//   // 调用函数使图标可拖动
//   makeElementDraggable(chatIcon);

// });