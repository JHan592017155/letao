$(function(){
    //柱状图
    // 基于准备好的dom，初始化echarts实例
    var leftChart = echarts.init(document.querySelector('.echarts_left'));

    // 指定图表的配置项和数据
    var option1 = {
        //大标题
        title: {
            text: '2018年前端报名人数'
        },
        //提示框组件
        tooltip: {},
        //图例，用于解释说明的
        legend: {
            data:['人数','销量']
        },
        //x 轴
        xAxis: {
            data: ["1月","2月","3月","4月","5月","6月"]
        },
        //y轴的刻度是根据数据自动生成的
        yAxis: {},
        series: [{
            name: '人数',
      // type: 设置图表的类型   bar 柱状图  line 折线图 pie 饼图
            type: 'bar',
            data: [500, 202, 360, 1000, 800, 200]
        },{
            name: '销量',
            type: 'bar',
            data:[1500,1200,1300,800,500,400]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    leftChart.setOption(option1);



    
    // 基于准备好的dom，初始化echarts实例
    var rightChart = echarts.init(document.querySelector('.echarts_right'));

    // 指定图表的配置项和数据
    var option2 = {
        title : {
            text: '热门课程报名人数',
            subtext: '2018年6月',
            x:'center',
            //标题样式
            textStyle: {
            //颜色
            color: "red",
            //字体大小
            fontsize:25
            }
        },
        //提示框组件
        tooltip : {
            // 在饼图中, 鼠标滑到数据上时, 显示提示框            
            trigger: 'item',
             // 配置提示框文本
             // {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //图例
        legend: {
             // 控制图例的方向,  vertical垂直,  horizontal 水平的
            orient: 'vertical',
            left: 'left',
            data: ['php','java','产品经理','UI','web前端']
        },
        //系列
        series : [
            {
                name: '访问来源',
                type: 'pie',
                //配置圆的大小
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'php'},
                    {value:310, name:'java'},
                    {value:234, name:'产品经理'},
                    {value:135, name:'UI'},
                    {value:1548, name:'web前端'}
                ],
                //阴影效果
                itemStyle: {
                    emphasis: {
                        shadowBlur: 100,
                        shadowOffsetX: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

    // 使用刚指定的配置项和数据显示图表。
    rightChart.setOption(option2);




})