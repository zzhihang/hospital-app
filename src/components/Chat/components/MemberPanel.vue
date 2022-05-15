<template>
    <van-popup v-model="show"
               position="bottom"
               @close="onClose"
               closeable
               get-container="body"
               close-icon-position="top-left"
               :style="{ width: '100%', height: '100%' }"
    >
        <van-sticky>
            <div class="top-box">
                <h2>{{titleText}}</h2>
                <van-search v-model="value" placeholder="搜索姓名关键字"/>
            </div>
        </van-sticky>
        <div class="action-area">
            <div class="height10block"></div>
            <div class="setting-box">
                <div class="member-list">
                    <van-checkbox-group v-model="choose">
                        <van-checkbox class="member-item van-hairline--bottom"
                                      v-for="(item, index) in chooseList"
                                      :key="index"
                                      :name="item.userId"
                        >
                            <fans-card :avatar="item.headimgurl"
                                       :name="item.nickname"
                                       :phone="item.phone"/>
                        </van-checkbox>
                    </van-checkbox-group>
                </div>
            </div>
            <div class="button-box">
                <van-button type="primary" :disabled="!choose.length" @click="onButtonClick">{{buttonText}}</van-button>
            </div>
        </div>
    </van-popup>
</template>

<script>

  import FansCard from "@/components/fans/FansCard";
  import {doctorFansList} from "@/service/doctorFansService";
  import {doctorChatAddMember, doctorChatGroupCreate, doctorChatRemoveMember} from "@/service/doctorMessageService";

  export default {
    props: ['show', 'memberAction', 'memberList'], //minus or plus or 发起群聊
    components: {
      FansCard
    },
    data() {
      return {
        value: '',
        choose: [],
        titleMap: {
          plus: '添加成员',
          minus: '删除成员',
          launch: '发起群聊'
        },
        buttonMap: {
          plus: '添加',
          minus: '删除',
          launch: '添加'
        },
        chooseList: []
      }
    },
    created() {

    },
    watch: {
      memberAction: {
        handler(val) {
          if (this.memberAction === 'minus') {
            this.chooseList = this.memberList;
          } else {
            this.getFansList()
          }
        },
        immediate: true
      }
    },
    methods: {
      async getFansList() {
        const {data} = await doctorFansList();
        this.chooseList = data;
      },
      onClose(e) {
        this.choose = [];
        this.value = '';
        this.$emit('update:show', false)
      },
      async onButtonClick() {
        let result = {};
        if (this.memberAction === 'minus') {//移除群成员
          this.$confirm({message: '是否确定移除群成员？'}, async () => {
            result = doctorChatRemoveMember();
            if (result.success) {
              this.$emit('removeSuccess');
              this.$toast.success('操作成功');
            } else {
              this.$toast.fail(result.msg);
            }
          })
        } else if (this.memberAction === 'launch') {//发起群聊
          result = await doctorChatGroupCreate(this.choose);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$emit('launchSuccess');
            const {data} = await result;//创建群聊成功之后，直接进入群聊页面
            this.$router.push({name: 'doctorChat', query: {bookType: data.bookType, id: data.id, toImid: data.toImid}})
          } else {
            this.$toast.fail(result.msg);
          }
        } else {//添加群成员
          result = await doctorChatAddMember({groupId: this.$attrs.chatId, userIds: this.choose});
          if (result.success) {
            this.$emit('addSuccess');
            this.$toast.success('操作成功');
          } else {
            this.$toast.fail(result.msg);
          }
        }
      }
    },
    computed: {
      titleText() {
        return this.titleMap[this.memberAction]
      },
      buttonText() {
        return this.buttonMap[this.memberAction]
      }
    }
  }
</script>

<style lang="less" scoped>
    .action-area {
        padding-bottom: 50px;
    }

    .member-list {
        .member-item {
            padding-left: 15px;
        }
    }

    .button-box {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 8px 0;
        box-sizing: border-box;
        width: 100%;
        text-align: right;
        @white-bg();
        box-shadow: 0px -4px 10px 0px rgba(102, 102, 102, 0.06);

        .van-button {
            width: 76px;
            height: 33px;
            margin-right: 15px;
        }
    }

    .top-box {
        @white-bg();
        box-shadow: 0px 4px 10px 0px rgba(102, 102, 102, 0.06);

        h2 {
            height: 40px;
            text-align: center;
            line-height: 53px;
        }
    }

    /deep/ .van-popup__close-icon {
        position: fixed;
        z-index: 9999;
    }
</style>
