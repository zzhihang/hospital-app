<template>
    <div>
        <h2 class="ask">
            <span><my-icon name="rili" class="mr10"/>请准确选择就诊时间</span>
        </h2>
        <div class="calendar-box">
            <h6>请选择具体日期</h6>
            <van-calendar
                    :default-date="null"
                    @select="onSelectDate"
                    :show-title="false"
                    :poppable="false"
                    :show-confirm="false"
                    color="#187BEF"
                    row-height="40"
                    :style="{ height: '400px' }"
            />
        </div>
        <van-field
                class="mt10"
                readonly
                is-link arrow-direction="down"
                clickable
                name="datetimePicker"
                v-model="time"
                :value="time"
                required
                label="具体时间"
                placeholder="请选择具体时间"
                @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                    type="time"
                    @confirm="confirm"
                    @cancel="showPicker = false"
            />
        </van-popup>
        <div class="bottom-button-box">
            <van-button type="primary" @click="onNextClick">确定</van-button>
        </div>
    </div>
</template>

<script>
    import MyIcon from "@/components/common/MyIcon";
    import {formatDate} from "@/static/js/util";

    export default {
        components: {
            MyIcon
        },
        data() {
            return {
                date: '',
                time: '',
                list: [],
                showPicker: false,
            }
        },
        created(){

        },
        computed: {
            dateTime(){
                return `${this.date} ${this.time}`;
            }
        },
        methods: {
            confirm(value){
                this.time = value;
                this.showPicker = false;
            },
            onSelectDate(value) {
                this.date = formatDate(value);
            },
            onNextClick(){
                if(!this.date || !this.time){
                    return this.$toast.fail('请同时选择日期和时间')
                }
                const query = Object.assign({}, this.$route.query, {dateTime: this.dateTime})
                this.$router.push({name: 'orderConfirm', query})
            }
        },
    }
</script>

<style lang="less" scoped>
    .ask {
        color: @main-color;
        @flex-sb-center();
        height: 48px;
        background: #E0ECFF;
        padding-left: 15px;
        padding-right: 15px;

        .van-button {
            width: 85px;
            background: transparent;

            .van-button__content {
                padding: 0;
            }
        }
    }
    .calendar-box{
        background: #FFFFFF;
        padding: 15px;
        h6{
            margin-bottom: 15px;
        }
    }
</style>
