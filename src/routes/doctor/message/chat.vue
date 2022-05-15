<template>
    <div style="height: 100%">
        <chat-dialog @send="send"
                     :chat-type="chatType"
                     :chatId="chatId"
                     :toImid="toImid"
                     :chatName="chatName"
                     :groupId="groupId"
        />
    </div>
</template>

<script>
  import WebIM from 'easemob-websdk'
  import ChatDialog from "@/components/Chat/ChatDialog";
  import {WEB_IM_APP_KEY} from "@/static/js/env";
  import connect from "@/store/connect";
  const {mapState, mapMutations} = connect('commonStore');

  export default {
    components: {
      ChatDialog,
    },
    data() {
      return {
        chatType: '',
        chatId: '',
        chatName: '',
        toImid: '',
        groupId: ''
      }
    },
    computed: {
      ...mapState(['userInfo', 'ifShowTabBar', 'tabBarActive'])
    },
    created() {
      const {bookType, id, toImid, name, groupId} = this.$route.query;
      this.chatType = bookType;
      this.chatId = id;
      this.toImid = toImid;
      this.chatName = name;
      this.groupId = groupId;
      document.title = name;
    },
    mounted() {
      let username = this.userInfo.imId, password = this.userInfo.imPwd;
      // 初始化客户端。
      WebIM.conn = new WebIM.connection({
        appKey: WEB_IM_APP_KEY,
      });
      // 添加消息回调函数。
      WebIM.conn.addEventHandler('connection&message', {
        onConnected: () => {
          console.log("Connect success !")
        },
        onDisconnected: () => {
          console.log("Logout success !")
        },
        onImageMessage: ( message ) => {},   // 收到图片消息。
        onTextMessage: (message) => {
          console.log("Message from: " + message.from + " Message: " + message.msg)
        },
        onOffline: () => {}, // 本机网络掉线。
        onError: (error) => {
          console.log('on error', error)
        }
      });
      // 登录。 //登出WebIM.conn.close();
      WebIM.conn.open({user: username, pwd: password})
        .then((res) => {
          console.log(`Login Success`);
        })
        .catch((e) => {
          console.log(`Login failed`);
        });

    },
    methods: {
      send(message) {
        let option = {
          chatType: 'singleChat',    // 会话类型，设置为单聊。 groupChat为群聊
          type: 'txt',               // 消息类型。
          to: this.toImid,                // 消息接收方（用户 ID)。
          msg: message          // 消息内容。
        };
        let msg = WebIM.message.create(option);
        WebIM.conn.send(msg).then((res) => {
          console.log('send private text success');
        }).catch(() => {
          console.log('send private text fail');
        })
      }
    },
  }
</script>

<style lang="less" scoped>

</style>
