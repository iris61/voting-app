module.exports = function(app){
    var request = require('request');
    var config = require('./config/config');
    app.get('/mygithub', function(req, res) {
        //重定向到认证接口,并配置参数
        //注意这里使用的是node的https模块发起的请求
        var dataStr = (new Date()).valueOf();
        var path = "https://github.com/login/oauth/authorize";
        path += '?client_id=' + config.client_id;
        path += '&scope=' + config.scope;
        path += '&state=' + dataStr;
        //转发到授权服务器
        res.redirect(path);
    })
    .get('/auth/github/callback',function(req, res) {
            const code = req.query.code;
            var path2 = 'https://github.com/login/oauth/access_token';
            const params = {
                client_id: config.client_id,
                client_secret: config.client_secret,
                code: code
            }
            console.log(code);
            request({
                url: path2,
                form: params},
            function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    var urlStr = 'https://api.github.com/user?' + body;
                    request({
                        url: urlStr,
                        headers: {
                            'User-Agent': 'iris_ying'
                        }
                    },
                    function(error, response, resbody){
                        if (!error) {
                            res.end(JSON.stringify({
                                msg: '获取成功',
                                status: 100,
                                data: JSON.parse(resbody)
                                
                            }));
                        }else{
                            res.end(JSON.stringify({
                                msg: '获取用户信息失败',
                                status: 102
                            }));
                        }
                    })
                }
            }); 
    
            
        })
}
