<template>
  <div>
    <Breadcrumb style="margin-bottom: 40px;margin-left: 20px;">
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem >目录</BreadcrumbItem>
      <BreadcrumbItem>子目录</BreadcrumbItem>
    </Breadcrumb>
    <Table :columns="columns1" :data="data1"></Table>
    <Page :total="dataTotal" show-sizer :current="nowPage" :pageSize="pageSize" @on-change="changePage" />
  </div>
</template>
<script>
export default {
  data () {
    return {
      dataTotal: 100,
      nowPage: 2,
      pageSize: 20,
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        }
      ],
      data1: [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
    }
  },
  methods: {
    changePage (page) {
      console.log(page)
    }
  },
  components: {}
}
</script>
