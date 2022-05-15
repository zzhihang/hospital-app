/**
* @Description: 聊天主页面
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/6 21:57
*/
<template>
    <div class="chat-body">
        <div class="chat-area">
            <div class="chat-scroll">
                <div class="message-item he">
                    <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
                    <div class="message">
                        你好
                    </div>
                </div>
                <div class="message-item me">
                    <van-image :src="require('../../static/img/pic_wujiuzhenren.png')"/>
                    <div class="message">
                        你好
                    </div>
                </div>
            </div>
        </div>
        <div class="action-bar">
            <div class="action">
                <ul>
                    <li>
                        <van-icon @click="onRecorderClick" :name="require('../../static/img/icon/icon_yuyin.png')"/>
                    </li>
                    <li>
                        <van-uploader
                                accept="image/*"
                                :max-size="maxSize"
                                @oversize="onOversize"
                                :after-read="afterRead"
                                max-count="1"
                        >
                            <van-icon :name="require('../../static/img/icon/icon_tupian.png')"/>
                        </van-uploader>
                    </li>
                    <li style="flex:1;text-align: right;" v-if="chatType === 'group'">
                        <van-icon @click="settingShow=true" name="setting-o"/>
                    </li>
                </ul>
            </div>
            <div class="input-box van-hairline--top">
                <van-field
                        class="chat-input"
                        v-model="message"
                        rows="1"
                        autosize
                        type="textarea"
                />
                <van-icon @click="() => $emit('send')"
                          class="ml20"
                          :name="message.length ? require('../../static/img/icon/icon_fasong01.png') : require('../../static/img/icon/icon_fasong.png')"/>
            </div>
            <recorder :show.sync="recorderShow" @recorderSuccess="recorderSuccess"/>
            <setting-panel :show.sync="settingShow" :member-list="memberList" v-bind="$attrs"/>
        </div>
    </div>
</template>

<script>
  import Vue from 'vue';
  import Recorder from './components/Recorder'
  import SettingPanel from './components/SettingPanel'
  import {doctorChatGroupMemberList, doctorChatHistory} from "@/service/doctorMessageService";

  export default {
    props: {
      chatType: {
        type: String,
        default: 'single'
      },
    },
    components: {
      Recorder,
      SettingPanel
    },
    data() {
      return {
        message: '',
        maxSize: 1024 * 1024 * 30,
        recorderShow: false,
        settingShow: false,
        memberList: [], //群成员
      }
    },
    created() {
      this.getDoctorChatHistory();
      this.getDoctorChatGroupMemberList()
    },
    methods: {
      async getDoctorChatHistory() {
        const {data} = await doctorChatHistory(this.chatId)
      },
      async getDoctorChatGroupMemberList() {
        const {data} = await doctorChatGroupMemberList(this.chatId);
        this.memberList = data;
      },
      onRecorderClick() {
        this.recorderShow = true;
      },
      recorderSuccess() {

      },
      onOversize() {
        this.$toast.fail('文件大小不能超过30M')
      },
      afterRead() {

      }
    },
  }
</script>

<style lang="less" scoped>
    .chat-body {
        @flex-column();
        height: 100%;
    }

    .chat-area {
        padding: 15px;
        flex: 1;
    }

    .chat-scroll {
        padding: 20px 15px;
        height: 100%;
        box-sizing: border-box;
        border-radius: 9px;
        @white-bg();

        .van-image {
            height: 39px;
            width: 39px;
        }

        .message-item {
            display: flex;
            align-items: center;
        }

        .message {
            color: #333333;
            font-size: 16px;
            padding: 7px 15px 5px;
        }

        .he {
            .message {
                margin-left: 10px;
                border-radius: 0 24px 24px 24px;
                background: #F6F6F6;
            }
        }

        .me {
            flex-flow: row-reverse;

            .message {
                margin-right: 10px;
                border-radius: 24px 0 24px 24px;
                background: #F2F7FF;
            }
        }
    }

    .action-bar {
        flex-shrink: 0;
        position: relative;
        box-shadow: 0px -1px 6px 0px rgba(102, 102, 102, 0.06);
        @white-bg();

        .action {
            ul {
                @flex-col-center();
                height: 44px;
                padding-left: 15px;

                li {
                    margin-right: 25px;
                }
            }
        }
    }

    .chat-input {
        background: #F6F6F6;
        padding: 6px;
        border-radius: 4px;
    }

    .input-box {
        @flex-col-center();
        padding: 10px 15px;

    }
</style>
