// ==========================================
// 1. DỮ LIỆU KỶ NIỆM VÀ LỜI CHÚC (Sửa chữ ở đây)
// ==========================================
const memories = [
    { img: "./style/img/Anh (1).jpg", msg: "Chào một buổi sáng mai của 1 tuổi cấp 3 tuyệt đẹp..." },
    { img: "./style/img/Anh (2).jpg", msg: "Lúc đó, chẳng ai ngờ rằng tình bạn ta kéo dài đến thế." },
    { img: "./style/img/Anh (3).jpg", msg: "Chào Kiều My, canh sát giờ đi học dữ ta." },
    { img: "./style/img/Anh (4).jpg", msg: "Thế là những tiết học kèm bao nhiêu câu chuyện hạt nhài bắt đầu." },
    { img: "./style/img/Anh (5).jpg", msg: "Những tiết học những tờ phao cùng những kỉ niệm theo ta trôi đi mất." },
    { img: "./style/img/Anh (6).jpg", msg: "Nhớ không những lúc này ấy, tui gánh bạn riết cũng quen rồi" },
    { img: "./style/img/Anh (7).jpg", msg: "Tiếc là trôi qua nhanh quá, bao nhiêu chuyện chưa kể bạn nghe." },
    { img: "./style/img/Anh (8).jpg", msg: "Cũng là những lúc bạn chia tay là lại tìm đến tui ha" },
    { img: "./style/img/Anh (9).jpg", msg: "Nhiều khi thấy bạn buồn bạn khóc ròi Thắng cũng sót hihi" },
    { img: "./style/img/Anh (10).jpg", msg: "Và ròi cho đến nay cũng là những câu chuyện hạt nhài vẫn tiếp diễn ha" }
];

const wishes = [
    { img: "./style/img/Anh (1).jpg", msg: "Chúc Kiều My mãi vui tươi và ngập tràn tiếng cười." },
    { img: "./style/img/Anh (2).jpg", msg: "Cảm ơn vì đã mang cho Thắng những tiếng cười hạt nhài." },
    { img: "./style/img/Anh (3).jpg", msg: "Chúc Kiều My luôn xinh đẹp, rạng rỡ và giữ mãi nụ cười tỏa nắng trên môi." },
    { img: "./style/img/Anh (4).jpg", msg: "Dù có chuyện gì xảy ra, thì vẫn luôn có Thắng nói chuyện tâm sự với bạn" },
    { img: "./style/img/Anh (5).jpg", msg: "Mong con đường sau này sẽ nhẹ nhàng đối với bạn." },
    { img: "./style/img/Anh (6).jpg", msg: "Mong rằng mọi điều tốt đẹp nhất trên thế gian này sẽ đến với Kiều My" },
    { img: "./style/img/Anh (7).jpg", msg: "Cảm ơn vì những ngày tháng đã qua" },
    { img: "./style/img/Anh (8).jpg", msg: "Chúc bạn bình an còn những việc khác sau này sẽ có một bờ vai vững chắc lo cho bạn" },
    { img: "./style/img/Anh (9).jpg", msg: "Mong Kiều My mãi xinh tươi rạng rỡ." },
    { img: "./style/img/Anh (10).jpg", msg: "Bái bai nhe, mong cậu luôn hạnh phúc ❤️" }
];

// ==========================================
// 2. BIẾN TOÀN CỤC & DOM ELEMENTS
// ==========================================
let currentMemoryIndex = 0; // Đếm số kỷ niệm đã xem
let currentSlideIndex = 0;  // Vị trí slide hiện tại
let isMusicPlaying = false; // Trạng thái nhạc nền
let typeWriterTimeout;      // Biến lưu timeout để dừng gõ chữ khi cần

// DOM Elements
const bgMusic = document.getElementById('bg-music');
const popSound = document.getElementById('pop-sound');
const bubblesContainer = document.getElementById('bubbles-container');
const screen1 = document.getElementById('screen-1');
const screen2 = document.getElementById('screen-2');
const memoryModal = document.getElementById('memory-modal');
const modalImg = document.getElementById('memory-img');
const modalText = document.getElementById('memory-text');
const closeModal = document.getElementById('close-modal');

// ==========================================
// 3. LOGIC HOẠT ĐỘNG: MÀN HÌNH BONG BÓNG
// ==========================================

// Hàm phát nhạc nền (Chỉ gọi khi user tương tác lần đầu do policy trình duyệt)
function playMusic() {
    if (!isMusicPlaying) {
        bgMusic.volume = 0.5; // Đặt âm lượng 50%
        bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay"));
        isMusicPlaying = true;
    }
}

// Tạo ngẫu nhiên các bong bóng
function createBubbles() {
    // Tạo bong bóng dựa trên số lượng kỷ niệm
    memories.forEach((_, index) => {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        
        // Random kích thước từ 60px đến 100px
        const size = Math.random() * 40 + 60; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        
        // Random vị trí xuất hiện (trục X)
        bubble.style.left = `${Math.random() * 80 + 10}vw`; 
        
        // Random thời gian bay và thời gian delay để bong bóng bay tự nhiên
        bubble.style.animationDuration = `${Math.random() * 5 + 8}s`; 
        bubble.style.animationDelay = `${Math.random() * 5}s`;

        // Sự kiện click bong bóng
        bubble.addEventListener('click', function() {
            playMusic();
            
            // Âm thanh nổ bóng
            popSound.currentTime = 0;
            popSound.play();
            
            // Hiệu ứng vỡ
            this.classList.add('popped');
            
            // Mở Modal Kỷ Niệm
            openMemoryModal();
        });

        bubblesContainer.appendChild(bubble);
    });
}

// Hàm gõ phím (Typewriter Effect)
function typeWriter(text, element, speed = 50) {
    element.innerHTML = "";
    let i = 0;
    clearTimeout(typeWriterTimeout);
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typeWriterTimeout = setTimeout(type, speed);
        }
    }
    type();
}

// Mở Modal Kỷ Niệm
function openMemoryModal() {
    // Nếu vẫn còn kỷ niệm
    if (currentMemoryIndex < memories.length) {
        const memory = memories[currentMemoryIndex];
        modalImg.src = memory.img;
        memoryModal.classList.remove('hidden');
        
        // Gọi hiệu ứng gõ phím
        typeWriter(memory.msg, modalText, 60);
    }
}

// Tắt Modal Kỷ Niệm
closeModal.addEventListener('click', () => {
    memoryModal.classList.add('hidden');
    clearTimeout(typeWriterTimeout);
    currentMemoryIndex++;

    // Chuyển màn 2 khi đã xem hết kỷ niệm
    if (currentMemoryIndex >= memories.length) {
        setTimeout(startScreen2, 800); // Đợi modal tắt hẳn rồi mới chuyển
    }
});

// ==========================================
// 4. LOGIC HOẠT ĐỘNG: MÀN HÌNH SLIDER 3D
// ==========================================
const sliderWrapper = document.getElementById('slider-wrapper');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

function startScreen2() {
    screen1.classList.remove('active');
    screen1.classList.add('hidden');
    
    setTimeout(() => {
        screen2.classList.remove('hidden');
        screen2.classList.add('active');
        buildSlider();
    }, 1000);
}

// Đổ dữ liệu vào Slider
function buildSlider() {
    sliderWrapper.innerHTML = ''; // Làm sạch
    
    // Thêm các thẻ slide lời chúc
    wishes.forEach((wish, index) => {
        const slide = document.createElement('div');
        slide.classList.add('slide', 'glass-effect');
        slide.innerHTML = `
            <img class="slide-img" src="${wish.img}" alt="Wish ${index + 1}">
            <div class="slide-text" id="wish-text-${index}"></div>
        `;
        sliderWrapper.appendChild(slide);
    });

    // Thêm thẻ slide cuối cùng (Nút xem lại)
    const endSlide = document.createElement('div');
    endSlide.classList.add('slide', 'glass-effect');
    endSlide.innerHTML = `
        <div class="reload-content" onclick="showConfirmModal()">
            <i class="fa-solid fa-rotate-right"></i>
            <h3 style="font-family: 'Pacifico', cursive;">Xem lại từ đầu nhé?</h3>
        </div>
    `;
    sliderWrapper.appendChild(endSlide);

    updateSlider();
}

// Cập nhật giao diện 3D và di chuyển Slider
function updateSlider() {
    const slides = document.querySelectorAll('.slide');
    if(slides.length === 0) return;

    // Kích thước của slide để di chuyển wrapper
    const slideWidth = slides[0].offsetWidth + 30; // 30 là 2 lần margin (15px * 2)
    const offset = -currentSlideIndex * slideWidth;
    
    // Đẩy slider ra giữa màn hình
    const centerOffset = (window.innerWidth / 2) - (slideWidth / 2);
    sliderWrapper.style.transform = `translateX(${offset + centerOffset}px)`;

    slides.forEach((slide, index) => {
        slide.classList.remove('active', 'prev', 'next');
        const textContainer = slide.querySelector('.slide-text');
        
        if (textContainer) {
            textContainer.innerHTML = ""; // Xóa chữ cũ
        }

        if (index === currentSlideIndex) {
            slide.classList.add('active');
            // Chạy hiệu ứng gõ phím cho slide hiện tại
            if(index < wishes.length) {
                setTimeout(() => {
                    typeWriter(wishes[index].msg, textContainer, 50);
                }, 500); // Đợi hiệu ứng trượt xong mới gõ
            }
        } else if (index < currentSlideIndex) {
            slide.classList.add('prev');
        } else {
            slide.classList.add('next');
        }
    });

    // Ẩn hiện nút điều hướng
    prevBtn.style.display = currentSlideIndex === 0 ? 'none' : 'block';
    nextBtn.style.display = currentSlideIndex === slides.length - 1 ? 'none' : 'block';
}

// Bắt sự kiện Click nút Next/Prev
nextBtn.addEventListener('click', () => {
    const totalSlides = wishes.length + 1; // Lời chúc + Nút kết
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateSlider();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateSlider();
    }
});

// Fix lỗi resize màn hình để Slider vẫn nằm giữa
window.addEventListener('resize', updateSlider);

// ==========================================
// 5. MODAL XÁC NHẬN (RELOAD PAGE)
// ==========================================
const confirmModal = document.getElementById('confirm-modal');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');

// Gắn biến global để xài inline function ở HTML (onclick)
window.showConfirmModal = function() {
    confirmModal.classList.remove('hidden');
}

btnYes.addEventListener('click', () => {
    window.location.reload(); // Tải lại trang web
});

btnNo.addEventListener('click', () => {
    confirmModal.classList.add('hidden'); // Ẩn modal xác nhận
});

// ==========================================
// KHỞI CHẠY CHƯƠNG TRÌNH KHI WEB LOAD XONG
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    createBubbles();
});