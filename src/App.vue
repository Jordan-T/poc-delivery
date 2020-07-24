<template>
  <div class="l-base">
    <TheHeader class="l-base__header" />
    <main class="l-base__main">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis laborum illo dolore ipsa sit molestias voluptate blanditiis, qui excepturi inventore. Vel distinctio perferendis sint corporis provident ducimus soluta repellat consequatur?</p>
      <p>Quidem corrupti, voluptatibus magnam labore sed necessitatibus iste, sunt, ipsa ad voluptate eligendi. Magni, aspernatur! Assumenda quia eligendi, nesciunt possimus alias cumque quo magnam quod eaque vel obcaecati quis beatae.</p>
      <p>Ab neque iusto at exercitationem dignissimos suscipit debitis amet officia, in ullam aperiam tenetur dicta incidunt repudiandae, voluptas deserunt modi, quia quos ex temporibus accusantium. Cumque recusandae quisquam nesciunt aliquam.</p>
      <p>Dolor accusantium deserunt assumenda commodi beatae dolore aliquid, quae perferendis ea magni dicta cupiditate eum ipsum omnis voluptatum, quod facere. Molestiae ratione consequuntur aliquam minima illo placeat vel amet odit!</p>
      <p>Laudantium ipsum, minima blanditiis omnis nihil possimus facere fugit quam neque cumque necessitatibus voluptates praesentium assumenda quidem illum non eos similique? Odit, temporibus. Repellendus, suscipit? Cupiditate laborum explicabo numquam corporis!</p>
    </main>
    <TheStatusBar class="l-base__status" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TheHeader from './components/TheHeader.vue'
import TheStatusBar from './components/TheStatusBar.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    TheHeader,
    TheStatusBar,
  }
}
</script>

<style lang="scss">
@import "./assets/scss/_imports.scss";

.l-base {
  display: flex;
  flex-direction: column;
  height: 100vh;
  
  &__header,
  &__status {
    flex-shrink: 0;
    width: 100%;
    position: sticky;
    top: 0;
  }

  &__main {
    flex-grow: 1;
    padding: 0 space(4);
  }

  &__status {
    top: auto;
    bottom: 0;
    margin-top: space(4);
  }
}
</style>
