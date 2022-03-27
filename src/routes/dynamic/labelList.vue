<template>
    <div>
        <div class="action-bar" v-if="!ifManage">
            <span @click="cancelClick">取消</span>
            <span style="font-weight: bold;color: #D94F17;" @click="onManageClick">管理标签<van-icon name="arrow" color="#D94F17"/></span>
        </div>
        <div class="action-bar" v-if="ifManage" style="text-align: right">
            <span style="font-weight: bold;color: #D94F17;flex: 1;" @click="onAddClick"><van-icon name="add-o" size="16"/>添加标签</span>
        </div>
        <van-cell-group>
            <van-cell v-for="(item, index) in data" :key="index" :title="`#${item.label}`">
                <template #right-icon v-if="ifManage">
                    <van-icon name="close" size="20" @click="onDeleteLable(item.labelId)"/>
                </template>
            </van-cell>
        </van-cell-group>
        <van-dialog v-model="addShow" title="添加标签" show-cancel-button @confirm="confirm">
            <van-field v-model="value" placeholder="请输入标签内容" />
        </van-dialog>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {Cell, CellGroup, Dialog, Field, Icon} from 'vant';
    import {userLabelAdd, userLabelDelete, userLabelList} from "@/service/topic";

    Vue.use(Icon);
    Vue.use(Cell);
    Vue.use(CellGroup);
    Vue.use(Field);
    Vue.use(Dialog);

    export default {
        data() {
            return {
                data: [],
                fileList: [
                    {url: 'https://img01.yzcdn.cn/vant/leaf.jpg'},
                    {url: 'https://cloud-image', isImage: true }
                ],
                ifManage: false,
                addShow: false,
                value: '',
            }
        },
        created(){
          this.getList();
          if(this.$route.query.manage){
              this.ifManage = true;
          }
        },
        methods: {
            async getList() {
                const {data} = await userLabelList();
                this.data = data;
            },
            async onDeleteLable(id){
                this.$confirm({message: '确认要删除吗？'}, async () => {
                    const result = await userLabelDelete(id);
                    if(result.status === 200){
                        this.getList();
                        this.$toast.success('删除成功');
                    }
                })
            },
            cancelClick(){
                this.$emit('cancelClick')
            },
            onManageClick(){
                this.$router.push({
                    path: '/label_list',
                    query: {
                        manage: 1
                    }
                })
            },
            onAddClick(){
                this.addShow = true;
            },
            async confirm(){
                if(!this.value){
                    return this.$toast.fail('不能为空')
                }
                const result = await userLabelAdd(this.value);
                if(result.status === 200){
                    this.getList();
                    this.value = '';
                    this.$toast.success('添加成功');
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.action-bar{
    @flex-sb-center();
    background: #F7F2EF;
    height: 33px;
    font-size: 14px;
    padding: 0 16px;
    color: #999999;
}
</style>
