/**
* @Description: 聊天主页面
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/6 21:57
*/
<template>
    <div class="chat-body">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" >
            <div class="chat-area" @click="recorderShow = false">
                <div class="chat-scroll">
                    <div v-for="(item, index) in messageList"
                         :key="index"
                         class="message-item he"
                         :ref="index === messageList.length - 1 && 'last'"
                         :class="{me: item.self, he: !item.self}"
                    >
                        <van-image :src="item.fromHeadimgurl"/>
                        <div v-if="item.type === 'audio'">
                            <audio-player long="3"/>
                        </div>
                        <div class="chat-image" v-else-if="item.type === 'image'">
                            <van-image src="https://www.baidu.com/img/flexible/logo/pc/result.png"
                                       @click="onImageClick"/>
                        </div>
                        <div class="message" v-else>
                            {{item.contentObject}}
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
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
                <template v-if="!recorderShow">
                    <van-field
                            class="chat-input"
                            v-model="message"
                            rows="1"
                            autosize
                            type="textarea"
                    />
                    <van-icon @click="onSendClick"
                              class="ml20"
                              :name="message.length ? require('../../static/img/icon/icon_fasong01.png') : require('../../static/img/icon/icon_fasong.png')"/>
                </template>
            </div>
            <recorder v-if="recorderShow" @recorderSuccess="recorderSuccess"/>
            <setting-panel
                    v-if="chatType === 'group'"
                    :show.sync="settingShow"
                    :member-list="memberList"
                    v-bind="$attrs"
                    v-on="$listeners"
            />
        </div>
    </div>
</template>

<script>
  import WebIM from 'easemob-websdk'
  import Recorder from './components/Recorder'
  import SettingPanel from './components/SettingPanel'
  import {doctorChatHistory, messageSave} from "@/service/doctorMessageService";
  import {WEB_IM_APP_KEY} from "@/static/js/env";
  import connect from "@/store/connect";
  import AudioPlayer from "@/components/Chat/components/AudioPlayer";
  import {ImagePreview} from 'vant';

  const {mapState} = connect('commonStore');
  export default {
    props: {
      chatType: {
        type: String,
        default: 'single'
      },
    },
    components: {
      Recorder,
      SettingPanel,
      AudioPlayer
    },
    data() {
      return {
        message: '',
        maxSize: 1024 * 1024 * 30,
        recorderShow: false,
        settingShow: false,
        isLoading: false,
        page: 1,
        messageList: [],
        memberList: [], //群成员
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    created() {
      this.getDoctorChatHistory();
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
          onImageMessage: (message) => {

          },   // 收到图片消息。
          onAudioMessage: () => {
            let options = {
              url: message.url,
              headers: {
                Accept: 'audio/mp3'
              },
              onFileDownloadComplete: function (response) {
                let objectUrl = WebIM.utils.parseDownloadResponse.call(WebIM.conn, response)
                message.audioSrcUrl = message.url;
                message.url = objectUrl
              },
              onFileDownloadError: function () {
              }
            }
            WebIM.utils.download.call(WebIM.conn, options)
          },
          onTextMessage: (message) => {
            this.messageList.push({
              self: false,
              contentObject: message.msg,
              type: message.type,
              fromHeadimgurl: message.ext.avatar
            });
            this.$nextTick(() => {
              this.$refs.last && this.$refs.last[0].scrollIntoView(true)
            });
            console.log("Message from: " + message.from + " Message: " + message.msg)
          },
          onOffline:
            () => {
              this.$toast.fail('本机网络掉线')
            },
        }
      )
      ;
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
      onRefresh() {
        this.page = this.page + 1;
        this.isLoading = true;
        this.getDoctorChatHistory()
      },
      async getDoctorChatHistory() {
        const {data} = await doctorChatHistory({booksId: this.$attrs.chatId, page: this.page, pageSize: 20});
        this.messageList = data.records.concat(this.messageList);
        this.isLoading = false;
        if(data.records.length === 0){
          this.page = this.page - 1;
          return this.$toast('没有更多记录了')
        }
        //只有首次进来才自动拉到最下面
        this.page === 1 && this.$nextTick(() => {
          this.$refs.last && this.$refs.last[0].scrollIntoView(true)
        });
      },
      onRecorderClick() {
        this.recorderShow = !this.recorderShow;
      },
      recorderSuccess() {
        this.recorderShow = false;
      },
      onOversize() {
        this.$toast.fail('文件大小不能超过30M')
      },
      afterRead() {

      },
      onImageClick() {
        ImagePreview(['https://img01.yzcdn.cn/vant/apple-1.jpg']);
      },
      onSendClick() {
        let option = {
          chatType: 'singleChat',    // 会话类型，设置为单聊。 groupChat为群聊
          type: 'txt',               // 消息类型。
          to: this.$attrs.toImid,                // 消息接收方（用户 ID)。
          msg: this.message,          // 消息内容。
          ext: {
            avatar: this.userInfo.headimgurl
          }
        };
        if (this.chatType !== 'single') {//设置群聊
          option.chatType = 'groupChat';
          option.to = this.$attrs.toImid
        }
        let msg = WebIM.message.create(option);
        WebIM.conn.send(msg).then(async (res) => {//环信发送成功 然后前端渲染 然后保存到数据库
          this.messageList.push({
            self: true,
            fromHeadimgurl: this.userInfo.headimgurl,
            contentObject: this.message,
            type: option.type
          });
          const result = await messageSave({
            type: option.type,
            content: this.message,
            booksId: this.$attrs.chatId
          });
          this.$nextTick(() => {
            this.$refs.last && this.$refs.last[0].scrollIntoView(true)
          });
          if (result.success) {
            this.message = '';
          } else {
            this.$toast.fail(result.msg);
          }
        }).catch(() => {
          this.$toast.fail('发送失败');
        });
      }
    }
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
        overflow: scroll;
    }

    .chat-scroll {
        padding: 20px 15px;
        min-height: 100%;
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
            margin-bottom: 20px;
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

    .chat-image {
        .van-image {
            min-width: 80px;
            max-width: 110px;
        }
    }
    .van-pull-refresh{
        flex: 1;
        overflow: scroll;
    }
</style>
