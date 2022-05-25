/**
* @Description: 聊天主页面
* @Param:
* @return:
* @Author: zzhihang@hotmail.com
* @date: 2022/5/6 21:57
*/
<template>
    <div class="chat-body">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="chat-area" @click="recorderShow = false">
                <div class="chat-scroll">
                    <div v-for="(item, index) in messageList"
                         :key="index"
                         class="message-item he"
                         :ref="index === messageList.length - 1 && 'last'"
                         :class="{me: item.self, he: !item.self}"
                    >
                        <van-image class="avatar" :src="item.fromHeadimgurl"/>
                        <div class="chat-audio" v-if="item.type === 'audio'">
                            <audio-player :long="resolveAudioContent(item.contentObject).timeLong"
                                          :url="resolveAudioContent(item.contentObject).url"
                                          :background="item.self ? '#F2F7FF' : '#F6F6F6'"
                            />
                        </div>
                        <div class="chat-image" v-else-if="item.type === 'img'">
                            <van-image :src="item.contentObject"
                                       @click="onImageClick(item.contentObject)"/>
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
                                accept=".png, .jpg, .jpeg"
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
                    <van-icon @click="sendTxtMessage"
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
  import {upload} from "@/service/commonService";

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
        useOwnUploadFun: true
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
            this.messageList.push({
              self: false,
              contentObject: message.url,
              type: message.type,
              url: message.url,
              fromHeadimgurl: message.ext.avatar
            });
            this.scrollIntoView();
          },
          onAudioMessage: (message) => {
            this.messageList.push({
              self: false,
              contentObject: {
                url: message.ext.audioUrl,
                timeLong: message.length
              },
              type: message.type,
              fromHeadimgurl: message.ext.avatar
            });
            this.scrollIntoView();
          },
          onTextMessage: (message) => {
            this.messageList.push({
              self: false,
              contentObject: message.msg,
              type: message.type,
              fromHeadimgurl: message.ext.avatar
            });
            this.scrollIntoView();
            console.log("Message from: " + message.from + " Message: " + message.msg)
          },
          onOffline: () => {
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
      scrollIntoView(){
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.last && this.$refs.last[0].scrollIntoView(true)
          })
        }, 300);
      },
      onRefresh() {
        this.page = this.page + 1;
        this.isLoading = true;
        this.getDoctorChatHistory()
      },
      async getDoctorChatHistory() {
        const {data} = await doctorChatHistory({booksId: this.$attrs.chatId, page: this.page, pageSize: 20});
        this.messageList = data.records.reverse().concat(this.messageList);
        this.isLoading = false;
        if (this.page !== 1 && data.records.length === 0) {
          this.page = this.page - 1;
          return this.$toast('没有更多记录了')
        }
        this.page === 1 && this.scrollIntoView();
      },
      onRecorderClick() {
        this.recorderShow = !this.recorderShow;
      },
      resolveAudioContent(data){
        if(data){
          if(typeof data === 'string'){
            data = JSON.parse(data);
          }
          return {
            url: data.url,
            timeLong: data.timeLong
          }
        }
        return {};
      },
      recorderSuccess(audio) {
        //this.recorderShow = false;
        this.sendAudioMessage(audio)
      },
      onOversize() {
        this.$toast.fail('文件大小不能超过30M')
      },
      async afterRead(file) {
        const formData = new FormData();
        formData.append('file', file.file);
        const result = await upload(formData);
        if (result.status === 200) {
          this.url = result.data.data.url;
          this.sendImgMessage(this.url)
        } else {
          this.$toast.fail(result.msg);
        }
      },
      onImageClick(url) {
        ImagePreview([url]);
      },
      sendImgMessage(url) {
        const msg = this.getMessageOption({
          body: {
            type: 'file',
            url: url,
          },
        }, 'img');
        WebIM.conn.send(msg.body);
      },
      sendTxtMessage() {
        if(!this.message.trim().length){
          return this.$toast.fail('不能发送空白消息')
        }
        const msg = this.getMessageOption({msg: this.message});
        WebIM.conn.send(msg.body);
      },
      sendAudioMessage(audio) {
        const msg = this.getMessageOption({
          file: {},
          length: audio.timeLong,
          ext: {
            avatar: this.userInfo.headimgurl,
            audioUrl: audio.url
          },
        }, 'audio');
        WebIM.conn.send(msg.body);
      },
      getMessageOption(config, messageType = 'txt') {
        let id = WebIM.conn.getUniqueId();                 // 生成本地消息id
        let msg = new WebIM.message(messageType, id);      // 创建文本消息
        msg.set(Object.assign({}, {
          to: this.$attrs.toImid,
          chatType: this.chatType === 'single' ? 'singleChat' : 'groupChat',
          ext: {
            avatar: this.userInfo.headimgurl
          },
          success: async (id, serverMsgId) => {
            if (messageType === 'img') {
              this.messageList.push({
                type: messageType,
                self: true,
                fromHeadimgurl: this.userInfo.headimgurl,
                contentObject: config.body.url
              });
            } else if (messageType === 'audio') {
              this.messageList.push({
                self: true,
                type: messageType,
                fromHeadimgurl: this.userInfo.headimgurl,
                contentObject: {
                  url: config.ext.audioUrl,
                  timeLong: config.length
                }
              });
            } else {
              this.messageList.push({
                self: true,
                type: messageType,
                fromHeadimgurl: this.userInfo.headimgurl,
                contentObject: this.message
              });
            }
            const message = this.message;
            this.message = '';
            const params = {
              type: messageType,
              content: messageType === 'img' ? config.body.url : message,
              booksId: this.$attrs.chatId
            };
            if(messageType === 'audio'){
             params.content = JSON.stringify({
               url: config.ext.audioUrl,
               timeLong: config.length
             })
            }
            const result = await messageSave(params);
            this.scrollIntoView();
            if (!result.success) {
              this.$toast.fail(result.msg);
            }
          },
          fail: (e) => {
            console.log(e);
            this.$toast.fail('发送失败');
          }
        }, config));
        return msg;
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
        flex: 1;
        overflow: scroll;
        min-height: 100%;
        box-sizing: border-box;
        @white-bg();
    }

    .chat-scroll {
        padding: 20px 15px;
        min-height: 100%;
        box-sizing: border-box;
        border-radius: 9px;

        .avatar {
            height: 39px;
            width: 39px;
        }

        .message-item {
            display: flex;
            align-items: center;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 0;
            }
        }

        .message {
            color: #333333;
            font-size: 16px;
            padding: 7px 15px 5px;
        }

        .he {
            .chat-image, .message, .chat-audio {
                margin-left: 10px;
            }

            .message {
                border-radius: 0 24px 24px 24px;
                background: #F6F6F6;
            }
        }

        .me {
            flex-flow: row-reverse;

            .chat-image, .message, .chat-audio {
                margin-right: 10px;
                .recorder{
                    flex-flow: row-reverse;
                    /deep/.icon-saying{
                        transform: rotate(180deg);
                    }
                    /deep/.voicePlay{
                        transform: rotate(180deg) scale(0.6);
                    }
                }
            }

            .message {
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
        margin-left: 10px;

        .van-image {
            border-radius: 6px;
            overflow: hidden;
            min-width: 80px;
            max-width: 110px;
        }
    }

    .van-pull-refresh {
        flex: 1;
        overflow: scroll;
        /deep/.van-pull-refresh__track{
            padding: 15px;
            box-sizing: border-box;
        }
    }
</style>
