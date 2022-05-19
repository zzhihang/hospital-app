<template>
    <div style="height: 100%">
        <chat-dialog :chat-type="chatType"
                     :chatId="chatId"
                     :toImid="toImid"
                     :chatName="chatName"
                     :groupId="groupId"
        />
    </div>
</template>

<script>
  import ChatDialog from "../../components/Chat/ChatDialog";

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
  }
</script>

<style lang="less" scoped>

</style>
