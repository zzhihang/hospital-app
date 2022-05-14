<template>
    <div>
        <chat-list user-type="doctor" @onChatItemClick="onChatItemClick" @removeUnRead="removeUnRead"/>
    </div>
</template>

<script>
  import ChatList from "@/components/Chat/ChatList";

  export default {
    components: {
      ChatList
    },
    methods: {
      removeUnRead(){

      },
      onChatItemClick() {
        this.$router.push({name: 'doctorChat'})
      },
    },
  }
</script>

<style lang="less" scoped>

</style>
