document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links li a');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const dropdownContents = document.querySelectorAll('.dropdown-content');
    const mainContent = document.querySelector('.main-content');

    // 导航菜单相关代码（保持不变）
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // 获取对应的下拉内容
            const menuName = link.getAttribute('data-menu');
            const targetContent = document.querySelector(`.dropdown-content[data-menu="${menuName}"]`);

            if (targetContent) {
                // 添加变暗效果
                navLinks.forEach(otherLink => {
                    if (otherLink !== link) {
                        otherLink.classList.add('dimmed');
                    } else {
                        otherLink.classList.remove('dimmed');
                    }
                });

                // 显示下拉菜单
                dropdownMenu.classList.add('show');

                // 隐藏所有下拉内容
                dropdownContents.forEach(content => {
                    content.style.display = 'none';
                });

                // 显示对应的下拉内容
                targetContent.style.display = 'block';

                // 添加模糊效果
                mainContent.classList.add('blurred');
            }
        });

        link.addEventListener('mouseleave', () => {
            // 鼠标离开导航链接时，检查鼠标是否进入下拉菜单
            setTimeout(() => {
                if (!dropdownMenu.matches(':hover') && !link.matches(':hover')) {
                    hideDropdown();
                }
            }, 100);

            // 移除变暗效果
            navLinks.forEach(otherLink => {
                otherLink.classList.remove('dimmed');
            });
        });
    });

    // 当鼠标离开下拉菜单时，隐藏下拉菜单并移除变暗效果
    dropdownMenu.addEventListener('mouseleave', () => {
        hideDropdown();
    });

    function hideDropdown() {
        dropdownMenu.classList.remove('show');
        mainContent.classList.remove('blurred');

        // 移除所有导航链接的变暗效果
        navLinks.forEach(link => {
            link.classList.remove('dimmed');
        });
    }

 

// 获取聊天图标元素


// 点击图标时跳转到新的网页


   // 获取元素
   const chatIcon = document.getElementById('chat-icon');
   const chatDialog = document.getElementById('chat-dialog');
   const closeBtn = document.querySelector('.close-btn');
   const sendBtn = document.getElementById('send-btn');
   const userInput = document.getElementById('user-input');
   const chatWindow = document.getElementById('chat-window');

   chatIcon.addEventListener('click', () => {
    console.log('Chat icon clicked');
    window.location.href = "../a网页主页/chat.html"; // 替换为你要跳转的页面URL
});
    // 点击图标，显示对话框
    chatIcon.addEventListener('click', () => {
        chatDialog.style.display = 'block';
    });

    // 点击关闭按钮，隐藏对话框
    closeBtn.addEventListener('click', () => {
        chatDialog.style.display = 'none';
    });
    // 监听 Enter 键的按下事件
userInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        sendBtn.click(); // 触发发送按钮的点击事件
    }
});
    // 点击发送按钮，处理用户输入
    sendBtn.addEventListener('click', () => {
        const userText = userInput.value.trim();
        let botMessage; // 在函数顶部声明 botMessage
        if (userText) {
            // 显示用户输入
            const userMessage = document.createElement('div');
            userMessage.className = 'user-message';
            userMessage.textContent = '用户：' + userText;
            chatWindow.appendChild(userMessage);

            // 清空输入框
            userInput.value = '';

            // 滚动到底部
            chatWindow.scrollTop = chatWindow.scrollHeight;
            // 显示系统正在处理的消息
            botMessage = document.createElement('div');
            botMessage.className = 'bot-message';
            botMessage.textContent = '您的专属Pulse诊断助手：正在分析您的脉搏数据，请稍候...';
            chatWindow.appendChild(botMessage);                           
            // 调用语言模型 API
            callLanguageModelAPI(userText)
                .then(responseText => {
                    // 清空 botMessage 的内容，只保留 '系统：'
                    botMessage.textContent = '您的专属Pulse诊断助手：';
                    // 调用逐字显示函数
                    typeWriterEffect(botMessage, responseText, 50); // 每个字符显示间隔50毫秒
                })
                .catch(error => {
                    console.error('Error:', error);
                    if (botMessage) {
                        botMessage.textContent = '您的专属Pulse诊断助手：抱歉，处理您的请求时出现错误。';
                    } else {
                        // 如果 botMessage 未定义，可以创建一个新的消息元素来显示错误
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'bot-message';
                        errorMessage.textContent = '您的专属Pulse诊断助手：抱歉，处理您的请求时出现错误。';
                        chatWindow.appendChild(errorMessage);
      
                    }
                });
        }
    });

    function callLanguageModelAPI(userInput) {
        const apiKey = 'sk-dVSYtYhc50Q7GsGmzpJGH2ANjXFMNOhUKNlg8aa2V247lbsL'; // 请替换为您的实际 API 密钥
        const apiUrl = 'https://api.moonshot.cn/v1/chat/completions'; // 确认这是正确的 API 端点

        // 构造请求数据
        const data = {
            model: 'moonshot-v1-8k', // 或者您使用的其他模型
            messages: [
                { role: 'user', content: `用户的脉搏数据是：${userInput}\n请根据脉搏数据给出诊断意见。并且你的回答应该是引领用户回答的，而不是长篇回答，你需要回答简约` }
            ],
            max_tokens: 500,
            temperature: 0.7,
        };

        // 返回一个 Promise
        return fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`, // 在请求头中包含 API 密钥
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.error('Error Response:', errorData);
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
                });
            }
            return response.json();
        })
        .then(data => {
            // 根据 API 的响应格式解析回复
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            } else {
                throw new Error('Invalid API response');
            }
        })
        .catch(error => {
            console.error('Error calling the API:', error);
            throw error;
        });
    }

    // 打字机效果函数
    function typeWriterEffect(element, text, delay) {
        let index = 0;
        function addChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(addChar, delay);
                // 滚动到底部
                chatWindow.scrollTop = chatWindow.scrollHeight;
            }
        }
        addChar();
    }

    // 使聊天图标可拖动
    function makeElementDraggable(elem) {
        let posX = 0, posY = 0, initialX = 0, initialY = 0;

        elem.addEventListener('mousedown', dragMouseDown);

        function dragMouseDown(e) {
            e.preventDefault();

            // 获取鼠标的初始位置
            initialX = e.clientX;
            initialY = e.clientY;

            // 绑定事件
            document.addEventListener('mousemove', elementDrag);
            document.addEventListener('mouseup', closeDragElement);
        }

        function elementDrag(e) {
            e.preventDefault();

            // 计算鼠标移动的距离
            posX = initialX - e.clientX;
            posY = initialY - e.clientY;
            initialX = e.clientX;
            initialY = e.clientY;

            // 计算元素的新位置
            let newTop = elem.offsetTop - posY;
            let newLeft = elem.offsetLeft - posX;

            // 获取窗口的尺寸
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            // 获取元素的尺寸
            const elemWidth = elem.offsetWidth;
            const elemHeight = elem.offsetHeight;

            // 限制元素在窗口内移动
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft + elemWidth > windowWidth) newLeft = windowWidth - elemWidth;
            if (newTop + elemHeight > windowHeight) newTop = windowHeight - elemHeight;

            // 设置元素的新位置
            elem.style.top = newTop + "px";
            elem.style.left = newLeft + "px";
        }

        function closeDragElement() {
            // 停止移动时移除事件监听器
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('mouseup', closeDragElement);
        }
    }

    // 调用函数使图标可拖动
    makeElementDraggable(chatIcon);

        // 轮播图功能
        // (function() {
        //     const carousel = document.querySelector('.carousel');
        //     if (carousel) {
        //         const carouselSlides = carousel.querySelector('.carousel-slides');
        //         const slides = carouselSlides.querySelectorAll('.slide');
        //         const prevButton = carousel.querySelector('.prev-btn');
        //         const nextButton = carousel.querySelector('.next-btn');
        //         const indicators = carousel.querySelectorAll('.indicator'); // 获取所有指示器
        //         let currentIndex = 0;
        //         const totalItems = slides.length;
        
        //         // 自动轮播间隔（毫秒）
        //         const intervalTime = 5000;
        //         let carouselInterval;
        
        //         function showItem(index) {
        //             const offset = -index * 100; // 假设每个幻灯片宽度为100%
        //             carouselSlides.style.transform = `translateX(${offset}%)`;
        //             updateIndicators(index); // 更新指示器状态
        //         }
        
        //         function showNextItem() {
        //             currentIndex = (currentIndex + 1) % totalItems;
        //             showItem(currentIndex);
        //         }
        
        //         function showPrevItem() {
        //             currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        //             showItem(currentIndex);
        //         }
        
        //         // 更新指示器的活动状态
        //         function updateIndicators(index) {
        //             indicators.forEach((indicator, i) => {
        //                 if (i === index) {
        //                     indicator.classList.add('active');
        //                 } else {
        //                     indicator.classList.remove('active');
        //                 }
        //             });
        //         }
        
        //         // 为每个指示器添加点击事件
        //         indicators.forEach((indicator, i) => {
        //             indicator.addEventListener('click', () => {
        //                 currentIndex = i; // 更新当前索引
        //                 showItem(currentIndex);
        //                 resetInterval();
        //             });
        //         });
        
        //         // 添加事件监听器
        //         nextButton.addEventListener('click', () => {
        //             showNextItem();
        //             resetInterval();
        //         });
        
        //         prevButton.addEventListener('click', () => {
        //             showPrevItem();
        //             resetInterval();
        //         });
        
        //         // 自动轮播
        //         function startInterval() {
        //             carouselInterval = setInterval(showNextItem, intervalTime);
        //         }
        
        //         function resetInterval() {
        //             clearInterval(carouselInterval);
        //             startInterval();
        //         }
        
        //         // 初始化
        //         showItem(currentIndex);
        //         startInterval();
        //     }
        // })(); 
        //卡片滑动功能
        (function() {
            const carousel = document.querySelector('.carousel');
            if (carousel) {
                const carouselSlides = carousel.querySelector('.carousel-slides');
                const slides = carouselSlides.querySelectorAll('.slide');
                const prevButton = carousel.querySelector('.prev-btn');
                const nextButton = carousel.querySelector('.next-btn');
                const indicators = carousel.querySelectorAll('.indicator'); // 获取所有指示器
                let currentIndex = 0;
                const totalItems = slides.length;
        
                // 自动轮播间隔（毫秒）
                const intervalTime = 10000;
                let carouselInterval;
        
                function showItem(index) {
                    const offset = -index * 100; // 假设每个幻灯片宽度为100%
                    carouselSlides.style.transform = `translateX(${offset}%)`;
                    updateIndicators(index); // 更新指示器状态
                }
        
                function showNextItem() {
                    currentIndex = (currentIndex + 1) % totalItems;
                    showItem(currentIndex);
                }
        
                function showPrevItem() {
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                    showItem(currentIndex);
                }
        

                
                // 更新指示器的活动状态
                function updateIndicators(index) {
                    indicators.forEach((indicator, i) => {
                        if (i === index) {
                            indicator.classList.add('active');
                        } else {
                            indicator.classList.remove('active');
                        }
                    });
                }
        
                // 为每个指示器添加点击事件
                indicators.forEach((indicator, i) => {
                    indicator.addEventListener('click', () => {
                        currentIndex = i; // 更新当前索引
                        showItem(currentIndex);
                        resetInterval();
                    });
                });
        
                // 添加事件监听器
                nextButton.addEventListener('click', () => {
                    showNextItem();
                    resetInterval();
                });
        
                prevButton.addEventListener('click', () => {
                    showPrevItem();
                    resetInterval();
                });
        
                // 自动轮播
                function startInterval() {
                    carouselInterval = setInterval(showNextItem, intervalTime);
                }
        
                function resetInterval() {
                    clearInterval(carouselInterval);
                    startInterval();
                }
        
                // 监听视频播放事件，暂停和继续轮播
                const videos = carouselSlides.querySelectorAll('video');
        
                videos.forEach(video => {
                    video.addEventListener('play', () => {
                        // 暂停自动轮播
                        clearInterval(carouselInterval);
                    });
                    video.addEventListener('pause', () => {
                        // 如果视频暂停（但未结束），重新启动自动轮播
                        setTimeout(() => {
                            if (video.paused && !video.ended) {
                                startInterval();
                            }
                        }, 5000000); // 5秒后再尝试启动
                        
                    });
                    video.addEventListener('ended', () => {
                        // 视频播放结束后重新启动自动轮播
                        startInterval();
                    });
                });
        
                // 初始化
                showItem(currentIndex);
                startInterval();
            }
        })();
        
        function initCardSlider(cardSliderElement) {
        const cardItems = cardSliderElement.querySelectorAll('.card');
        const prevBtn = cardSliderElement.parentElement.querySelector('.card-prev-btn');
        const nextBtn = cardSliderElement.parentElement.querySelector('.card-next-btn');
        let currentIndex = 0;
        let cardsToShow = 3; // 根据你的布局调整显示的卡片数量

        // 计算卡片宽度
        function getCardWidth() {
            const cardWidth = cardItems[0].offsetWidth;
            const sliderStyle = window.getComputedStyle(cardSliderElement);
            const gap = parseFloat(sliderStyle.gap) || 0;
            return cardWidth + gap;
        }

        let cardWidth = getCardWidth();
        let maxIndex = Math.max(cardItems.length - cardsToShow, 0);

        // 更新滑块位置
        function updateSliderPosition() {
            const offset = -currentIndex * cardWidth;
            cardSliderElement.style.transform = `translateX(${offset}px)`;
        }

        // 更新按钮状态
        function updateButtons() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        // 为按钮绑定点击事件
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
                updateButtons();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSliderPosition();
                updateButtons();
            }
        });

        // 窗口大小变化时，重新计算卡片宽度
        window.addEventListener('resize', () => {
            cardWidth = getCardWidth();
            maxIndex = Math.max(cardItems.length - cardsToShow, 0);
            updateSliderPosition();
            updateButtons();
        });

        // 初始化按钮状态
        updateButtons();
    }

    // 遍历所有 .card-slider 并初始化滑块功能
    const allCardSliders = document.querySelectorAll('.card-slider');
    allCardSliders.forEach(slider => {
        initCardSlider(slider); // 为每个滑块区域调用初始化函数
    });


    
    const openDialogBtn = document.getElementById('open-dialog-btn');

// 添加点击事件监听器
openDialogBtn.addEventListener('click', () => {
    window.location.href = "../a网页主页/chat.html";
    chatDialog.style.display = 'block';  // 显示对话框
});

//电梯区域

    const elevator = document.getElementById('elevator');
    const elevatorItems = document.querySelectorAll('.elevator-item');
    const backToTopBtn = document.getElementById('back-to-top');

    // 设定滚动阈值
    // const scrollThreshold = 300; // 当scrollTop大于300时显示电梯
    // const backToTopThreshold = 500; // 当scrollTop大于500时显示回到顶部按钮

    // 监听scroll事件
    const bigcard=document.querySelectorAll('.bigcard-slider')
    const elev=document.querySelectorAll('.elevator-item')
    window.addEventListener('scroll', () => {

        const scrolltop=window.scrollY
        if(scrolltop>=bigcard[1].offsetTop+400&&scrolltop<bigcard[2].offsetTop)
        {   for(let i=0;i<elev.length;i++)
            elev[i].style.color='white'
            elev[1].style.color='yellow'}
            if(scrolltop>=bigcard[0].offsetTop&&scrolltop<bigcard[1].offsetTop-300)
                {   for(let i=0;i<elev.length;i++)
                    elev[i].style.color='white'
                    elev[0].style.color='yellow'}
                    if(scrolltop>=bigcard[2].offsetTop&&scrolltop<2500)
                        {   for(let i=0;i<elev.length;i++)
                            elev[i].style.color='white'
                            elev[2].style.color='yellow'}
        if (window.scrollY > 1000) {
            elevator.style.opacity = '1'; // 显示电梯
        } else {
            elevator.style.opacity = '0'; // 隐藏电梯
        }

        // 显示/隐藏回到顶部按钮
        if (window.scrollY > 2000) {
            backToTopBtn.style.display = 'block'; // 显示
        } else {
            backToTopBtn.style.display = 'none'; // 隐藏
        }
    });

    // 为电梯项添加点击事件
    
    
    
   
    elevatorItems.forEach(item => {
        item.addEventListener('click', () => {
            if (item.id === 'back-to-top') {
                // 回到顶部
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } 
            else if(item.getAttribute('data-scroll-to')==='section1')
            {
                window.scrollTo({top:bigcard[0].offsetTop-100, behavior:'smooth'})
            }
            else if(item.getAttribute('data-scroll-to')==='section2')
                {
                    window.scrollTo({top:bigcard[1].offsetTop, behavior:'smooth'})
                }
                else if(item.getAttribute('data-scroll-to')==='section3')
                    {
                        window.scrollTo({top:bigcard[2].offsetTop, behavior:'smooth'})
                    }
            // else {
            //     const targetSection = document.getElementById(item.getAttribute('data-scroll-to'));
            //     if (targetSection) {
            //         // 平滑滚动到目标区域
            //         targetSection.scrollIntoView({ behavior: 'smooth' });
            //     }
            // }
        });
    });



});


