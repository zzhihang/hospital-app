<template>
    <div>
        <chat-list
                user-type="doctor"
                :list="list"
                @onChatItemClick="onChatItemClick"
                @deleteItemSuccess="deleteItemSuccess"
                @removeUnRead="removeUnRead"
        />
    </div>
</template>

<script>
  import ChatList from "@/components/Chat/ChatList";
  import {doctorMessageList, messageReadAll} from "@/service/doctorMessageService";

  export default {
    components: {
      ChatList
    },
    data() {
      return {
        list: []
      }
    },
    created() {
      this.getMessageList();
    },
    methods: {
      async getMessageList() {
        const {data} = await doctorMessageList();
        this.list = data;
      },
      removeUnRead() {
        this.$confirm({message: '确定清除所有未读消息？'}, async () => {
          const result = await messageReadAll();
          if (result.success) {
            this.$toast.success('操作成功');
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      deleteItemSuccess() {
        this.getMessageList();
      },
      onChatItemClick({bookType, id, toImid, name, groupId}) {
        this.$router.push({name: 'chat', query: {bookType, id, toImid, name, groupId}})
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
