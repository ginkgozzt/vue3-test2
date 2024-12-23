<template>
  <div class="circle-container">
    <div class="central-avatar">
      <img :src="centerPerson.avatar" :alt="centerPerson.name" />
      <div class="info">
        <h2>{{ centerPerson.name }}</h2>
        <p>{{ centerPerson.details }}</p>
      </div>
    </div>
    <div v-for="(group, groupIndex) in groups" :key="groupIndex" class="avatar-group">
      <div
        v-for="(person, index) in group"
        :key="index"
        class="avatar"
        :style="getAvatarStyle(groupIndex, index)"
      >
        <img :src="person.src" :alt="person.name" />
      </div>
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

    const groups = ref([
      Array.from({ length: 5 }, (_, i) => ({
        name: `组1-人员${i + 1}`,
        src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      })),
      Array.from({ length: 5 }, (_, i) => ({
        name: `组2-人员${i + 1}`,
        src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      })),
      Array.from({ length: 5 }, (_, i) => ({
        name: `组3-人员${i + 1}`,
        src: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
      })),
    ]);

    const angleShifts = ref(groups.value.map(() => 0)); // 每组的角度偏移
    const baseRadius = 100; // 最小半径
    const radiusIncrement = 50; // 半径增量
    const randomSizes = ref(groups.value.map(group => group.map(() => 30 + Math.random() * 40))); // 随机头像大小（范围30px到70px）

    const getAvatarStyle = (groupIndex, index) => {
      const totalAvatars = groups.value[groupIndex].length; // 当前组内成员数量
      const radius = baseRadius + groupIndex * radiusIncrement; // 当前组的半径
      const angle = (index * (2 * Math.PI)) / totalAvatars + angleShifts.value[groupIndex]; // 当前头像的角度

      const x = radius * Math.cos(angle); // 计算 x 坐标
      const y = radius * Math.sin(angle); // 计算 y 坐标

      const avatarSize = randomSizes.value[groupIndex][index]; // 获取随机大小

      console.log(angle,'angle----');
      

      return {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(${x}px, ${y}px)`,
        width: `${avatarSize}px`, // 应用随机大小
        height: `${avatarSize}px`, // 应用随机大小
      };
    };

    const updatePositions = () => {
      angleShifts.value = angleShifts.value.map((shift, index) => shift + (0.01 + index * 0.01)); // 增加每组的速度
      console.log(   angleShifts.value ,'   angleShifts.value ');
      
    };

    onMounted(() => {
      const interval = setInterval(updatePositions, 80); // 每100毫秒更新一次位置

      onBeforeUnmount(() => {
        clearInterval(interval); // 清理定时器
      });
    });

    return {
      centerPerson,
      groups,
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
  background-color: #ccc;
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

.avatar-group {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
