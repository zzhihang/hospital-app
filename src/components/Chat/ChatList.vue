<template>
    <div class="chat">
        <div class="chat-action">
            <div class="action-item ml20" @click="() => {$emit('removeUnRead')}">
                <van-icon :name="require('../../static/img/icon/icon_qingchuweidu.png')"/>
                <span>清除未读消息</span>
            </div>
            <div class="action-item" v-if="userType === 'doctor'" @click="onLaunchGroupChat">
                <van-icon :name="require('../../static/img/icon/icon_faqiqunliao.png')"/>
                <span>发起群聊</span>
            </div>
        </div>
        <div class="chat-list">
            <chat-list-item  v-for="(item, index) in list"
                             class="van-hairline--bottom"
                             v-on="$listeners"
                             @click.native="() => {$emit('onChatItemClick', item)}"
                             :name="item.name"
                             :book-type="item.bookType"
                             :group-img="item.groupImg"
                             :group-id="item.groupId"
                             :unRead="item.unRead"
                             :avatar="item.headimgurl"
                             :id="item.id"
                             :lastMsg="item.lastMsg"
                             :lastTime="item.lastTime"
                             :key="index"
            />
        </div>
        <member-panel :show.sync="memberPanelShow" member-action="launch"/>
    </div>
</template>

<script>
  import ChatListItem from "@/components/Chat/ChatListItem";
  import MemberPanel from "@/components/Chat/components/MemberPanel";

  export default {
    components: {
      ChatListItem,
      MemberPanel
    },
    props: {
      userType: {
        type: String,
        default: 'user'
      },
      list: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        memberPanelShow: false,
      }
    },
    methods: {
      onLaunchGroupChat(){
        this.memberPanelShow = true;
      },
    },
  }
</script>

<style lang="less" scoped>
    .chat {
        padding: 5px 15px 50px;
    }

    .chat-action {
        background: #EEF2FA;
        text-align: right;
        height: 35px;
        @flex-col-center();
        flex-flow: row-reverse;

        .action-item {
            @flex-col-center();
            font-size: 14px;
        }
    }

    .chat-list {
        margin-top: 5px;
        border-radius: 9px;
        overflow: hidden;
    }
</style>
