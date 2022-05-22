<template>
    <div>
        <chat-list
                v-if="list.length > 0"
                :list="list"
                @onChatItemClick="onChatItemClick"
                @removeUnRead="removeUnRead"
                @deleteItemSuccess="deleteItemSuccess"
        />
        <van-empty v-else description="暂无消息"/>
    </div>
</template>

<script>
  import ChatList from "@/components/Chat/ChatList";
  import {userMessageList} from "@/service/userMessageService";
  import {messageReadAll} from "@/service/doctorMessageService";

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
          const result = await messageReadAll();
          if (result.success) {
            this.getMessageList();
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
