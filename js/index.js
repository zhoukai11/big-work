window.addEventListener('load', function() {
    //获取元素
    var txt1 = document.querySelector('#txt1');
    var txt2 = document.querySelector('#txt2');
    var change = document.querySelector('.change');
    var copy = document.querySelector('.copy');
    var no = document.querySelector('.no');
    var clear = document.querySelector('.clear');
    //设置正则表达式
    var ChineseReg = /[0-9A-z]+/;
    //绑定事件
    txt1.addEventListener('focus', function() {
        if (this.value === "输入需要转换的简体字(中文)")
            this.value = '';
    });

    txt1.addEventListener('keyup', function() {
        Fan();

    });

    txt1.addEventListener('blur', function() {
        var ChineseValue = this.value;
        // console.log(this.value);
        if (this.value === '') {
            this.value = "输入需要转换的简体字(中文)";
        } else if (ChineseReg.test(ChineseValue)) {
            alert('请输入中文！！！');
            this.value = "输入需要转换的简体字(中文)";
            txt2.value = '';
        }
    });

    change.addEventListener('click', function() {
        Fan();
    });

    no.addEventListener('click', function() {
        // console.log(txt1.value);
        Jian();
    });

    copy.addEventListener('click', function() {
        txt2.select(); //选择对象 
        document.execCommand('copy'); //执行浏览器复制命令
    })

    clear.addEventListener('click', function() {
        txt1.value = '';
        txt2.value = '';
    });

    //AJAX
    //繁体字
    function Fan() {
        let text = txt1.value;
        //1.创建对象
        var fan = new XMLHttpRequest();
        //设置响应体数据的类型
        fan.responseType = 'json';
        //2.初始化 设置请求方法和url
        fan.open('GET', 'http://api.tianapi.com/txapi/charconvert/index?key=8574418027e880ab28ce783c27f538d1&text=' + text);
        //3.发送
        fan.send();
        // 4.事件绑定 处理服务端返回的结果
        fan.onreadystatechange = function() {
            if (fan.readyState === 4) {
                if (fan.status >= 200 && fan.status < 300) {
                    // console.log(fan.response.newslist[0].outtext);
                    txt2.value = fan.response.newslist[0].outtext;
                }
            }
        }
    }

    //简体字
    function Jian() {
        let text = txt1.value;
        //1.创建对象
        var jian = new XMLHttpRequest();
        //设置响应体数据的类型
        jian.responseType = 'json';
        //2.初始化 设置请求方法和url
        jian.open('GET', 'http://api.tianapi.com/txapi/charconvert/index?key=8574418027e880ab28ce783c27f538d1&text=' + text);
        //3.发送
        jian.send();
        // 4.事件绑定 处理服务端返回的结果
        jian.onreadystatechange = function() {
            if (jian.readyState === 4) {
                if (jian.status >= 200 && jian.status < 300) {
                    txt2.value = jian.response.newslist[0].intext;
                }
            }
        }
    }

});