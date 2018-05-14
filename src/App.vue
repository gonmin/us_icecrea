<template>
  <div id="app">
    <div class="logo">
      <img onclick="return false" src="http://img.qdtech.ai/upload/decision/a6/1b/a61b41b73dadc975f348d5093f64da58.jpg" alt="">
    </div>
    <div class="prouct-img">
      <img onclick="return false" :src="headingImg" alt="">
    </div>
    
    <div class="intro">
      <div class="word">
        <p>{{introWord[0]}}</p>
        <p>{{introWord[1]}}</p>
      </div>
    </div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="img in swiperImg" :key="img.imgId">
              <img onclick="return false" :src="img.img" alt="">
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="product-box">
      <div class="feature" v-for="feature in features" :key="feature.featureId">
        <strong>{{feature.text1}}</strong>
        <span>{{feature.text2}}</span>
      </div>
      <div class="feature-sumary"><strong>Delivered frozen to your door with dry ice.</strong></div>
      <div class="price-intro"><strong>{{productInfo.product_name}}</strong></div>
      <div class="price"><b>{{productInfo.product_price}}</b></div>
      <div class="product-btn" ref="productBtn" @click="productClick"></div>
    </div>

    <div class="modal" :class="{ 'show-modal': showModal}">
			<div class="modal-wrap">
        <i class="close-btn" @click="showModal=false"></i>
        <div class="title">
          <img onclick="return false" src="http://img.qdtech.ai/upload/decision/f3/c4/f3c4f2203779e58612b3b6c4bdfa2eea.jpg" alt="">
        </div>
        <div class="content">
          <h3>Sorry</h3>
          <p>Oops. We don’t have product available at this time. Please check in again in later in the summer.</p>
        </div>
      </div>
		</div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  import axios from 'axios'
  import productData from './data.json'
  import imgData from './img.json'
  import {getUrlParam, getScrollTop, getWindowHeight, getScrollHeight} from './utils/util'

  export default {
    name: 'app',
    data: function() {
      return {
        showModal: false,
        swiperImg: [
        ],
        features: [
          {
            text1: '#Feisty:',
            featureId: 1,
            text2: 'chocolate ice cream with a little cinnamon & cayenne, wrapped in chocolate sprinkles.'
          },
          {
            text1: '#Lazy-ish:',
            featureId: 2,
            text2: 'peanut butter ice cream wrapped with chocolate sprinkles.'
          },
          {
            text1: '#Blessed:',
            featureId: 3,
            text2: 'milk chocolate wrapped with vanilla ice cream, white chocolate, and cookie crumbles.'
          }
        ],
        introWord: [],
        productData: {},
        productInfo: {},
        mySwiper: null,
        headingImg: '',
        landPageId: 1,
        kz_user_id: '',
        scrollToBottom: false
      }
    },
    methods: {
      addImgFalse: function addImgFalse() {
        var imgs = document.querySelectorAll('img');
        imgs.forEach(function (img) {
          img.setAttribute('onclick', 'return false;');
        });
      },
      initSwiper: function () {
        // this.mySwiper = new Swiper('.swiper-container', {
        //   pagination: '.swiper-pagination',
        //   autoplay: 3000,
        //   loop: true
        // });
      },
      setlandpageWord: function (landPageId) {
        landPageId = parseInt(landPageId);
        if (landPageId > 11) {
          landPageId = 11;
        }
        if (landPageId <= 8) {
          this.introWord = this.productData.firstWord[0];
          this.features = this.productData.secondWord[0];
        } else {
          this.introWord = this.productData.firstWord[1];
          this.features = this.productData.secondWord[1];
        }
        this.productInfo = this.productData.products[landPageId - 1];
      },
      handImg: function (imgData, landPageId) {
        landPageId = parseInt(landPageId);
        imgData.forEach(function(item) {
          item.productImgs2 = []
          item.productImgs.forEach(function(item2, index2){
            item.productImgs2.push({
              img: item2,
              imgId: index2 + 1
            })
          })
        })
        var imgIndex;
        if (landPageId <= 4) {
          imgIndex = 0
        } else if (landPageId === 5 || landPageId === 6){
          imgIndex = 1
        } else if (landPageId === 7 || landPageId === 8){
          imgIndex = 2
        } else if (landPageId === 9){
          imgIndex = 3
        } else if (landPageId === 10){
          imgIndex = 4
        } else if (landPageId === 11){
          imgIndex = 5
        }
        this.$nextTick(function() {
          this.swiperImg = imgData[imgIndex].productImgs2
          this.headingImg = imgData[imgIndex].headImg
        })
      },
      commonApi: function (params, fn, fnErr) {
        var hostname = this.getHostName();
        axios.get(hostname, {
            params: params
          })
          .then(function (response) {
            typeof fn === 'function' && fn(response.data)
          })
          .catch(function (error) {
            typeof fnErr === 'function' && fnErr(error)
          });
      },
      getHostName: function () {
        // var isDev = !location.hostname || /^dev|test|\d{1,3}|localhost|file/.test(window.location.hostname);
        // var hostname = isDev ? 'http://dev.s.qdtech.ai/project/php_pcp/index.php'
        // : 'http://s.qdtech.ai/project/php_pcp/index.php';
        // return hostname;
        var host = location.hostname === 's.qdtech.ai' ? location.host : 'dev.s.qdtech.ai';
        console.log('location.host', location.hostname, 'host', host)
        return 'http://' + host + '/project/php_pcp/index.php'
      },
      callVisit: function (landPageIdNum) {
        var that = this;
        var params = {
          mod: 'us_ice_cream',
          act: 'visit',
          kz_user_id: this.kz_user_id,
          land_page_id: landPageIdNum
        }
        this.commonApi(params, function(data) {
          that.updateIndex = data.pcp_browse_time
          that.updateTime();
        })
      },
      updateTime: function () {
        var that = this;
        this.updateTimeTimer = setInterval(function() {
          if (that.updateIndex >= 85) {
            clearInterval(that.updateTimeTimer)
            return;
          }
          that.updateIndex += 1;
          console.log(that.updateIndex)
          that.updateTimeApi();
        }, 1000)
      },
      updateTimeApi: function () {
          var params = {
            mod: 'us_ice_cream',
            act: 'browseTimeUpdate',
            kz_user_id: this.kz_user_id
          }
          this.commonApi(params, function() {

          })
      },
      watchScroll: function () {
        console.log('watchScroll')
        var that = this;
        if (this.scrollToBottom) {
          return;
        }
        window.addEventListener('scroll', function(e) {
          console.log(getScrollTop() + getWindowHeight(), getScrollHeight(), '1位置')
      //     if((getScrollTop() + getWindowHeight() + 14) > getScrollHeight()){
      //       if (that.scrollToBottom) {
      //         return;
      //       }
      //       that.scrollToBottom = true;
      //       that.scrollBottomApi()
      // 　　}
          if(getScrollTop() + getWindowHeight() > that.$refs.productBtn.offsetTop + 40){
            if (that.scrollToBottom) {
              return;
            }
            that.scrollToBottom = true
            that.scrollBottomApi()
      　　}
        })
      },
      scrollBottomApi: function () {
        var that = this;
        var params = {
          mod: 'us_ice_cream',
          act: 'fullscreen',
          kz_user_id: this.kz_user_id
        }
        this.commonApi(params, function (response) {
          console.log('这里是调用了scrollApi', response)
          that.scrollToBottom = true;
        }, function () {
          that.scrollToBottom = false;
        })
      },
      productClick: function () {
        var that = this;
        this.showModal = true;
        var params = {
          mod: 'us_ice_cream',
          act: 'productClick',
          kz_user_id: this.kz_user_id
        }
        this.commonApi(params, function (data) {
          console.log('点击商品成功');
        }, function () {
          console.log('点击商品失败');
        })
      }
    },
    mounted: function () {
      var landPageId = getUrlParam('land_page_id') || '1';
      this.kz_user_id = getUrlParam('kz_user_id') || 'oul6yhyythc4ggw' || 'oul75uuqh008so8';
      // this.kz_user_id = getUrlParam('kz_user_id');
      console.log(getUrlParam('kz_user_id'), 'hhhggggg')
      this.productData = productData;
      this.handImg(imgData, landPageId)
      this.setlandpageWord(landPageId);
      var landPageIdNum = parseInt(landPageId);
      this.landPageId = parseInt(landPageId);
      // this.addImgFalse();
        this.watchScroll();
        console.log('九点啦')
      // 进入页面就访问
      this.callVisit(landPageIdNum)
      this.$nextTick(function () {
        
      });
    },
    watch: {
      swiperImg: function () {
        var that = this;
        that.$nextTick(function () {
          this.mySwiper = null;
          this.mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          autoplay: 3000,
          autoplayDisableOnInteraction: false,
          loop: true
        });
        })
      },
      showModal: function (newValue) {
        if (newValue) {
          var that = this;
          var params = {
            mod: 'us_ice_cream',
            act: 'viewSorryPage',
            kz_user_id: this.kz_user_id
          }
          this.commonApi(params, function (data) {
            console.log('打开窗口成功');
          }, function () {
            console.log('打开窗口');
          })
        }
      }
    },
    created: function () {
        
    }
  }
</script>
<style lang="less">
  .swiper-container {
    height: 264px;
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  body {
    line-height: 24px;
    font-size: 15px;
    .logo {
      height: 106px;
      img {
        display: block;
        height: 100%;
        margin: 0 auto;
      }
    }
    .intro {
      height: 130px;
      padding-left: 22px;
      padding-top: 38px;
      .word {
        line-height: 24px;
        font-size: 15px;
        color: #000000;
      }
    }
    .prouct-img {
      height: 363px;
      img {
        height: 100%;
        width: 100%;
      }
    }
    .product-box {
      padding: 26px 20px 75px;
      color: #000;
      .feature {

      }
      .price-intro {
        padding-top: 40px;
        text-align: center;
      }
      .price {
        padding: 10px 0 16px;
        text-align: center;
        font-size: 30px;
      }
      .product-btn {
        margin: 0 auto;
        width: 245px;
        height: 40px;
        background: url('http://img.qdtech.ai/upload/decision/e3/16/e31665441981304060d8d7a41ac96dc5.png') no-repeat;
        background-size: 245px 40px;
      }
    }
  }
  
/*弹窗*/
.modal {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 9;
	background-color: rgba(76, 76, 76, 0.9);
}
.show-modal.modal {
	display: block;
}
.modal-wrap {
  position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
  margin: auto;
  width: calc(100% - 52px);
  
	height: 250px;
  background-color: #fff;
  border-radius: 4px;
  .title {
    height: 47px;
    border-bottom: 2px solid #999;
    img {
      margin: 0 auto;
      height: 100%;
    }
  }
  .close-btn {
    position: absolute;
    margin: auto;
    top: -12px;
    right: -12px;
    width: 30px;
    height: 30px;
    background: url(http://img.qdtech.ai/upload/decision/41/7b/417be4f4797e09bc64e23f2a564d2824.png) no-repeat;
    background-size: 30px 30px;
  }
  .content {
    padding: 0 26px;
    color: #08266e;
    line-height: 30px;
    text-align: center;
    h3 {
      padding-top: 24px;
      padding-bottom: 20px;
      font-size: 30px;
    }
    p {
      font-size: 15px;
    }
  }
}
.modal-content {
  position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: calc(100% - 52px);
	height: 250px;
}
.modal-img {
	width: 100%;
	height: 100%;
}

</style>
