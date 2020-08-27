<template>
  <div class="p-livraison" :class="[!detailShowed && 'p-livraison--hidden']">
    <div class="p-livraison__resume" ref="resume">
      <h1>The resume</h1>
    </div>
    <div class="p-livraison__full" @click="showDetail">
      <img
        src="https://placehold.it/400x300"
        width="400"
        height="300"
        alt=""
        ref="image"
      />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        delectus dicta non animi quibusdam molestiae provident nostrum quis
        aperiam ipsa fugiat quisquam praesentium optio. Sapiente ducimus sed
        nobis numquam dolores?
      </p>

      <div
        class="p-livraison__card p-livraison__card--fixed"
        ref="card"
        @click.stop="hideDetail"
      >
        THE CARD (close)
      </div>

      <p>
        Distinctio ullam corporis incidunt quis sit sed tempore quibusdam
        excepturi enim, quod necessitatibus doloremque dolores dolorum, eius
        accusantium recusandae impedit maxime vero laudantium, ut ad ducimus vel
        hic. Consequatur, maiores!
      </p>
      <p>
        Voluptas laudantium qui culpa, porro laborum cupiditate ratione quisquam
        quam sunt. Delectus nostrum repellat ex fugit iusto, a quas provident
        tenetur nulla unde nisi omnis dolore obcaecati aliquam quibusdam
        perspiciatis.
      </p>
      <p>
        Odio laboriosam ut voluptas impedit similique vitae laudantium dolorum
        quis, ad nostrum repudiandae adipisci perferendis maiores explicabo
        voluptates nulla voluptatum ab, consectetur in dicta laborum? Qui
        eveniet eligendi vitae enim?
      </p>
      <p>
        Laborum molestiae voluptas ad excepturi quis nulla aliquid quia fuga
        optio rem debitis eos, nihil ducimus accusantium sit, numquam quos
        incidunt. Dolorum id iste laboriosam dolore ipsam rerum illum
        accusantium!
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import gsap from "gsap";

export default {
  data() {
    return {
      detailShowed: false,
      showTimeline: (null as unknown) as gsap.core.Timeline,
    };
  },
  mounted() {
    this.updatePostions();
    const el = this.$el as HTMLDivElement;
    const MAX_DISTANCE = 200

    el.addEventListener("touchstart", (e) => {
      const startX = e.changedTouches[0].screenX;
      const startY = e.changedTouches[0].screenY;

      const onTouchMouve = (e: TouchEvent) => {
        const move = {
          x: e.changedTouches[0].screenX - startX,
          y: e.changedTouches[0].screenY - startY,
        };

        if ((Math.abs(move.y) > 10 || Math.abs(move.x) > 10) && Math.abs(move.y) < Math.abs(move.x)) {
          el.removeEventListener("touchmove", onTouchMouve, true);
        }

        this.showTimeline.progress(move.y / MAX_DISTANCE)
      };
      el.addEventListener("touchmove", onTouchMouve, true);
    });
  },
  methods: {
    updatePostions() {
      const card: HTMLDivElement = this.$refs.card;
      const image: HTMLImageElement = this.$refs.image;
      const resume: HTMLDivElement = this.$refs.resume;

      // const top = image.getBoundingClientRect().top
      const top =
        (window.innerWidth * 3) / 4 +
        window.scrollY +
        image.getBoundingClientRect().top;
      const currentCardRect = card.getBoundingClientRect();
      const cardTranslateY =
        top - currentCardRect.top - currentCardRect.height / 2;

      resume.style.top = `${top}px`;
      card.style.transform = `translateY(${cardTranslateY}px)`;

      this.showTimeline = gsap
        .timeline({ defaults: { ease: "power1.inOut" }, paused: true })
        .call(() => {
          this.detailShowed = false;
        })
        .fromTo(card, { y: cardTranslateY }, { y: 0 }, "<")
        .fromTo(
          resume,
          { yPercent: 0 },
          { yPercent: 100, display: "none" },
          "<"
        )
        .call(() => {
          this.detailShowed = true;
        })
        .pause();
    },
    showDetail() {
      this.showTimeline.play();
    },
    hideDetail() {
      this.showTimeline.reverse();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_imports.scss";

$resume-top: 300px;

.p-livraison {
  &--hidden {
    height: 0;
    flex-grow: 1;
    flex-basis: 0;
    overflow: hidden;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  &__card {
    position: relative;
    z-index: 3;
    margin: 0 $gap;
    padding: space(4);
    border: solid 2px $grey;
    background: $white-ter;
    border-radius: $radius-large;
    text-align: center;
  }

  &__resume {
    position: absolute;
    z-index: 2;
    background: $white-ter;
    top: $resume-top;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: space(6) $gap;
  }
}
</style>
