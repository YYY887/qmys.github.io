document.addEventListener('DOMContentLoaded', function () {
    const res = document.getElementById('res');
    const resbtn = document.getElementById('resbtn');
    const logbtn = document.getElementById('logbtn');
    const log = document.getElementById('log');
    const toast = document.getElementById('toast');
    const historyDiv = document.getElementById('history');
    const backToLogin = document.getElementById('backToLogin');
    const historyList = document.getElementById('historyList');

    // 显示 toast 消息的函数
    function showToast(message) {
        toast.innerHTML = message;
        toast.className = "show";
        setTimeout(function () {
            toast.className = toast.className.replace("show", "");
        }, 3000);
    }

    // 点击事件切换页面
    resbtn.addEventListener('click', function () {
        log.style.display = 'none';
        res.style.display = 'block';
    });

    logbtn.addEventListener('click', function () {
        log.style.display = "block";
        res.style.display = "none";
    });

    // 返回登录界面
    backToLogin.addEventListener('click', function () {
        historyDiv.style.display = 'none';
        log.style.display = 'block';
    });

    // 注册表单提交事件
    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        // 简单的格式验证
        if (username.length < 3) {
            showToast('用户名长度至少为 3 个字符。');
            return;
        }
        if (password.length < 6) {
            showToast('密码长度至少为 6 个字符。');
            return;
        }

        // 检查用户是否已存在
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[username]) {
            showToast('用户名已存在，请选择其他用户名');
        } else {
            // 保存用户信息到本地存储
            users[username] = password;
            localStorage.setItem('users', JSON.stringify(users));
            showToast('注册成功，请登录。' + '您的账号为:' + username + '您的密码为:' + password);

            // 清空注册表单
            document.getElementById('regUsername').value = '';
            document.getElementById('regPassword').value = '';
        }
    });

    // 登录表单提交事件
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // 检查是否是管理员登录
        if (username === 'admin' && password === 'admin') {
            log.style.display = 'none';
            historyDiv.style.display = 'block';
            showHistoryAccounts();
        } else {
            // 普通用户登录验证
            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] === password) {
                showToast('登录成功！');
            } else {
                showToast('用户名或密码错误，请重试。');
            }
        }
        // 清空登录表单
        document.getElementById('loginUsername').value = '';
        document.getElementById('loginPassword').value = '';
    });

    // 显示历史注册账户信息
    function showHistoryAccounts() {
        historyList.innerHTML = '';
        const users = JSON.parse(localStorage.getItem('users')) || {};
        for (const username in users) {
            const listItem = document.createElement('li');
            listItem.textContent = `账号：${username}，密码：${users[username]}`;

            // 添加修改按钮
            const editButton = document.createElement('button');
            editButton.textContent = '修改';
            editButton.addEventListener('click', function () {
                const newPassword = prompt('请输入新密码', users[username]);
                if (newPassword !== null) {
                    users[username] = newPassword;
                    localStorage.setItem('users', JSON.stringify(users));
                    showHistoryAccounts();
                    showToast('密码修改成功');
                }
            });
            listItem.appendChild(editButton);

            // 添加删除按钮
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '删除';
            deleteButton.addEventListener('click', function () {
                if (confirm(`确定要删除用户 ${username} 吗？`)) {
                    delete users[username];
                    localStorage.setItem('users', JSON.stringify(users));
                    showHistoryAccounts();
                    showToast('用户删除成功');
                }
            });
            listItem.appendChild(deleteButton);

            historyList.appendChild(listItem);
        }
    }
});

       // jQuery-Ajax
       function fetchData() {
        const test = document.getElementById('yiyan');
        // 检查元素是否正确获取
        if (!test) {
            console.error('未找到 id 为 test 的元素');
            return; // 现在 return 语句在函数内部，是合法的
        }

        // jQuery-Ajax
        $.ajax({
            url: 'https://api.yaohud.cn/api/randtext/get',
            data: {
                key: 'uE87SWWwMw6agk3JXrp',
            },
            type: 'GET',
            dataType: 'json',
            success: function (response) {
                console.log(response);
                if (response && typeof response.data === 'string') {
                    test.innerHTML = response.data;
                } else {
                    console.log('响应中没有预期的 data 字段或 data 不是字符串类型');
                }
            },
            timeout: 3000,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(`请求失败: ${textStatus}, ${errorThrown}`);
                console.log(jqXHR);
            }
        });
    }

    // 调用函数
    fetchData();