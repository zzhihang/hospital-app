<template>
    <div class="hospital-list">
        <van-sidebar v-model="activeKey">
            <van-sidebar-item
                    v-for="(item, index) in dataSource"
                    :title="item.hospitalName"
                    :key="index"
                    @click="onLeftItemClick(item)"
            />
        </van-sidebar>
        <div class="list">
            <ul>
                <li class="item van-hairline--bottom"
                    v-for="(item, index) in departmentList"
                    @click="onRightItemClick(item)"
                    :key="index"
                >
                    {{item.deptName}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

  export default {
    props: {
      dataSource: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        activeKey: '',
        hospitalId: '',
        departmentList: []
      }
    },
    methods: {
      onLeftItemClick(data) {
        this.departmentList = data.depts;
        this.hospitalId = data.hospitalId;
      },
      onRightItemClick(e) {
        const {deptId, deptName} = e;
        this.$router.push({name: 'entry_doctor', query: {deptId, deptName, hospitalId: this.hospitalId}})
      }
    },
    watch: {
      dataSource: {
        handler() {
          if (this.dataSource.length) {
            this.departmentList = this.dataSource[0].depts;
            this.hospitalId = this.dataSource[0].hospitalId
          } else {
            this.departmentList = []
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="less" scoped>
    .hospital-list {
        display: flex;
    }

    .list {
        flex: 1;
        @white-bg();
        border-left: 1px solid #ebedf0;

        .item {
            line-height: 45px;
            font-size: 16px;
            padding-left: 12px;
        }
    }

    .van-sidebar {
        width: 50%;

        .van-sidebar-item {
            padding: 12px 15px;
            border-bottom: 1px solid #e7e7ee;
        }
    }
</style>
