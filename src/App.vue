<template>
  <div id="app">
    <div class="logo">
      <img src="http://img.qdtech.ai/upload/decision/a6/1b/a61b41b73dadc975f348d5093f64da58.jpg" alt="">
    </div>
    <div class="prouct-img">
      <img src="http://img.qdtech.ai/upload/decision/d1/62/d16254f6188b38777d4995820e075ebb.jpg" alt="">
    </div>
    
    <div class="intro">
      <div class="word">
        <p>Introducing Ice Cream for any #mood.</p>
        <p>Enjoy our playfully delicious ice cream sticks, available online only!</p>
      </div>
    </div>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="img in swiperImg" :key="img.id">
              <img :src="img.img" alt="">
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
      <div class="price-intro"><strong>#mood Ice Cream Bars, 3 Count</strong></div>
      <div class="price"><b>$ 4.60</b></div>
      <div class="product-btn" @click="showModal=true"></div>
    </div>
    <div class="modal" :class="{ 'show-modal': showModal}">
			<div class="modal-wrap">
        <i class="close-btn" @click="showModal=false"></i>
        <div class="title">
          <img src="http://img.qdtech.ai/upload/decision/f3/c4/f3c4f2203779e58612b3b6c4bdfa2eea.jpg" alt="">
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
  export default {
    name: 'app',
    data: function() {
      return {
        showModal: false,
        swiperImg: [
          {
            id: 1,
            img: 'http://img.qdtech.ai/upload/decision/a8/12/a812d221d394d46d2e9f482c14f392ce.jpg'
          },
          {
            id: 2,
            img: 'http://img.qdtech.ai/upload/decision/d0/3b/d03b79970c422c2b4adaa39a9f717842.jpg'
          },
          {
            id: 3,
            img: 'http://img.qdtech.ai/upload/decision/a9/7d/a97db30185d75f754a438d1cc46a0a09.jpg'
          }
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
        ]
      }
    },
    methods: {
      addImgFalse: function addImgFalse() {
        var imgs = document.querySelectorAll('img');
        imgs.forEach(function (img) {
          img.setAttribute('onclick', false);
        });
      }
    },
    mounted: function () {
      this.$nextTick(function () {
      var mySwiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          autoplay: 3000,
           parallax : true,
          loop: true
        });
      });
      this.addImgFalse()
    },
    components: {
    }
  }
</script>
<style lang="less">
  .swiper-container {
    height: 264px;
    .swiper-slide {
      background-color: red;
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
