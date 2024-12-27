<template>
  <div class="container">
    <div v-for="(person, index) in people" :key="index" class="person" :style="getPersonStyle(person, index)">
      Person {{ index + 1 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const containerWidth = 500;
const containerHeight = 600;
const personCount = 13; // 池子中总人数
const centerX = containerWidth / 2 - 25; // 中心位置（考虑50px的宽度）
const centerY = containerHeight / 2 - 25; // 中心位置（考虑50px的高度）

const people = ref(generateRandomPeople(personCount)); // 生成初始人数
const speed = 1; // 移动速度
let currentCenterPersonIndex = -1; // 当前在中心位置的人的索引
let shouldStay = false; // 是否应该停留
let shouldFadeOut = false; // 是否应该淡出
let returnToLeft = false; // 是否应该从左侧返回

function generateRandomPeople(count) {
  const randomPeople = [];
  for (let i = 0; i < count; i++) {
    randomPeople.push(createRandomPerson());
  }
  return randomPeople;
}

// 创建随机人物的函数
function createRandomPerson() {
  return {
    x: Math.random() * (containerWidth - 50),
    y: Math.random() * (containerHeight - 50),
    targetX: Math.random() * (containerWidth - 50),
    targetY: Math.random() * (containerHeight - 50),
    opacity: 1,
    scale: 1,
    isAnimating: false,
    blur: 0, // 添加模糊属性
    color: getRandomColor(), // 添加随机颜色属性
  };
}

// 生成随机颜色的函数
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getPersonStyle(person, index) {
  return {
    left: person.x + 'px',
    top: person.y + 'px',
    opacity: person.opacity,
    transform: `scale(${person.scale})`,
    filter: `blur(${person.blur}px)`, // 模糊效果
    backgroundColor: person.color, // 使用随机颜色
    zIndex: (currentCenterPersonIndex === index) ? 10 : 1,
  };
}

function moveToTarget(person) {
  const dx = person.targetX - person.x;
  const dy = person.targetY - person.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 如果到达目标位置，重新设置目标位置
  if (distance < speed) {
    person.x = person.targetX;
    person.y = person.targetY;
    person.targetX = Math.random() * (containerWidth - 50);
    person.targetY = Math.random() * (containerHeight - 50);
  } else {
    // 计算新的位置
    person.x += (dx / distance) * speed;
    person.y += (dy / distance) * speed;
  }
}

function moveToCenter(person) {
  const dx = centerX - person.x;
  const dy = centerY - person.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // 计算新的位置
  if (distance > speed) {
    person.x += (dx / distance) * speed;
    person.y += (dy / distance) * speed;
  } else {
    person.x = centerX;
    person.y = centerY;
  }
}

function animateCenterPerson() {
  if (currentCenterPersonIndex === -1) {
    // 如果没有人在中心位置，选择一个人移动到中心
    currentCenterPersonIndex = Math.floor(Math.random() * personCount);
    people.value[currentCenterPersonIndex].targetX = centerX;
    people.value[currentCenterPersonIndex].targetY = centerY;
  } else {
    const centerPerson = people.value[currentCenterPersonIndex];
    if (centerPerson.x === centerX && centerPerson.y === centerY) {
      // 如果已经在中心位置，开始放大以及停留
      if (!shouldStay) {
        centerPerson.scale += 0.05; // 逐渐放大
        if (centerPerson.scale >= 3) {
          shouldStay = true; // 放大完成，开始停留
          setTimeout(() => {
            shouldFadeOut = true; // 开始消失
            setTimeout(() => {
              returnToLeft = true; // 开始从左侧回来
              centerPerson.x = -50; // 将人移动到左侧
              
              // 模糊和缩小效果
              let fadeOutInterval = setInterval(() => {
                centerPerson.opacity -= 0.02; // 逐渐消失
                centerPerson.scale -= 0.02; // 逐渐变小
                centerPerson.blur += 0.5; // 逐渐增加模糊

                if (centerPerson.opacity <= 0) {
                  centerPerson.opacity = 0; // 确保不小于0
                  clearInterval(fadeOutInterval); // 停止模糊更新

                  // 生成新的随机人物并替换掉消失的人
                  const newPerson = createRandomPerson();
                  newPerson.x = Math.random() * (containerWidth - 50); 
                  people.value[currentCenterPersonIndex] = newPerson;

                  // 选择下一个人作为中心人物
                  currentCenterPersonIndex = (currentCenterPersonIndex + 1) % personCount; // 确保当前索引加1循环
                  people.value[currentCenterPersonIndex].targetX = centerX;
                  people.value[currentCenterPersonIndex].targetY = centerY;
                  shouldStay = false; // 重置停留状态
                  shouldFadeOut = false; // 重置淡出状态
                  returnToLeft = false; // 重置返回状态
                }
              }, 16); // 约60帧
            }, 3000); // 停留3秒
          }, 3000); // 停留3秒
        }
      }
    }
  }
}

function updatePeople() {
  for (let i = 0; i < people.value.length; i++) {
    if (i === currentCenterPersonIndex) {
      if (returnToLeft) {
        // 处于从左侧返回状态，不需要正常移动
        const centerPerson = people.value[i];
        centerPerson.scale += 0.02; // 从左侧返回，逐渐变大
        if (centerPerson.scale >= 1) {
          centerPerson.scale = 1; // 恢复正常大小
          centerPerson.opacity = 1; // 恢复可见
          centerPerson.x = Math.random() * (containerWidth - 50); // 随机设置位置
          returnToLeft = false; // 结束返回状态
        }
      } else {
        moveToCenter(people.value[i]); // 中心位置的人移动到中心
      }
    } else {
      moveToTarget(people.value[i]); // 其他人随机移动
    }
  }
}

let interval;

onMounted(() => {
  interval = setInterval(() => {
    updatePeople();
    animateCenterPerson();
  }, 16); // 每16毫秒更新位置（约60帧）
});

onUnmounted(() => {
  clearInterval(interval); // 清理定时器
});
</script>

<style>
.container {
  position: relative;
  width: 500px;
  height: 600px;
  border: 1px solid #000;
  overflow: hidden;
}

.person {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: opacity 3s, transform 1s, filter 1s; /* 调整过渡时间 */
}
</style>
