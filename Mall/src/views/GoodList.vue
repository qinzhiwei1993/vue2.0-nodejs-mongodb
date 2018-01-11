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
          <a href="javascript:void(0)" class="price" @click="sort">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilter">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" :class="{'filterby-show': filterBy}" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur': priceChecked == 'all'}" @click="priceChecked = 'all'">All</a></dd>
              <dd v-for="(price, index) in priceFilter">
                <a href="javascript:void(0)" :class="{'cur': priceChecked == index}" @click="setPriceFilter(index)">{{ price.startPrice }} - {{ price.endPrice }}</a>
              </dd>
            </dl>
          </div>
          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="goods in goodslist_filter">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/' + goods.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{ goods.productName }}</div>
                    <div class="price" style="width: 100%;">{{ goods.salePrice }}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(goods._id)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="view-more-normal"
                 v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="20">
              <img src="./../assets/loading-spinning-bubbles.svg" v-if="!allFound">
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
              },
              {
                startPrice: '1000.00',
                endPrice: '以上'
              }
            ],
            priceChecked: 'all',
            filterBy: false,
            overLay: false,
            pageNum: 1,
            sortFlag: 1,
            busy: true,
            allFound: false
          }
      },
      components: {
          NavHeader,
          NavFooter,
          NavBread
      },
      computed:{//计算属性，可以用于过滤数据
        goodslist_filter: function(){
          return this.goodslist.filter((value) => {
            if(this.priceChecked == "all"){
              return true;
            }else if(this.priceChecked == 0){
              return value.salePrice > 0 && value.salePrice <= 200;
            }else if(this.priceChecked == 1){
              return value.salePrice > 200 && value.salePrice <= 500;
            }else if(this.priceChecked == 2){
              return value.salePrice > 500 && value.salePrice <= 1000;
            }else if(this.priceChecked == 3){
              return value.salePrice > 1000;
            }
          });
        }
      },
      mounted: function(){
          this.getGoodsList();
      },
      methods: {
          getGoodsList(flag){
              var params = {
                  pageNum: this.pageNum,
                  sort: this.sortFlag
              }
              axios({
                url: '/goods/list',
                method: 'GET',
                params: params
              }).then(res => {
                  if(flag){
                      this.goodslist.push(...res.data.data);
                      if(this.goodslist.length < res.data.total){
                        this.busy = false;
                      }else{
                          this.allFound = true;
                      }
                  }else{
                    this.goodslist = res.data.data;
                    this.busy = false;
                  }
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
          },
          sort(){
              this.pageNum = 1;
              this.allFound = false;
              this.sortFlag = this.sortFlag == 1 ? -1 : 1;
              this.getGoodsList();
          },
          loadMore(){
              this.pageNum++;
              this.busy = true;
              this.getGoodsList(true);
          },
          addCart(goodsId){
            var params = {
              accountId: 'qinzhiwei', //qinzhiwei
              goodsId: goodsId
            }
            axios({
              url: '/carts/add',
              method: 'GET',
              params: params
            }).then((res) => {
              if(res.data.status == 200 & res.data.msg == '保存成功'){
                alert('添加购物车成功');
              }
            }).catch(err => {
              console.log(err);
            })
          }
      }
  }
</script>


