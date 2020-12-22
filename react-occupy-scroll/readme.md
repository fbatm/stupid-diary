# an infinity scroller
用于大量数据的加载，参考react-window制作。  
由于react-window使用绝对定位，不适合table标签，而项目中的表格使用material-ui的Table绘制，继而考虑采用空标签占位的方式来控制滚动元素的高度。