<template>
    <van-form
            ref="form"
            @submit="onSubmit"
            :readonly="formReadonly"
    >
        <van-field
                v-model="formData.name"
                label="就诊人姓名"
                input-align="right"
                required
                placeholder="请输入就诊人姓名"
                :rules="[{ required: true}]"></van-field>
        <van-field
                v-model="formData.idNumber"
                label="身份证号"
                name="idNumber"
                input-align="right"
                required
                placeholder="请输入就诊人身份证号"
                :rules="[{ required: true}, { pattern, message: '身份证号码格式错误' }]"></van-field>
        <van-field
                name="radio"
                label="就诊人性别"
                input-align="right"
                required
                :rules="[{ required: true}]"
        >
            <template #input>
                <van-radio-group v-model="formData.sex" direction="horizontal" :disabled="true">
                    <van-radio name="男">男</van-radio>
                    <van-radio name="女">女</van-radio>
                </van-radio-group>
            </template>
        </van-field>
        <van-field
                v-model="formData.birthday"
                label="出生日期"
                input-align="right"
                required
                readonly
                clickable
                name="datetimePicker"
                placeholder="请选择出生日期"
                :rules="[{ required: true}]"></van-field>
        <van-popup v-model="showPicker" position="bottom">
            <van-datetime-picker
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @confirm="(e) => onConfirm('birthday', e)"
                    @cancel="showPicker = false"></van-datetime-picker>
        </van-popup>
        <van-field
                readonly
                v-model="formData.province"
                clickable
                name="area"
                required
                input-align="right"
                :value="value"
                label="所在地区"
                placeholder="请选择所在省份地区"
                :rules="[{ required: true}]"
                @click="formReadonly ? '' :showArea = true"></van-field>
        <van-popup v-model="showArea" position="bottom">
            <van-area
                    :area-list="areaList"
                    @confirm="(e) => onConfirm('province', e)"
                    @cancel="showArea = false"></van-area>
        </van-popup>
        <van-field
                v-model="formData.relationship"
                label="就诊人关系"
                input-align="right"
                required
                readonly
                clickable
                placeholder="请选择与本人关系"
                @click="formReadonly ? '' :showPicker2 = true"
                :rules="[{ required: true }]"></van-field>
        <van-popup v-model="showPicker2 " position="bottom">
            <van-picker
                    show-toolbar
                    :columns="columns"
                    @confirm="(e) => onConfirm('relationship', e)"
                    @cancel="showPicker2 = false"
            />
        </van-popup>
        <van-field
                v-model="formData.phone"
                label="联系方式"
                input-align="right"
                required
                placeholder="请输入联系方式"
                :rules="[{ required: true }]"></van-field>
        <div class="bottom-button-box" style="display: flex;" v-if="formReadonly">
            <van-button type="primary" native-type="button" plain @click="deleteClick" class="mr10"
                        style="width: 30%;flex-shrink: 0">删除
            </van-button>
            <van-button type="primary" native-type="button" @click="onEditClick">修改</van-button>
        </div>
        <div style="margin: 16px;" v-else>
            <van-button block type="info" native-type="submit">保存</van-button>
            <van-button v-if="id" block native-type="button" color="#EBECEF" class="cancel mt10"
                        @click="$router.go(-1)">取消
            </van-button>
        </div>
    </van-form>
</template>

<script>
  import {areaList} from '@vant/area-data';
  import {userPatientDelete, userPatientInfo, userPatientSave} from "@/service/userInfoService";
  import {formatDate, getBirthdayById, getSexById} from "@/static/js/util";
  import {IDCARD_VALIDATE} from "@/static/js/validator";

  export default {
    data() {
      return {
        areaList,
        showArea: false,
        showPicker: false,
        showPicker2: false,
        minDate: new Date('1949/10/01'),
        maxDate: new Date(),
        formReadonly: false,
        id: '',
        formData: {
          name: '',
          phone: '',
          birthday: '',
          sex: '',
          province: '',
          relationship: '',
          idNumber: '',
        },
        pattern: IDCARD_VALIDATE.pattern,
        columns: ['亲戚', '家庭成员', '本人', '朋友', '其他'],
      }
    },
    created() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        this.getInfo(this.$route.query.id);
        document.title = '修改就诊人信息'
      }
      if (this.$route.query.readonly) {
        this.formReadonly = true;
      }
    },
    watch: {
      'formData.idNumber'(newVal, oldVal) {
        this.$refs.form.validate('idNumber').then((result) => {
          this.formData.birthday = getBirthdayById(newVal)
          this.formData.sex = getSexById(newVal)
        });
      },
    },
    methods: {
      async getInfo(id) {
        const result = await userPatientInfo(id);
        if (result.success) {
          for (let key in this.formData) {
            this.formData[key] = result.data[key];
          }
        } else {
          this.$toast.fail(result.msg);
        }
      },
      deleteClick() {
        this.$confirm({message: '是否确定删除就诊人？'}, async () => {
          const result = await userPatientDelete(this.id);
          if (result.success) {
            this.$toast.success('操作成功');
            this.$router.go(-1)
          } else {
            this.$toast.fail(result.msg);
          }
        })
      },
      onEditClick() {
        this.formReadonly = false;
      },
      async onSubmit() {
        if (this.id) {
          this.formData.id = this.id;
        }
        const result = await userPatientSave(this.formData);
        if (result.success) {
          this.$toast.success('操作成功');
          this.$router.go(-1)
        } else {
          this.$toast.fail(result.msg);
        }
      },
      setPickerHidden() {
        this.showArea = false;
        this.showPicker = false;
        this.showPicker2 = false;
      },
      onConfirm(type, value) {
        if (type === 'birthday') {
          this.formData.birthday = formatDate(value);
        } else if (type === 'province') {
          this.formData.province = value.map(item => item.name).join('')
        } else {
          this.formData[type] = value
        }
        this.setPickerHidden();
      }
    },
  }
</script>

<style lang="less" scoped>
    .cancel {
        color: #999999 !important;
    }
</style>
