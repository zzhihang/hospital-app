<template>
    <van-swipe-cell>
        <div class="chat-list-item">
            <van-badge :dot="!!unRead">
                <div class="avatar-box" v-if="bookType === 'group'">
                    <van-image v-for="(item, index) in groupImg" :key="index" :src="item"/>
                </div>
                <van-image :src="avatar" v-else/>
            </van-badge>
            <div class="content">
                <h2>
                    <span>{{name}}</span>
                    <span class="time">{{lastTime}}</span>
                </h2>
                <p class="message ellipsis1">
                    {{lastMsg}}
                </p>
            </div>
        </div>
        <template #right>
            <van-button style="height: 100%;" square type="danger" text="删除" @click="onDeleteClick"/>
        </template>
    </van-swipe-cell>
</template>

<script>
  import {messageDelete} from "@/service/doctorMessageService";

  export default {
    props: {
      'avatar': {},
      'name': {},
      'lastMsg': {},
      'lastTime': {},
      'unRead': {},
      'id': {},
      'groupId': {},
      'groupImg': {
        type: Array,
        default: () => []
      },
      'bookType': {
        type: String,
        default: 'single'
      }
    },
    methods: {
      onDeleteClick() {
        this.$confirm({message: '确定删除此会话？'}, async () => {
          const result = await messageDelete(this.id);
          if (result.success) {
            this.$emit('deleteItemSuccess')
            this.$toast.success('操作成功');
          } else {
            this.$toast.fail(result.msg);
          }
        })

      }
    },
  }
</script>

<style lang="less" scoped>
    .chat-list-item {
        @flex-sb-center();
        @white-bg();
        padding: 15px;

        .van-image {
            width: 45px;
            height: 45px;
            flex-shrink: 0;
        }

        .content {
            flex: 1;
            padding-left: 10px;
            overflow: hidden;

            h2 {
                @flex-sb-center();
            }

            .time {
                color: #999999;
                font-size: 12px;
                font-weight: normal;
            }
        }

        .message {
            color: #666666;
            font-size: 14px;
            margin-top: 7px;
        }
    }

    .avatar-box{
        width: 45px;
        height: 45px;
        @flex-all-center();
        flex-wrap: wrap-reverse;
        .van-image{
            width: 33%;
            height: 33%;
        }
    }
</style>
