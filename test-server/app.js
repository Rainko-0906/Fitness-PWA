const express = require('express');
const app = express();
const port = 5000;

// 静态文件服务
app.use(express.static('public'));

// 测试接口
app.get('/api/test', (req, res) => {
    res.json({ message: '服务器运行正常！', time: new Date().toISOString() });
});

// 启动服务器
app.listen(port, '127.0.0.1', () => {
    console.log(`服务器已启动: http://127.0.0.1:${port}`);
}); 