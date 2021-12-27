<template>
  <div id="bg">
    <div class="display-box">
      <div class="banner">
        <div class="figure">
          <div class="banner-img"></div>
          <div class="shadow" />
        </div>
        <div class="title">
          <h1 class="frontpage_title">News Today</h1>
          <p>
            {{
              new Date()
                .toLocaleDateString()
                .replace("/", "年")
                .replace("/", "月") + "日"
            }}
          </p>
        </div>
      </div>
      <div class="container">
        <div class="nav-box">
          <NewsNavigator
            v-for="(item, i) in newsItems"
            :news="item"
            @click="selectNewsType(item)"
          />
        </div>
        <div class="news-box">
          <router-view />
        </div>
        <div class="bottom-line">
          ———————————————— 到底啦！ ————————————————
        </div>
      </div>
    </div>
    <div class="header">
      <LoginDialog></LoginDialog>
    </div>
  </div>
</template>

<script>
import NewsNavigator from "./NewsNavigator.vue";
import NewsList from "./NewsList.vue";
import LoginDialog from "../components/loginDialog.vue";

export default {
  name: "Home",
  components: { NewsNavigator, NewsList, LoginDialog },
  data() {
    const newsItems = [
      { text: "推荐", active: true, icon: "all.png", tag: "__all__" },
      { text: "热点", active: false, icon: "hot.png", tag: "news_hot" },
      {
        text: "社会",
        active: false,
        icon: "society.png",
        tag: "news_society",
      },
      {
        text: "娱乐",
        active: false,
        icon: "entertainment.png",
        tag: "news_entertainment",
      },
      { text: "科技", active: false, icon: "tech.png", tag: "news_tech" },
      {
        text: "军事",
        active: false,
        icon: "military.png",
        tag: "news_military",
      },
      { text: "体育", active: false, icon: "sports.png", tag: "news_sports" },
      { text: "汽车", active: false, icon: "car.png", tag: "news_car" },
      {
        text: "财经",
        active: false,
        icon: "finance.png",
        tag: "news_finance",
      },
      { text: "国际", active: false, icon: "world.png", tag: "news_world" },
      {
        text: "时尚",
        active: false,
        icon: "fashion.png",
        tag: "news_fashion",
      },
      { text: "旅游", active: false, icon: "travel.png", tag: "news_travel" },
      {
        text: "探索",
        active: false,
        icon: "discovery.png",
        tag: "news_discovery",
      },
      { text: "育儿", active: false, icon: "baby.png", tag: "news_baby" },
      {
        text: "养生",
        active: false,
        icon: "regimen.png",
        tag: "news_regimen",
      },
      { text: "故事", active: false, icon: "story.png", tag: "news_story" },
      { text: "美文", active: false, icon: "essay.png", tag: "news_essay" },
      { text: "游戏", active: false, icon: "game.png", tag: "news_game" },
      {
        text: "历史",
        active: false,
        icon: "history.png",
        tag: "news_history",
      },
      { text: "美食", active: false, icon: "food.png", tag: "news_food" },
    ];
    return {
      newsItems,
    };
  },
  methods: {
    selectNewsType(item) {
      this.newsItems.forEach((item) => {
        item.active = false;
      });
      item.active = !item.active;
      this.$router.push({ name: "NewsList", params: { tag: item.tag } });
    },
  },
  mounted() {
    console.log("mounted", this);
    this.$vuetify.theme.themes.light.primary = "red";
  },
};
</script>

<style scoped>
@import url("https://fonts.font.im/css?family=Abril+Fatface");
/* 背景 */
#bg {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background: rgb(255, 228, 249);
  background: linear-gradient(
    -45deg,
    rgba(255, 228, 249, 0.8) 0%,
    rgba(205, 217, 252, 0.8) 100%
  );
}
.frontpage_title {
  letter-spacing: 0.05em;
  font-family: "Abril Fatface", cursive;
}
.display-box {
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.header {
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 10px 10px 0 0;
}
.banner {
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.figure {
  width: 25vh;
  height: 25vh;
  position: relative;
}
.banner-img {
  width: 25vh;
  height: 25vh;
  position: absolute;
  left: 0px;
  /* display: flex; */
  background-image: url("../assets/news-bg-day.png");
  background-size: contain;
  border: transparent;
  animation: updown 2s linear infinite;
}
@keyframes updown {
  0%,
  100% {
    margin-top: 0rem;
  }
  50% {
    margin-top: -1rem;
  }
}
.shadow {
  height: 1.8vh;
  width: 10vh;
  background-color: rgb(184, 183, 183);
  border-radius: 100%;
  position: absolute;
  bottom: 0.5vh;
  left: 50%;
  animation: scaling 2s infinite;
}
@keyframes scaling {
  0%,
  100% {
    transform: translateX(-50%) scale(1);
  }
  50% {
    transform: translateX(-50%) scale(0.8);
  }
}
.title {
  color: rgb(100, 126, 243);
  font-weight: 500;
}

.container {
  width: 70%;
  min-height: 75vh;
  background: rgb(255, 255, 255);
  background: rgb(255, 255, 255);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.4) 100%
  );
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px 30px 0 0;
}
.nav-box {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.news-box {
  width: 100%;
}
.bottom-line {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  text-align: center;
  color: gray;
}
</style>
