<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>product</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" v-bind:class="{'filterby-show': filterBy}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == 'all'}" @click="priceChecked = 'all'">All</a></dd>
              <dd v-for="(price, index) in priceFilter">
                <a href="javascript:void(0)" v-bind:class="{'cur': priceChecked == index}" @click="setPriceFilter(index)">{{ price.startPrice }} - {{ price.endPrice }}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="goods in goodslist">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + goods.productImg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{ goods.productName }}</div>
                    <div class="price" style="width: 100%;">{{ goods.productPrice }}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" >加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
              <img src="./../assets/loading-spinning-bubbles.svg" v-if="false">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLay" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<script>
  import axios from "axios";
  import '@/assets/css/base.css'
  import '@/assets/css/checkout.css'
  import '@/assets/css/product.css'

  import NavHeader from "@/components/NavHeader";
  import NavFooter from "@/components/NavFooter";
  import NavBread from "@/components/NavBread";

  export default{
      data(){
          return {
            goodslist: [],
            priceFilter: [
              {
                  startPrice: '0.00',
                  endPrice: '200.00'
              },
              {
                startPrice: '200.00',
                endPrice: '500.00'
              },
              {
                startPrice: '500.00',
                endPrice: '1000.00'
              }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLay: false
          }
      },
      components: {
          NavHeader,
          NavFooter,
          NavBread
      },
      mounted: function(){
          this.getGoodsList();
      },
      methods: {
          getGoodsList(){
              axios({
                url: 'http://127.0.0.1:3000/goods',
                method: 'GET'
              }).then(res=>{
                  console.log(res);
                  this.goodslist = res.data.result;
              }).catch(err => {
                  console.log(err);
              })
          },
          setPriceFilter(index){
              this.priceChecked = index;
              this.closePop();
          },
          showFilter(){
              this.filterBy = true;
              this.overLay = true;
          },
        closePop(){
              this.filterBy = false;
              this.overLay = false;
        }
      }
  }
</script>


