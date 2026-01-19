# 🍎 Ứng Dụng Học Tiếng Anh - English Learning App

Ứng dụng web học tiếng Anh đơn giản, thân thiện và dễ mở rộng cho trẻ em và người mới bắt đầu.

## ✨ Tính Năng

### 1. Chế Độ Học (Learning Mode)
- Hiển thị hình ảnh minh họa cho mỗi từ
- Từ tiếng Anh với kích thước lớn, dễ đọc
- Phiên âm tiếng Việt giúp phát âm đúng
- Nút Next/Prev để chuyển qua lại giữa các từ
- Hiển thị tiến trình (1/10, 2/10...)

### 2. Chế Độ Thực Hành (Practice Mode)
- Quiz tương tác với hình ảnh
- 4 lựa chọn ngẫu nhiên cho mỗi câu hỏi
- Phản hồi ngay lập tức (đúng/sai)
- Hệ thống tính điểm
- Tự động chuyển sang câu hỏi tiếp theo

### 3. Quản Lý Chủ Đề
- Menu chọn chủ đề ở góc trái trên
- Dễ dàng thêm chủ đề mới
- Mỗi chủ đề có dữ liệu riêng biệt

## 📁 Cấu Trúc Thư Mục

```
App tieng anh 2/
│
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── script.js           # File JavaScript logic
├── README.md           # File hướng dẫn này
│
└── topics/             # Thư mục chứa các chủ đề
    └── fruits/         # Chủ đề Trái cây
        ├── data.json   # Dữ liệu các từ vựng
        └── images/     # Thư mục chứa hình ảnh
```

## 🚀 Cách Sử Dụng

### Chạy Ứng Dụng
1. Mở file `index.html` trong trình duyệt web
2. Hoặc sử dụng Live Server trong VS Code

### Điều Hướng
- **Chọn chủ đề**: Click nút "Chủ đề" ở góc trái trên
- **Học từ vựng**: Dùng nút "Trước" và "Tiếp" hoặc phím mũi tên ←/→
- **Thực hành**: Click nút "Thực hành" ở góc phải trên
- **Quay lại học**: Click nút "Quay lại" trong màn hình thực hành

## 📚 Thêm Chủ Đề Mới

### Bước 1: Tạo Cấu Trúc Thư Mục
```
topics/
└── ten-chu-de/        # Ví dụ: animals, colors, numbers
    ├── data.json
    └── images/
```

### Bước 2: Tạo File data.json
```json
[
  {
    "english": "Dog",
    "vietnamese": "Chó",
    "pronunciation": "Đóc",
    "image": "https://via.placeholder.com/400x300/3498db/FFFFFF?text=Dog",
    "imagePrompt": "AI Prompt: A cute golden retriever dog on white background, photorealistic, studio lighting, high quality, 4k"
  }
]
```

### Bước 3: Cập Nhật script.js
Thêm chủ đề mới vào object `topics`:
```javascript
const topics = {
    fruits: {
        name: 'Trái cây - Fruits',
        icon: 'fa-apple-alt',
        dataPath: 'topics/fruits/data.json'
    },
    animals: {  // Chủ đề mới
        name: 'Động vật - Animals',
        icon: 'fa-paw',
        dataPath: 'topics/animals/data.json'
    }
};
```

### Bước 4: Cập Nhật index.html
Thêm mục mới vào menu trong phần `<div class="topic-list">`:
```html
<div class="topic-item" data-topic="animals">
    <i class="fas fa-paw"></i>
    <span>Động vật (Animals)</span>
</div>
```

## 🎨 Tùy Chỉnh Hình Ảnh

### Sử Dụng Hình Ảnh Thật
1. Tải hình ảnh về thư mục `topics/[chu-de]/images/`
2. Cập nhật đường dẫn trong `data.json`:
```json
"image": "topics/fruits/images/apple.jpg"
```

### Tạo Hình Ảnh Bằng AI
Sử dụng prompt trong field `imagePrompt` để tạo ảnh với các công cụ AI như:
- DALL-E 3
- Midjourney
- Stable Diffusion
- Leonardo AI

Ví dụ prompt:
```
"A fresh red apple with green leaf on white background, photorealistic, studio lighting, high quality, 4k"
```

## 🎯 Font Awesome Icons

Ứng dụng sử dụng Font Awesome 6.5.1. Một số icon phổ biến:

- Trái cây: `fa-apple-alt`, `fa-lemon`, `fa-carrot`
- Động vật: `fa-paw`, `fa-dog`, `fa-cat`, `fa-fish`
- Màu sắc: `fa-palette`, `fa-paint-brush`
- Số: `fa-calculator`, `fa-hashtag`
- Thời tiết: `fa-sun`, `fa-cloud`, `fa-snowflake`
- Đồ vật: `fa-car`, `fa-home`, `fa-book`

Xem thêm: https://fontawesome.com/icons

## 🎨 Google Fonts

Ứng dụng sử dụng font **Poppins** từ Google Fonts.

Thay đổi font trong `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
```

Và trong `style.css`:
```css
font-family: 'Roboto', sans-serif;
```

## 🎨 Tùy Chỉnh Màu Sắc

Chỉnh sửa trong `style.css`:
```css
:root {
    --primary-color: #6C63FF;      /* Màu chính */
    --secondary-color: #FF6B9D;    /* Màu phụ */
    --success-color: #00D9A3;      /* Màu đúng */
    --error-color: #FF4757;        /* Màu sai */
}
```

## 📱 Responsive Design

Ứng dụng tự động điều chỉnh cho:
- Desktop (> 768px)
- Tablet (768px)
- Mobile (< 480px)

## 🔧 Công Nghệ Sử Dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và animations
- **JavaScript (ES6+)**: Logic và tương tác
- **Font Awesome 6.5.1**: Icons
- **Google Fonts**: Typography (Poppins)

## 💡 Tips Phát Triển

### Thêm Âm Thanh
```javascript
const audio = new Audio('sounds/correct.mp3');
audio.play();
```

### Lưu Tiến Trình
```javascript
localStorage.setItem('score', score);
const savedScore = localStorage.getItem('score');
```

### Thêm Animation
```css
@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}
```

## 📝 License

Free to use for educational purposes.

## 👨‍💻 Phát Triển Bởi

Được tạo bởi GitHub Copilot - AI Assistant

---

Chúc bạn học tiếng Anh vui vẻ! 🎉📚✨
