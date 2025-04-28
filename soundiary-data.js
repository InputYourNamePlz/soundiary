// Soundiary 앱의 데이터
const appData = {
  "user": {
    "name": "Samuel",
    "profilePic": "img/kirby.jfif",
    "postCount": 32
  },
  "songs": [
    { 
      "id": 1, 
      "title": "I DO ME", 
      "artist": "KiiiKiii", 
      "albumUrl": "img/albums/idome.webp", 
      "thumbnailUrl": "img/albums/idome.webp" 
    },
    { 
      "id": 2, 
      "title": "You're so lonely now, so you need me back by your side again", 
      "artist": "Yerin Baek", 
      "albumUrl": "img/albums/hateyou.jpg", 
      "thumbnailUrl": "img/albums/hateyou.jpg" 
    },
    { 
      "id": 3, 
      "title": "The Chase", 
      "artist": "Hearts2Hearts", 
      "albumUrl": "img/albums/thechase.jpg", 
      "thumbnailUrl": "img/albums/thechase.jpg" 
    },
    { 
      "id": 4, 
      "title": "Die With A Smile", 
      "artist": "Lady GaGa, Bruno Mars", 
      "albumUrl": "img/albums/diewithasmile.jfif", 
      "thumbnailUrl": "img/albums/diewithasmile.jfif" 
    },
    { 
      "id": 5, 
      "title": "지구를 가졌어도", 
      "artist": "MRCH", 
      "albumUrl": "img/albums/earth.jpg", 
      "thumbnailUrl": "img/albums/earth.jpg" 
    },
    { 
      "id": 6, 
      "title": "삐그덕 (Walk)", 
      "artist": "NCT 127", 
      "albumUrl": "img/albums/walk.jpg", 
      "thumbnailUrl": "img/albums/walk.jpg" 
    },
    { 
      "id": 7, 
      "title": "Walk Like This", 
      "artist": "Flo", 
      "albumUrl": "img/albums/walklikethis.jpg", 
      "thumbnailUrl": "img/albums/walklikethis.jpg" 
    },
    { 
      "id": 8, 
      "title": "좋은 밤 좋은 꿈", 
      "artist": "Nerd Connection", 
      "albumUrl": "img/albums/dream.jpg", 
      "thumbnailUrl": "img/albums/dream.jpg" 
    },
    { 
      "id": 9, 
      "title": "High Hopes", 
      "artist": "Panic! At The Disco", 
      "albumUrl": "img/albums/highhopes.webp", 
      "thumbnailUrl": "img/albums/highhopes.webp" 
    },
    { 
      "id": 10, 
      "title": "LOVE ATTACK", 
      "artist": "RESCENE", 
      "albumUrl": "img/albums/love.jpg", 
      "thumbnailUrl": "img/albums/love.jpg" 
    },
    { 
      "id": 11, 
      "title": "HOT", 
      "artist": "LE SSERAFIM", 
      "albumUrl": "img/albums/hot.jpg", 
      "thumbnailUrl": "img/albums/hot.jpg" 
    }
  ],
  "feedEntries": [
    {
      "id": 1,
      "title": "Dolor sit amet",
      "date": "Today",
      "content": "Do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in",
      "songId": 1,
      "backgroundUrl": "img/albums/idome.webp"
    },
    {
      "id": 2,
      "title": "Sed ut perspiciatis",
      "date": "Yesterday",
      "content": "Omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia",
      "songId": 2,
      "backgroundUrl": "img/albums/hateyou.jpg"
    },
    {
      "id": 3,
      "title": "Adipisci velit",
      "date": "3 days ago",
      "content": "Quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
      "songId": 3,
      "backgroundUrl": "img/albums/thechase.jpg"
    },
    {
      "id": 4,
      "title": "Ut enim ad minima",
      "date": "4월 19일",
      "content": "Nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate",
      "songId": 4,
      "backgroundUrl": "img/albums/diewithasmile.jfif"
    },
    // 과거 메모리 테스트용 항목 추가 (오늘 날짜의 1년 전 엔트리)
    {
      "id": 5,
      "title": "On this day last year",
      "date": "4월 29일", // 현재 날짜와 같은 월/일 (의도적으로 추가된 데이터)
      "content": "This is a memory from exactly one year ago. Perfect for testing the 'On This Day' feature that shows memories from the past on the same calendar date.",
      "songId": 5,
      "backgroundUrl": "img/albums/earth.jpg"
    },
    // 노래별 다이어리 테스트용 항목 추가
    {
      "id": 6,
      "title": "Same song different day",
      "date": "2월 15일",
      "content": "Another diary entry with the same song to test showing multiple diaries for a single song. This should appear when viewing diaries for this particular song.",
      "songId": 5, // 위와 동일한 노래 ID
      "backgroundUrl": "img/albums/earth.jpg"
    }
  ],
  "playlists": [
    {
      "id": 1,
      "title": "Memories",
      "count": 4,
      "imageUrl": "https://picsum.photos/120/120",
      "type": "my",
      "songs": [1, 3, 5, 8]
    },
    {
      "id": 2,
      "title": "Drive BGM",
      "count": 4,
      "imageUrl": "https://picsum.photos/130/130",
      "type": "my",
      "songs": [4, 6, 9, 10]
    },
    {
      "id": 3,
      "title": "Working",
      "count": 3,
      "imageUrl": "https://picsum.photos/140/140",
      "type": "my",
      "songs": [2, 7, 11]
    },
    {
      "id": 4,
      "title": "Jisu's Favorite",
      "count": 4,
      "imageUrl": "https://picsum.photos/150/150",
      "type": "friend",
      "songs": [4, 5, 8, 9]
    },
    {
      "id": 5,
      "title": "Chulsu's Ballade",
      "count": 2,
      "imageUrl": "https://picsum.photos/160/160",
      "type": "friend",
      "songs": [3, 7]
    },
    {
      "id": 6,
      "title": "Nayeon's K-Pop",
      "count": 4,
      "imageUrl": "https://picsum.photos/170/170",
      "type": "friend",
      "songs": [1, 2, 4, 6]
    }
  ],
  "recentDiarySongs": [6, 7, 8, 9, 10],
  "calendar": {
    "year": 2025,
    "month": 4,
    "daysWithEntries": [4, 6, 11, 14, 19, 27, 29], // 29일 추가 (메모리 테스트용)
    "activeDay": 29 // 오늘(29일)로 변경
  }
};