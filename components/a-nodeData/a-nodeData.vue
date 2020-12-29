<template>
    <div class="nodeData">
        <div style="text-align: center">
            <div style="width:150px;height:150px; margin:auto;">
                <image style="width: 100%;height:100%" src="../../static/assets/img/nodeData.png" alt="">
            </div>
            <span class="stringVal">{{stringVal}}</span>
        </div>
    </div>
</template>

<script>
export default {
	name: "index",
	props: {
		stringVal: {
			type: String,
			default: '暂无数据'
		}
	}
}
</script>

<style scoped>
    .nodeData-fa {
        text-align: center;
    }

    .nodeData {
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    .stringVal {
        display: inline-block;
        white-space: nowrap;
        font-size:15px;
        margin-top:10px;
        color:#777;
    }
</style>