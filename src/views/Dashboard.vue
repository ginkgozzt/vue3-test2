<template>
  <div class="circle-container">
    <div class="central-avatar">
      <img :src="centerPerson.avatar" :alt="centerPerson.name" />
      <div class="info">
        <h2>{{ centerPerson.name }}</h2>
        <p>{{ centerPerson.details }}</p>
      </div>
    </div>
    <div v-for="(movingAvatar, index) in movingAvatars" :key="index" class="avatar" :style="getAvatarStyle(index)">
      <img :src="movingAvatar.src" :alt="movingAvatar.name" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const centerPerson = {
      name: '中心人物',
      details: '中心人物详细信息',
      avatar: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
    };

    const movingAvatars = ref([
      { name: '运动者1', src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
      { name: '运动者2', src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
      { name: '运动者3', src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
      { name: '运动者4', src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
      { name: '运动者5', src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png' },
    ]);

    const angleShift = ref(0); // 角度偏移
    const radius = 150; // 半径150px
    const randomSizes = ref(movingAvatars.value.map(() => Math.random() * 40 + 30)); // 随机头像大小（范围30px到70px）

    const getAvatarStyle = (index) => {
      const totalAvatars = movingAvatars.value.length;
      const angle = (index * (2 * Math.PI)) / totalAvatars + angleShift.value; // 计算当前头像的独特角度
      const x = radius * Math.cos(angle); // 计算 x 坐标
      const y = radius * Math.sin(angle); // 计算 y 坐标

      const avatarSize = randomSizes.value[index];

      return {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(${x}px, ${y}px)`,
        width: `${avatarSize}px`, // 使用随机大小
        height: `${avatarSize}px`, // 使用随机大小
      };
    };

    const updatePositions = () => {
      angleShift.value += 0.05; // 控制头像的圆周运动速度
    };

    onMounted(() => {
      const interval = setInterval(updatePositions, 100); // 每100毫秒更新一次位置

      onBeforeUnmount(() => {
        clearInterval(interval); // 清理定时器
      });
    });

    return {
      centerPerson,
      movingAvatars,
      getAvatarStyle,
    };
  },
};
</script>

<style scoped>
.circle-container {
  position: relative;
  width: 500px;
  height: 500px;
  margin: auto;
}

.central-avatar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.central-avatar img {
  width: 80px; /* 中心头像的宽度 */
  height: 80px; /* 中心头像的高度 */
  border-radius: 50%;
}

.info {
  text-align: center;
  color: #333;
}

.avatar {
  position: absolute;
  border-radius: 50%; /* 圆形头像 */
}

.avatar img {
  width: 100%;
  height: 100%;
}
</style>
