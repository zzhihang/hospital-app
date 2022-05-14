<template>
    <div style="height: 100%">
        <chat-dialog @send="send"/>
    </div>
</template>

<script>
    import WebIM from 'easemob-websdk'
    import ChatDialog from "@/components/Chat/ChatDialog";
    import {WEB_IM_APP_KEY} from "@/static/js/env";

    export default {
        components: {
            ChatDialog
        },
        mounted(){
            let username = 'zhuzhihang', password = 'hang521';
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
                onTextMessage: (message) => {
                    console.log(message)
                    console.log("Message from: " + message.from + " Message: " + message.msg)
                },
                onError: (error) => {
                    console.log('on error', error)
                }
            });
            // 注册。 先注册才能登录
            WebIM.conn.registerUser({ username, password })
                .then((res) => {
                    console.log(`register user ${username} success`)
                })
                .catch((e) => {
                    console.log(`${username} already exists`)
            });
            // 登录。 //登出WebIM.conn.close();
            WebIM.conn.open({ user: username, pwd: password })
                .then((res) => {
                    console.log(`Login Success`);
                })
                .catch((e) => {
                    console.log(`Login failed`);
            });

         },
        methods: {
            send() {
                let option = {
                    chatType: 'singleChat',    // 会话类型，设置为单聊。
                    type: 'txt',               // 消息类型。
                    to: '',                // 消息接收方（用户 ID)。
                    msg: 'test'           // 消息内容。
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
