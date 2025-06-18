// メニューの開閉機能
document.addEventListener('DOMContentLoaded', function() {
    // 初回ページ読み込み時にTOPにスクロール
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 10);
    
    // 画像のスライドインアニメーション
    setTimeout(function() {
        const mainImage = document.querySelector('.main-image');
        if (mainImage) {
            mainImage.classList.add('slide-in');
        }
    }, 300); // 300ms後にアニメーション開始
    
    const menuToggle = document.getElementById('menuToggle');
    const hamburger = menuToggle.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;

    // ハンバーガーメニューの開閉
    menuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            // X形状に変形
            hamburger.children[0].style.transform = 'rotate(45deg) translate(0, 7px)';
            hamburger.children[1].style.opacity = '0';
            hamburger.children[2].style.transform = 'rotate(-45deg) translate(0, -7px)';
            menuToggle.classList.add('menu-open');
            navMenu.classList.add('active');
        } else {
            // 元のハンバーガー形状に戻す
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
            menuToggle.classList.remove('menu-open');
            navMenu.classList.remove('active');
        }
    });



    // メニュー外をクリックした時にメニューを閉じる
    navMenu.addEventListener('click', function(e) {
        if (e.target === navMenu) {
            isMenuOpen = false;
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
            menuToggle.classList.remove('menu-open');
            navMenu.classList.remove('active');
        }
    });

    // セクションへのスムーススクロール機能
    function scrollToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            // セクションの先頭にスムーススクロール
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // フッターリンクのナビゲーション機能
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // ナビゲーションメニューのリンクも更新
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // メニューを閉じる
            isMenuOpen = false;
            hamburger.children[0].style.transform = 'none';
            hamburger.children[1].style.opacity = '1';
            hamburger.children[2].style.transform = 'none';
            menuToggle.classList.remove('menu-open');
            navMenu.classList.remove('active');
            
            // セクションにスクロール
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
});

// ブラウザの自動スクロール復元を有効化（通常の動作に戻す）
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'auto';
}

// Q&A アコーディオン機能
function toggleAnswer(questionElement) {
    const qaItem = questionElement.parentElement;
    const answer = qaItem.querySelector('.qa-answer');
    const toggle = questionElement.querySelector('.qa-toggle');
    
    // 他の開いているQ&Aを閉じる
    const allQaItems = document.querySelectorAll('.qa-item');
    allQaItems.forEach(item => {
        if (item !== qaItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.qa-answer');
            const otherToggle = item.querySelector('.qa-toggle');
            otherAnswer.style.maxHeight = null;
            otherToggle.textContent = '+';
        }
    });
    
    // 現在のQ&Aを開く/閉じる
    if (qaItem.classList.contains('active')) {
        qaItem.classList.remove('active');
        answer.style.maxHeight = null;
        toggle.textContent = '+';
    } else {
        qaItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        toggle.textContent = '−';
    }
}

