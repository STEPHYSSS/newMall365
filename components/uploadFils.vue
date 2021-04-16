<template>
    <view>
        <view class="content_wrapper">
            <view class="image_wrapper" :key="indexs" v-for="(img, indexs) in showImageData">
                <icon v-if="!disabled" @click.stop="deleteImage(indexs)" type="clear" size="18" class="deleteIcon"></icon>
                <image :style="style" @click="showImage(showImageData,indexs)" class="photo-img" :src="fileHeader+img[valueKey]"></image>
            </view>
            <view :style="style" v-if="!disabled " class="photo-img-wrapper" @click="handleselectFile">
                <image class="add-img" src="#"></image>
                <view class="add-desc">上传图片</view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {　　　　　//来自父组件的值
        props: {
            fileList:{
                type: Array,
                default: () => []
            },
            value: {
                type: Array,
                default: () => []
            },
            style: {
                type: [Object, String],
                default: ''
            },
            showAdd: {
                type: Boolean,
                default: () => true
            },
            valueKey: {
                type: String,
                default: 'photo'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                fileHeader: this.fileHeader,
                showImageData: JSON.parse(JSON.stringify(this.fileList)),
            }
        },
        watch: {
            fileList: {
                handler() {
                    this.showImageData = JSON.parse(JSON.stringify(this.fileList))
                },
                deep: true,
                immediate: true,

            }
        },
        methods: {
            //选择图片
            handleselectFile() {
                uni.hideKeyboard()
                this.choseImage();
            },
            choseImage() {
                // 任务详情上传图片
                uni.showActionSheet({
                    itemList: ['拍照', '相册'],
                    success: res => {
                        let index = res.tapIndex;
                        if (index === 0) {
                            //#ifdef MP-WEIXIN
                            uni.authorize({
                                scope: 'scope.camera',
                                success: () => {
                                    uni.chooseImage({
                                        sourceType: ['camera'],
                                        success: res => {
                                            let tempFilePaths = res.tempFilePaths;
                                            this.uploadFilesTask(tempFilePaths);

                                        }
                                    });
                                }
                            });
                            //#endif
                            //#ifdef APP-PLUS || H5
                            uni.chooseImage({
                                sourceType: ['camera'],
                                success: res => {
                                    let tempFilePaths = res.tempFilePaths;
                                    this.uploadFilesTask(tempFilePaths);

                                }
                            });
                            //#endif
                        } else {
                            uni.chooseImage({
                                sourceType: ['album'],
                                success: res => {
                                    let tempFilePaths = res.tempFilePaths;
                                    this.uploadFilesTask(tempFilePaths);

                                }
                            });

                        }
                    }
                });
            },
            async uploadFilesTask(images) {
                uni.showLoading({
                    title: '上传中...'
                })
                for (let i in images) {
                    let uploadData = false;
                    try {
                        // 上传部分
                        uploadData = await this.uploadImageReq(images[i])
                        if (uploadData !== false) {
                            if (uploadData.code == this.ERR_CODE) {
                                let obj = {}
                                obj[this.valueKey] = uploadData.body
                                this.showImageData.push(obj)　　　　　　　　　　　　　　　　　　　 //子组件传递父组件，属性，值
                                this.$emit("imageChange", this.showImageData);
                            } else {
                                uni.hideLoading()
                                break
                                uni.showToast({
                                    title: uploadData,
                                    icon: 'none'
                                })
                            }

                        }
                    } catch (err) {
                        console.log(err);
                        return;
                    }
                }
                uni.hideLoading();

            },
            uploadImageReq(file) {
                return new Promise((resolve, reject) => {
                    uni.uploadFile({
                        url: '上传图片的服务器地址',
                        filePath: file,
                        name: 'file',
                        formData: {
                            Authorization: token信息
                        },
                        success: result => {
                            let res = JSON.parse(result.data)
                            if (res.code == 200) {
                                resolve(res);
                            } else {
                                reject('接口返回错误');
                            }
                        },
                        fail: () => {
                            reject('网络链接错误');
                        }
                    });
                });
            },
            //删除图片
            deleteImage(index) {
                uni.showModal({
                    title: '提示',
                    content: '确定删除?',
                    success: (res) => {
                        if (res.confirm) {
                            this.showImageData.splice(index, 1);
                            this.$emit('imageChange', this.showImageData)
                        } else if (res.cancel) {
                            console.log('用户点击取消');
                        }
                    }
                });

            },
            // 预览
            showImage(list, index) {
                const imageList = []
                list.forEach(item => {
                    imageList.push(item[this.valueKey])
                })
                uni.previewImage({
                    urls: imageList,
                    current: index
                })
            },
        }


    }
</script>

<style lang="scss" scoped>
    .content_wrapper {

        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;


        .image_wrapper {
            margin-right: 20rpx;
            position: relative;

            .photo-img {
                // padding: 10upx;
                width: 150upx;
                height: 150upx;
            }

            .deleteIcon {
                position: absolute;
                z-index: 99;
                overflow: hidden;
                top: -10rpx;
                right: -10rpx;
            }
        }

        .photo-img-wrapper {

            width: 150upx;
            height: 150upx;
            background: rgba(0, 0, 0, 0.02);
            border: 1upx solid rgba(0, 0, 0, 0.15);
            box-sizing: border-box;
            border-radius: 5px 5px 5px 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            flex-direction: column;

            .add-img {
                width: 68upx;
                height: 68upx;
                color: #0081ff;
            }

            .add-desc {

                color: rgba(0, 0, 0, 0.65);
                font-size: 28upx;
                font-family: PingFangSC-regular;
            }

        }

    }
</style>
