<template>
    <div>
        <chat-list
                user-type="doctor"
                :list="list"
                @onChatItemClick="onChatItemClick"
                @removeUnRead="removeUnRead"
        />
    </div>
</template>

<script>
  import ChatList from "@/components/Chat/ChatList";
  import {userMessageList, userRemoveUnRead} from "@/service/userMessageService";

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
        const {data} = await userMessageList();
        this.list = data;
      },
      removeUnRead() {
        this.$confirm({message: '确定清除所有未读消息？'}, async () => {
          const result = await userRemoveUnRead();
          if (result.success) {
            this.$toast.success('操作成功');
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onChatItemClick({bookType, id, toImid}) {
        this.$router.push({name: 'userChat', query: {bookType, id, toImid}})
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
