<template>
  <div id="app" class="layout" style="padding: 0;margin: 0;">
    <Row type="flex">
      <Col span="5" class="layout-menu-left" style="height: 100%;overflow: auto;position: fixed;">
        <HeadComponent></HeadComponent>
      </Col>
      <Col span="19">
        <Col span="19" style="height: 100%;position: fixed;left: 21%;overflow: auto;">
          <div style="height: 70px;">&nbsp;</div>
          <router-view/>
        </Col>
        <div class="layout-copy" style="bottom: 0;position: fixed;width: 100%;">
          2017-2018 &copy; 
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import HeadComponent from './components/headComponent.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'haha'
    }
  },
  mounted () {
    this.msg = window.localStorage.getItem('username')
  },
  components: {
    HeadComponent
  }
}
</script>

<style>

  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    margin-top:-60px;
  }
  .layout-breadcrumb{
    padding: 10px 15px 0;
    text-align:left;
  }
  .layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
  .layout-content-main{
    padding: 10px;
  }
  .layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
  }
  .layout-menu-left{
    background: #464c5b;
  }
  .layout-header{
    height: 60px;
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  Button{
    color:white;
  }
</style>
