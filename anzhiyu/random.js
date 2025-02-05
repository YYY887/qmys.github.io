var posts=["2025/02/04/第二天/","2025/02/05/千木/","2025/02/05/前段界面/","2025/02/05/打游戏/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };