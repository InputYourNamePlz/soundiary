// 전역 변수 선언 
let currentTab = 'write-tab';  // 현재 활성 탭
let isWriteMode = false;  // 글쓰기 모드 상태
let isPlaying = false;  // 음악 재생 상태
let miniPlayerActive = false;  // 미니 플레이어 활성 상태
let selectedSong = null;  // 현재 선택된 노래
let selectedSongForPlaylist = null; // 플레이리스트에 추가할 노래 (새로 추가)

// 앱 초기화 함수
function initApp() {
    try {
        // 앱 콘텐츠 초기화
        setupTabNavigation();
        setupSearchFunctionality();
        renderFeedEntries();
        renderPlaylists();
        renderRecentSongs();
        renderUserProfile();
        renderCalendar();
        renderMemories(); // 새 함수 추가
        
        // 첫 번째 탭 활성화 및 검색 결과 렌더링
        document.getElementById(currentTab).classList.add('active');
        document.querySelector(`.tab[data-tab="${currentTab}"]`).classList.add('active');
        renderSearchResults(); // Render music list immediately
        
        // 이벤트 리스너 설정
        setupEventListeners();
        
        console.log('앱 초기화 완료');
    } catch (error) {
        console.error('앱 초기화 오류:', error);
    }
}

// 탭 네비게이션 설정
function setupTabNavigation() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            changeTab(tabId);
        });
    });
}

// 탭 변경 함수
function changeTab(tabId) {
    // 이전 탭 비활성화
    document.getElementById(currentTab).classList.remove('active');
    document.querySelector(`.tab[data-tab="${currentTab}"]`).classList.remove('active');
    
    // 새 탭 활성화
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.tab[data-tab="${tabId}"]`).classList.add('active');
    
    // 글쓰기 탭이 활성화될 때 검색 결과 렌더링
    if (tabId === 'write-tab') {
        renderSearchResults();
    }
    
    currentTab = tabId;
}

// 검색 기능 설정
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    
    // 검색어 입력 이벤트
    searchInput.addEventListener('input', () => {
        renderSearchResults(searchInput.value);
    });
}

// 검색 결과 렌더링
function renderSearchResults(query = '') {
    const searchResults = document.querySelector('.search-results');
    
    // 검색 결과 초기화
    searchResults.innerHTML = '';
    
    // 검색어에 따라 필터링
    let filteredSongs = appData.songs;
    if (query) {
        query = query.toLowerCase();
        filteredSongs = appData.songs.filter(song => 
            song.title.toLowerCase().includes(query) || 
            song.artist.toLowerCase().includes(query)
        );
    }
    
    // 검색 결과 렌더링
    filteredSongs.forEach(song => {
        const searchItem = document.createElement('div');
        searchItem.className = 'search-item';
        searchItem.innerHTML = `
            <img src="${song.thumbnailUrl}" alt="Album Art">
            <div class="search-item-details">
                <div class="search-item-title">${song.title}</div>
                <div class="search-item-artist">${song.artist}</div>
            </div>
        `;
        searchItem.addEventListener('click', () => selectSong(song.id));
        searchResults.appendChild(searchItem);
    });
}

// 노래 선택 함수
function selectSong(songId) {
    // 선택한 노래 찾기
    selectedSong = appData.songs.find(song => song.id === songId);
    if (!selectedSong) return;
    
    // 로딩 표시
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    
    // 검색 컨테이너 숨기기
    document.querySelector('.search-container').style.display = 'none';
    
    // 1초 후 쓰기 컨테이너 표시 (로딩 시뮬레이션)
    setTimeout(() => {
        loader.style.display = 'none';
        const writeContainer = document.querySelector('.write-container');
        writeContainer.style.display = 'flex';
        
        // 선택한 노래 정보 설정
        document.querySelector('.album-art').style.backgroundImage = `url('${selectedSong.albumUrl}')`;
        document.querySelector('.music-title').textContent = selectedSong.title;
        document.querySelector('.music-artist').textContent = selectedSong.artist;
        
        isWriteMode = true;
    }, 1000);
}

// 재생/일시정지 토글 함수
function togglePlay() {
    const playPauseBtn = document.querySelector('.play-pause i');
    const albumArt = document.querySelector('.album-art');
    
    if (isPlaying) {
        playPauseBtn.className = 'fas fa-play';
        albumArt.classList.remove('playing');
    } else {
        playPauseBtn.className = 'fas fa-pause';
        albumArt.classList.add('playing');
        
        // 미니 플레이어 활성화
        activateMiniPlayer(selectedSong);
    }
    
    isPlaying = !isPlaying;
}

// 미니 플레이어 활성화 함수
function activateMiniPlayer(song) {
    if (!song) return;
    
    const miniPlayer = document.querySelector('.mini-player');
    const miniPlayerTitle = document.querySelector('.mini-player-title');
    const miniPlayerArtist = document.querySelector('.mini-player-artist');
    const miniPlayerImg = document.querySelector('.mini-player img');
    
    miniPlayerTitle.textContent = song.title;
    miniPlayerArtist.textContent = song.artist;
    miniPlayerImg.src = song.thumbnailUrl;
    
    miniPlayer.classList.add('active');
    miniPlayerActive = true;
}

// 피드 항목 렌더링
// 피드 항목 렌더링 함수 수정
function renderFeedEntries() {
    const feedEntriesContainer = document.getElementById('feed-entries');
    feedEntriesContainer.innerHTML = '';
    
    appData.feedEntries.forEach(entry => {
        // 관련 노래 찾기
        const song = appData.songs.find(s => s.id === entry.songId);
        if (!song) return;
        
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.innerHTML = `
            <div class="feed-item-bg" style="background-image: url('${entry.backgroundUrl}');"></div>
            <div class="feed-item-content">
                <div class="feed-item-header">
                    <div class="feed-item-title">${entry.title}</div>
                    <div class="feed-item-date">${entry.date}</div>
                </div>
                <div class="feed-item-music">
                    <img src="${song.thumbnailUrl}" alt="Album">
                    <div class="feed-item-music-info">
                        <div class="feed-item-music-title">${song.title}</div>
                        <div class="feed-item-music-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="feed-item-preview">${entry.content}</div>
            </div>
        `;
        feedEntriesContainer.appendChild(feedItem);
    });
}

// 플레이리스트 렌더링
function renderPlaylists() {
    const myPlaylistsContainer = document.getElementById('my-playlists');
    const friendPlaylistsContainer = document.getElementById('friend-playlists');
    
    // 내 플레이리스트와 친구 플레이리스트 필터링
    const myPlaylists = appData.playlists.filter(playlist => playlist.type === 'my');
    const friendPlaylists = appData.playlists.filter(playlist => playlist.type === 'friend');
    
    // 내 플레이리스트 렌더링
    myPlaylistsContainer.innerHTML = '';
    myPlaylists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.innerHTML = `
            <img src="${playlist.imageUrl}" alt="Playlist">
            <div class="playlist-item-title">${playlist.title}</div>
            <div class="playlist-item-count">${playlist.count} tracks</div>
        `;
        myPlaylistsContainer.appendChild(playlistItem);
    });
    
    // 친구 플레이리스트 렌더링
    friendPlaylistsContainer.innerHTML = '';
    friendPlaylists.forEach(playlist => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.innerHTML = `
            <img src="${playlist.imageUrl}" alt="Playlist">
            <div class="playlist-item-title">${playlist.title}</div>
            <div class="playlist-item-count">${playlist.count} tracks</div>
        `;
        friendPlaylistsContainer.appendChild(playlistItem);
    });
}

// 최근 일기 노래 렌더링
// 최근 일기 노래 렌더링 함수 수정
function renderRecentSongs() {
    const recentSongsContainer = document.getElementById('recent-diary-songs');
    recentSongsContainer.innerHTML = '';
    
    appData.recentDiarySongs.forEach((songId, index) => {
        const song = appData.songs.find(s => s.id === songId);
        if (!song) return;
        
        const trackItem = document.createElement('div');
        trackItem.className = 'track-item';
        trackItem.innerHTML = `
            <div class="track-number">${index + 1}</div>
            <img src="${song.thumbnailUrl}" alt="Album">
            <div class="track-info">
                <div class="track-title">${song.title}</div>
                <div class="track-artist">${song.artist}</div>
            </div>
            <div class="track-actions">
                <div class="track-action-btn view-diaries-btn" data-song-id="${song.id}">
                    <i class="fas fa-book"></i>
                </div>
                <div class="track-action-btn add-to-playlist-btn" data-song-id="${song.id}">
                    <i class="fas fa-plus"></i>
                </div>
                <div class="track-action-btn">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
            </div>
        `;
        
        // 노래 클릭 이벤트 - 재생
        trackItem.querySelector('img').addEventListener('click', () => playTrack(song));
        trackItem.querySelector('.track-info').addEventListener('click', () => playTrack(song));
        
        // 다이어리 보기 버튼 이벤트
        trackItem.querySelector('.view-diaries-btn').addEventListener('click', () => showSongDiaries(song.id));
        
        // 플레이리스트에 추가 버튼 이벤트
        trackItem.querySelector('.add-to-playlist-btn').addEventListener('click', () => openPlaylistModal(song.id));
        
        recentSongsContainer.appendChild(trackItem);
    });
}

// 트랙 재생 함수
function playTrack(song) {
    selectedSong = song;
    activateMiniPlayer(song);
    
    // 재생 상태로 변경
    const miniPlayerBtn = document.querySelector('.mini-player-btn i');
    miniPlayerBtn.className = 'fas fa-pause';
    isPlaying = true;
}

// 사용자 프로필 렌더링
function renderUserProfile() {
    document.querySelector('.profile-pic').style.backgroundImage = `url('${appData.user.profilePic}')`;
    document.querySelector('.profile-name').textContent = appData.user.name;
    document.querySelector('.profile-posts').textContent = `${appData.user.postCount} Posts`;
}

// 달력 렌더링
function renderCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    const weekdays = calendarGrid.querySelectorAll('.weekday');
    const calendarTitle = document.querySelector('.calendar-title');
    
    // 달력 제목 설정
    calendarTitle.textContent = `${appData.calendar.year} / ${appData.calendar.month}`;
    
    // 이전 날짜 요소 제거 (요일 헤더는 유지)
    const days = calendarGrid.querySelectorAll('.day');
    days.forEach(day => day.remove());
    
    // 월의 첫 날과 마지막 날 구하기
    const firstDay = new Date(appData.calendar.year, appData.calendar.month - 1, 1);
    const lastDay = new Date(appData.calendar.year, appData.calendar.month, 0);
    
    // 첫 날의 요일 (0: 일요일, 6: 토요일)
    const firstDayOfWeek = firstDay.getDay();
    
    // 빈 칸 추가 (월의 첫 날 이전)
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'day empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    // 날짜 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = i;
        
        // 해당 날짜에 일기가 있는지 실제로 확인
        // 날짜 문자열 형식: "4월 19일" 형태로 만들기
        const dateString = `${appData.calendar.month}월 ${i}일`;
        
        // 해당 날짜의 일기 찾기
        const hasEntry = appData.feedEntries.some(entry => {
            // 정확한 날짜 비교 (정규식 사용)
            const dateMatch = entry.date.match(/(\d+)월 (\d+)일/);
            if (dateMatch) {
                const entryMonth = parseInt(dateMatch[1]);
                const entryDay = parseInt(dateMatch[2]);
                return entryMonth === appData.calendar.month && entryDay === i;
            }
            return false;
        });
        
        // 게시물 있는 날짜 표시 (실제 데이터 기반)
        if (hasEntry) {
            dayElement.classList.add('has-entry');
        }
        
        // 활성 날짜 표시
        if (i === appData.calendar.activeDay) {
            dayElement.classList.add('active');
        }
        
        // 날짜 클릭 이벤트
        dayElement.addEventListener('click', () => {
            // 이전 활성화된 날짜 비활성화
            const activeDay = document.querySelector('.day.active');
            if (activeDay) {
                activeDay.classList.remove('active');
            }
            // 클릭한 날짜 활성화
            dayElement.classList.add('active');
            
            // 해당 날짜의 일기 표시
            showDayEntries(i);
        });
        
        calendarGrid.appendChild(dayElement);
    }
}

// 날짜별 일기 표시
function showDayEntries(day) {
    const myEntries = document.querySelector('.my-entries');
    myEntries.innerHTML = '';
    
    // 선택한 날짜에 해당하는 일기 찾기
    const dayEntry = appData.feedEntries.find(entry => entry.date.includes(`${appData.calendar.month}월 ${day}일`));
    
    if (dayEntry) {
        const song = appData.songs.find(s => s.id === dayEntry.songId);
        if (!song) return;
        
        const entryElement = document.createElement('div');
        entryElement.className = 'feed-item';
        entryElement.innerHTML = `
            <div class="feed-item-bg" style="background-image: url('${dayEntry.backgroundUrl}');"></div>
            <div class="feed-item-content">
                <div class="feed-item-header">
                    <div class="feed-item-title">${dayEntry.title}</div>
                    <div class="feed-item-date">${dayEntry.date}</div>
                </div>
                <div class="feed-item-music">
                    <img src="${song.thumbnailUrl}" alt="Album">
                    <div class="feed-item-music-info">
                        <div class="feed-item-music-title">${song.title}</div>
                        <div class="feed-item-music-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="feed-item-preview">${dayEntry.content}</div>
            </div>
        `;
        myEntries.appendChild(entryElement);
    } else {
        // 일기가, 없는 경우 메시지 표시
        myEntries.innerHTML = '<p style="text-align: center; color: #888;">No diary for this date :(</p>';
    }
}

// 일기 게시 함수
function postDiary() {
    const diaryTitle = document.querySelector('.diary-title').value;
    const diaryContent = document.querySelector('.diary-content').value;
    
    // 입력 검증
    if (!diaryTitle || !diaryContent || !selectedSong) {
        alert('Please fill all the blanks.');
        return;
    }
    
    // 로딩 표시
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';
    
    // 글쓰기 컨테이너 숨기기
    document.querySelector('.write-container').style.display = 'none';
    
    // 1초 후 검색 컨테이너로 돌아가기 (로딩 시뮬레이션)
    setTimeout(() => {
        loader.style.display = 'none';
        document.querySelector('.search-container').style.display = 'block';
        
        // 새 게시물 생성 (실제 저장은 되지 않음, 데모용)
        const newEntry = {
            id: appData.feedEntries.length + 1,
            title: diaryTitle,
            date: '오늘',
            content: diaryContent,
            songId: selectedSong.id,
            backgroundUrl: '/api/placeholder/400/200'
        };
        
        // 게시물 목록 업데이트 (임시)
        appData.feedEntries.unshift(newEntry);
        
        // 피드 다시 렌더링
        renderFeedEntries();
        
        // 입력 필드 초기화
        document.querySelector('.diary-title').value = '';
        document.querySelector('.diary-content').value = '';
        
        // 알림 표시
        alert('Diary has been submitted!');
        
        // 피드 탭으로 이동
        changeTab('feed-tab');
        
        isWriteMode = false;
    }, 1000);
}

// 노래별 다이어리 표시 함수 (새 함수)
function showSongDiaries(songId) {
    const songDiariesSection = document.getElementById('song-diaries-section');
    const songDiariesContainer = document.getElementById('song-diaries-container');
    songDiariesContainer.innerHTML = '';
    
    // 노래 정보 가져오기
    const song = appData.songs.find(s => s.id === songId);
    if (!song) return;
    
    // 해당 노래로 작성된 다이어리 찾기
    const relatedEntries = appData.feedEntries.filter(entry => entry.songId === songId);
    
    // 노래 제목 표시 (수정된 HTML 구조)
    const songHeader = document.createElement('div');
    songHeader.className = 'song-header';
    songHeader.innerHTML = `
        <div class="song-header-content">
            <img src="${song.thumbnailUrl}" alt="Album" class="song-header-img">
            <div class="song-header-info">
                <div class="song-header-title">${song.title}</div>
                <div class="song-header-artist">${song.artist}</div>
                <div class="song-header-entries">${relatedEntries.length} diaries</div>
            </div>
        </div>
    `;
    songDiariesContainer.appendChild(songHeader);
    
    // 관련 다이어리 표시
    if (relatedEntries.length > 0) {
        relatedEntries.forEach(entry => {
            const diaryItem = document.createElement('div');
            diaryItem.className = 'feed-item';
            diaryItem.innerHTML = `
                <div class="feed-item-bg" style="background-image: url('${entry.backgroundUrl}');"></div>
                <div class="feed-item-content">
                    <div class="feed-item-header">
                        <div class="feed-item-title">${entry.title}</div>
                        <div class="feed-item-date">${entry.date}</div>
                    </div>
                    <div class="feed-item-preview">${entry.content}</div>
                </div>
            `;
            songDiariesContainer.appendChild(diaryItem);
        });
    } else {
        // 관련 다이어리가 없을 경우
        const noDiaries = document.createElement('div');
        noDiaries.innerHTML = '<p style="text-align: center; color: #888; margin-top: 20px;">No diaries with this song yet.</p>';
        songDiariesContainer.appendChild(noDiaries);
    }
    
    // 섹션 표시
    songDiariesSection.classList.add('active');
    
    // 닫기 버튼 이벤트 연결
    document.querySelector('.close-song-diaries').addEventListener('click', () => {
        songDiariesSection.classList.remove('active');
    });
}

// 플레이리스트 모달 열기 함수 (새 함수)
function openPlaylistModal(songId) {
    selectedSongForPlaylist = songId;
    const playlistModal = document.getElementById('playlist-modal');
    const playlistOptions = document.getElementById('playlist-options');
    playlistOptions.innerHTML = '';
    
    // 내 플레이리스트 목록 가져오기
    const myPlaylists = appData.playlists.filter(playlist => playlist.type === 'my');
    
    // 플레이리스트 옵션 생성
    myPlaylists.forEach(playlist => {
        const option = document.createElement('div');
        option.className = 'playlist-option';
        option.innerHTML = `
            <img src="${playlist.imageUrl}" alt="Playlist">
            <div class="playlist-option-info">
                <div class="playlist-option-title">${playlist.title}</div>
                <div class="playlist-option-count">${playlist.count} tracks</div>
            </div>
        `;
        
        // 플레이리스트 선택 이벤트
        option.addEventListener('click', () => addToPlaylist(playlist.id, selectedSongForPlaylist));
        
        playlistOptions.appendChild(option);
    });
    
    // 모달 표시
    playlistModal.classList.add('active');
    
    // 모달 닫기 버튼 이벤트
    document.querySelector('.modal-close').addEventListener('click', () => {
        playlistModal.classList.remove('active');
    });
}

// 플레이리스트에 노래 추가 함수 (새 함수)
function addToPlaylist(playlistId, songId) {
    const playlist = appData.playlists.find(p => p.id === playlistId);
    if (!playlist) return;
    
    // 이미 플레이리스트에 있는지 확인
    if (playlist.songs.includes(songId)) {
        showNotification('Song already in playlist');
    } else {
        // 플레이리스트에 노래 추가
        playlist.songs.push(songId);
        playlist.count = playlist.songs.length;
        
        // 알림 표시
        showNotification('Added to playlist');
        
        // 플레이리스트 다시 렌더링
        renderPlaylists();
    }
    
    // 모달 닫기
    document.getElementById('playlist-modal').classList.remove('active');
}

// 알림 표시 함수 (새 함수)
function showNotification(message) {
    // 알림 요소 찾기
    let notification = document.querySelector('.success-notification');
    
    if (!notification) {
        // 기존 코드: document.body에 추가
        // notification = document.createElement('div');
        // notification.className = 'success-notification';
        // document.body.appendChild(notification);
        
        // 수정된 코드: 이미 HTML에 요소가 있으므로 찾아서 사용
        notification = document.querySelector('.success-notification');
        if (!notification) {
            console.error('Success notification element not found');
            return;
        }
    }
    
    notification.textContent = message;
    notification.style.display = 'block';
    
    // 2초 후 숨기기
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// 메모리 렌더링 함수 (새 함수)
function renderMemories() {
    const memoriesContainer = document.getElementById('memories-container');
    memoriesContainer.innerHTML = '';
    
    // 현재 날짜
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    
    // "이날"에 해당하는 과거 다이어리 찾기 (월/일이 일치하는 항목)
    const memories = [];
    
    appData.feedEntries.forEach(entry => {
        // 날짜 문자열에서 월과 일 추출 (예: "4월 19일"에서 4와 19 추출)
        const dateMatch = entry.date.match(/(\d+)월 (\d+)일/);
        
        if (dateMatch) {
            const entryMonth = parseInt(dateMatch[1]);
            const entryDay = parseInt(dateMatch[2]);
            
            // 현재 날짜와 월/일이 같으면서 오늘이 아닌 항목
            if (entryMonth === currentMonth && entryDay === currentDay && entry.date !== 'Today') {
                memories.push(entry);
            }
        }
    });
    
    // 메모리 항목 렌더링
    if (memories.length > 0) {
        memories.forEach(memory => {
            const song = appData.songs.find(s => s.id === memory.songId);
            if (!song) return;
            
            const memoryItem = document.createElement('div');
            memoryItem.className = 'memory-item';
            memoryItem.innerHTML = `
                <div class="memory-date">${memory.date}</div>
                <div class="feed-item-title">${memory.title}</div>
                <div class="feed-item-music">
                    <img src="${song.thumbnailUrl}" alt="Album">
                    <div class="feed-item-music-info">
                        <div class="feed-item-music-title">${song.title}</div>
                        <div class="feed-item-music-artist">${song.artist}</div>
                    </div>
                </div>
                <div class="feed-item-preview">${memory.content.substring(0, 80)}...</div>
            `;
            memoriesContainer.appendChild(memoryItem);
        });
    } else {
        // 메모리가 없는 경우
        memoriesContainer.innerHTML = '<p style="text-align: center; color: #888;">No memories for today.</p>';
    }
}

// 이벤트 리스너 설정 함수 수정
function setupEventListeners() {
    // 기존 이벤트 리스너 유지
    const playPauseBtn = document.querySelector('.play-pause');
    playPauseBtn.addEventListener('click', togglePlay);
    
    const postBtn = document.querySelector('.post-btn');
    postBtn.addEventListener('click', postDiary);
    
    const miniPlayerPlayBtn = document.querySelector('.mini-player-btn');
    miniPlayerPlayBtn.addEventListener('click', () => {
        const miniPlayerIcon = miniPlayerPlayBtn.querySelector('i');
        if (miniPlayerIcon.classList.contains('fa-pause')) {
            miniPlayerIcon.className = 'fas fa-play';
        } else {
            miniPlayerIcon.className = 'fas fa-pause';
        }
    });
    
    // 모달 외부 클릭 시 닫기
    document.getElementById('playlist-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('playlist-modal')) {
            document.getElementById('playlist-modal').classList.remove('active');
        }
    });
}

// 앱 초기화 실행
document.addEventListener('DOMContentLoaded', initApp);

