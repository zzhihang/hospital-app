<template>
    <van-popup v-model="show"
               position="right"
               @close="onClose"
               :close-on-click-overlay="false"
               closeable
               get-container="body"
               close-icon-position="top-left"
               close-icon="arrow-left"
               :style="{ width: '100%', height: '100%' }"
    >
        <div class="setting-box">
            <h2>群聊设置</h2>
            <div class="member-list">
                <div class="member-item" v-for="(item, index) in memberList" :key="index">
                    <van-image :src="require('../../../static/img/pic_wujiuzhenren.png')"/>
                </div>
                <div class="member-item setting" @click="onMemberSetClick('plus')">
                    <van-icon name="plus"/>
                </div>
                <div class="member-item setting" @click="onMemberSetClick('minus')">
                    <van-icon name="minus"/>
                </div>
            </div>
            <div class="height10block"></div>
            <van-cell title="群聊名称" :border="false" :value="$attrs.chatName" is-link @click="onModifyClick"/>
            <div class="bottom-content">
                <div class="height10block"></div>
                <van-button type="primary" @click="deleteGroup">删除此群聊</van-button>
            </div>
        </div>
        <member-panel :show.sync="memberPanelShow"
                      :member-list="memberList"
                      :member-action="memberAction"
                      v-bind="$attrs"
                      @addSuccess="onAddRemoveSuccess"
                      @removeSuccess="onAddRemoveSuccess"
        />
        <modify-panel :show.sync="modifyPanelShow"
                      v-bind="$attrs"
                      @modifySuccess="modifySuccess"
        />
    </van-popup>
</template>

<script>

  import MemberPanel from "@/components/Chat/components/MemberPanel";
  import {doctorServiceDelete} from "@/service/doctorServiceItemService";
  import ModifyPanel from "@/components/Chat/components/ModifyPanel";
  import {doctorChatGroupMemberList} from "@/service/doctorMessageService";

  export default {
    props: ['show'],
    components: {
      MemberPanel,
      ModifyPanel
    },
    data() {
      return {
        memberPanelShow: false,
        modifyPanelShow: false,
        memberAction: 'plus',
        memberList: []
      }
    },
    created(){
      this.getMemberList()
    },
    methods: {
      async getMemberList() {
        const {data} = await doctorChatGroupMemberList(this.$attrs.chatId);
        this.memberList = data;
      },
      onClose() {
        this.$emit('update:show', false)
      },
      onMemberSetClick(e) {
        this.memberPanelShow = true;
        this.memberAction = e;
      },
      onModifyClick() {
        this.modifyPanelShow = true;
      },
      onAddRemoveSuccess(){
        this.onClose();
        this.memberPanelShow = false;
        this.getMemberList();
      },
      modifySuccess(groupName){
        this.onClose();
        document.title = groupName;
        this.modifyPanelShow = false;
      },
      deleteGroup() {
        this.$confirm({message: '是否确定删除此群聊？删除后将解散此群。'}, async () => {
          const result = await doctorServiceDelete(this.id);
          if (result.success) {
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
    .member-list {
        display: flex;
        padding: 20px 0 0 15px;
        flex-wrap: wrap;
        margin-top: 45px;
        @white-bg();

        .member-item {
            border: 1px solid rgba(153, 153, 153, 0.2);
            height: 53px;
            width: 53px;
            flex-shrink: 0;
            margin-right: 16px;
            margin-bottom: 15px;
            border-radius: 6px;

            .van-image {
                height: 100%;
                width: 100%;
            }

            &.setting {
                border: 2px dashed rgba(153, 153, 153, 0.3);
                color: #999999;
                text-align: center;
                line-height: 53px;
            }
        }
    }

    h2 {
        position: absolute;
        top: 17px;
        left: 50%;
        transform: translateX(-50%);
    }

    .bottom-content {
        background: #F6F7FA;
        padding: 10px 0;
        position: relative;

        .van-button {
            bottom: 10px;
            height: 44px;
            width: 345px;
            margin-left: 15px;
            font-size: 18px !important;
        }
    }

    .setting-box {
        @flex-column();
        height: 100%;
        background: #F6F7FA;
    }
</style>
