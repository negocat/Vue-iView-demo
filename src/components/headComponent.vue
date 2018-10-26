<template>
  <div>
    <Menu :active-name="activeName" theme="dark" width="auto" :open-names="['1']">
      <div class="layout-logo-left">
        <h2 style="color:white;"></h2>
      </div>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          目录1
        </template>
        <MenuItem name="1-1"><div >子目录</div></MenuItem>
        <MenuItem name="1-2"><div >子目录</div></MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          目录2
        </template>
        <MenuItem name="2-1"><div >子目录</div></MenuItem>
        <MenuItem name="2-2"><div >子目录</div></MenuItem>
      </Submenu>
    </Menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: '1-1'
    }
  }
}
</script>
