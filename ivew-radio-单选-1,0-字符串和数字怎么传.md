---
title: "ivew-radio-单选-1,0-字符串和数字怎么传"
date: 2021-02-02
tags: 
- 开发日常
---
字符串,label不用加:
```
<template>
      <RadioGroup v-model="hasDelay">
              <Radio label=1>是</Radio>
              <Radio label=0>否</Radio>
     </RadioGroup>
</template>
<script>
    export default {
        watch: {
          hasDelay(v) {
            console.log(v)
          }
        },
        data () {
            return {
                hasDelay: '0'
            }
        }
    }
</script>

```
数字
```
<template>
      <RadioGroup v-model="hasDelay">
              <Radio :label=1>是</Radio>
              <Radio :label=0>否</Radio>
     </RadioGroup>
</template>
<script>
    export default {
        watch: {
          hasDelay(v) {
            console.log(v)
          }
        },
        data () {
            return {
                hasDelay: 0
            }
        }
    }
</script>

```
