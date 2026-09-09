//서비스 추천 질문
document.addEventListener('DOMContentLoaded', function () {

    var last = null;

    function openModal(key) {

        var modal = document.querySelector('[data-modal="' + key + '"]');

        if (!modal) return;

        last = document.activeElement;

        modal.style.display = 'block';

        requestAnimationFrame(function () {
            modal.classList.add('on');
        });

        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {

        if (!modal) return;

        modal.classList.remove('on');

        document.body.style.overflow = '';

        setTimeout(function () {
            modal.style.display = 'none';
        }, 220);

        if (last) {
            last.focus();
        }
    }

    document.addEventListener('click', function (e) {
        /* 열기 */
        var openBtn = e.target.closest('[data-modal-open]');

        if (openBtn) {
            e.preventDefault();
            openModal(openBtn.dataset.modalOpen);
            return;
        }

         /* 닫기 */
         var closeBtn = e.target.closest('[data-modal-close]');

         if (closeBtn) {
 
             e.preventDefault();
 
             var key = closeBtn.dataset.modalClose;
 
             var modal = document.querySelector(
                 '[data-modal="' + key + '"]'
             );
 
             closeModal(modal);
 
             return;
         }
 
 
         /* 배경 클릭 */
         var modal = e.target.closest('[data-modal]');
 
         if (modal && e.target === modal) {
             closeModal(modal);
         }

    });

    /* ESC 닫기 */
    document.addEventListener('keydown', function (e) {

        if (e.key === 'Escape' && scrim.style.display !== 'none') {
            closeModal();
        }

    });

    // 모바일 헤더
    var headers = document.querySelectorAll('header');

    function checkScroll() {
        headers.forEach(function (header) {
            if (window.scrollY > 0) {
                header.classList.add('pof');
            } else {
                header.classList.remove('pof');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    
    checkScroll();


    document.addEventListener('click', function (e) {

        var menuBtn = e.target.closest('.btn-menu');
    
        if (!menuBtn) return;
    
        e.preventDefault();
    
        var isOpen = menuBtn.classList.toggle('on');
    
        if (isOpen) {
            menuBtn.removeAttribute('data-modal-open');
            menuBtn.setAttribute('data-modal-close', 'mobile-menu');
        } else {
            menuBtn.removeAttribute('data-modal-close');
            menuBtn.setAttribute('data-modal-open', 'mobile-menu');
        }
    
    });

    /**** QUIZ ****/

    var INQUIRY = 'https://b2b.niceid.co.kr/inquiry';
    var quiz = document.querySelector('.group-intro.quiz');

    if (!quiz) return;


    /* 서비스 상세 페이지 */
    var SVCPAGE = { phone: 'p3-01', joint: 'p3-02', fin: 'p3-03', ipin: 'p3-04', real: 'p3-05', corp: 'p3-06', acc: 'p3-07', acc1: 'p3-08', mo: 'p3-09', otp: 'p3-10', idcard: 'p3-13' };

    /* 서비스 데이터 */
    var SVC = {

        phone: {
            n: '휴대폰 본인확인',
            t: ['#인증서 불필요', '#90%이상점유'],
            icon: 'phoneid'
        },

        ipin: {
            n: '아이핀',
            t: ['#전연령인증가능', '#휴대폰없이가능'],
            icon: 'digital'
        },

        joint: {
            n: '공동인증서 본인확인',
            t: ['#공공기관 이용 多', '#전자서명가능'],
            icon: 'digital'
        },

        fin: {
            n: '금융인증서 본인확인',
            t: ['#클라우드 보관', '#프로그램설치 불필요'],
            icon: 'digital'
        },

        idcard: {
            n: '신분증 안심패키지',
            t: ['#비대면실명확인', '#신분증위변조방지'],
            icon: 'digital'
        },

        acc1: {
            n: '계좌1원인증',
            t: ['#계좌정보 일치 여부 확인', '#소지확인'],
            icon: 'digital'
        },

        mo: {
            n: 'MO인증',
            t: ['#문자발신기반', '#1인1APP'],
            icon: 'digital'
        },

        otp: {
            n: '문자OTP인증',
            t: ['#6자리OTP', '#친근한 인증 방법'],
            icon: 'digital'
        },

        real: {
            n: '실명확인(내/외국인)',
            t: ['#이름, 주민번호 일치 여부 확인'],
            icon: 'digital'
        },

        corp: {
            n: '법인실명확인',
            t: ['#기업형태, 기업상태 정보 확인'],
            icon: 'digital'
        },

        acc: {
            n: '계좌확인',
            t: ['#계좌번호, 은행 일치 여부 확인'],
            icon: 'digital'
        }
    };

    /* 질문 데이터 */
    var Q = {

        q1: {
            title: '나에게 맞는 서비스 찾기',
            question: '어떤 서비스가 필요하신가요?',
            options: [
                {
                    text: '가입자가 진짜 본인이 맞는지 확인하고 싶어요.',
                    next: 'q2_1'
                },
                {
                    text: '이 계좌나 휴대폰을 실제로 갖고 있는 사람인지 확인하고 싶어요.',
                    next: 'q2_2'
                },
                {
                    text: '고객이 입력한 이름 · 번호가 진짜 존재하는 정보인지 확인하고 싶어요.',
                    next: 'q2_3'
                },
                {
                    text: '그 외 다른 서비스를 알아보고 싶어요.',
                    next: 'contact'
                }
            ]
        },

        q2_1: {
            title: '나에게 맞는 서비스 찾기',
            question: '어떤 방법으로 확인하고 싶으세요?',
            options: [
                {
                    text: '휴대폰으로 간편하게 확인할게요.',
                    result: ['phone']
                },
                {
                    text: '휴대폰이 없어도,<br>나이·상황 상관없이 인증 가능해야 해요.',
                    result: ['ipin']
                },
                {
                    text: '휴대폰 없이도 인증서로 확인할게요.',
                    result: ['joint', 'fin']
                },
                {
                    text: '신분증 진위까지 꼼꼼히 확인하고 싶어요.',
                    result: ['idcard']
                }
            ]
        },

        q2_2: {
            title: '나에게 맞는 서비스 찾기',
            question: '어떤 방법으로 확인하고 싶으세요?',
            options: [
                {
                    text: '계좌를 실제로 갖고 있는지,<br>1원까지 보내서 확실히 확인할게요.',
                    result: ['acc1']
                },
                {
                    text: '본인 휴대폰으로<br>직접 인증 문자를 보내서 확인할게요.',
                    result: ['mo']
                },
                {
                    text: '문자로 받은 인증번호만으로 간단히 확인할게요.',
                    result: ['otp']
                }
            ]
        },

        q2_3: {
            title: '나에게 맞는 서비스 찾기',
            question: '어떤 방법으로 확인하고 싶으세요?',
            options: [
                {
                    text: '이름과 주민등록번호(내/외국인등록번호)가<br>실제 존재하는지 확인할게요.',
                    result: ['real']
                },
                {
                    text: '사업자등록번호·법인 정보가<br>실제 존재하는지 확인할게요.',
                    result: ['corp']
                },
                {
                    text: '고객이 입력한 계좌번호와 예금주가<br>실제 존재하는지 확인할게요.',
                    result: ['acc']
                }
            ]
        }
    };

    /* 상태 */
    var currentKey = 'q1';
    var history = [];

    /* 공통 헤더 */
    function getHeader(title, question, isBack) {

        var html = '';

        html += '<p class="main-txt">간단한 질문을 통해 서비스를 추천해드려요.</p>';
        html += '<h3 class="main-tit">' + title + '</h3>';

        /* 질문 단계 */
        html += '<div class="custom-step">';
        html += '<span class="step on"></span>';
        html += '<span class="step ' + (isBack ? 'on' : '') + '"></span>';
        html += '</div>';

        html += '<div class="custom-service-area">';

        if (isBack) {
            html += '<div class="fx">';
            html += '<button type="button" class="btn-prev" aria-label="이전"></button>';
            html += '<h4 class="custom-tit">Q. ' + question + '</h4>';
            html += '</div>';
        } else {
            html += '<h4 class="custom-tit">Q. ' + question + '</h4>';
        }

        return html;
    }

    /* 질문 화면 */
    function renderQuestion(key) {

        var data = Q[key];

        if (!data) return;

        currentKey = key;

        quiz.classList.remove('help');

        var html = '';

        html += getHeader(
            data.title,
            data.question,
            key !== 'q1'
        );

        html += '<ul class="custom-list">';

        data.options.forEach(function (item, index) {

            html += '<li class="custom-item">';
            html += '<button type="button" class="btn-opt" data-index="' + index + '">';
            html += item.text;
            html += '</button>';
            html += '</li>';

        });

        html += '</ul>';
        html += '</div>';

        quiz.innerHTML = html;

        bindQuestion();
        bindPrev();
    }

    /* 질문 선택 */
    function bindQuestion() {

        var buttons = quiz.querySelectorAll('.btn-opt');

        buttons.forEach(function (button) {

            button.addEventListener('click', function () {

                var data = Q[currentKey];
                var index = Number(button.dataset.index);
                var option = data.options[index];

                if (!option) return;

                buttons.forEach(function (btn) {
                    btn.classList.remove('on');
                });

                button.classList.add('on');

                history.push(currentKey);

                setTimeout(function () {

                    if (option.next === 'contact') {
                        renderContact();
                        return;
                    }

                    if (option.next) {
                        renderQuestion(option.next);
                        return;
                    }

                    if (option.result) {
                        renderResult(option.result);
                    }

                }, 170);

            });
        });
    }

    /* 결과 화면 */
    function renderResult(ids) {

        currentKey = 'result';

        quiz.classList.add('help');

        var many = ids.length > 1;

        var html = '';

        html += '<p class="main-txt">답변을 분석해봤어요!</p>';

        html += '<h3 class="main-tit">';
        html += many
            ? '이 두 서비스가 딱이에요'
            : '이 서비스가 딱이에요';
        html += '</h3>';

        ids.forEach(function (id) {

            var service = SVC[id];

            if (!service) return;

            html += '<div class="match-area">';

            html += '<h4 class="match-tit">';
            html += service.n;
            html += '</h4>';

            html += '<p class="match-txt">';
            html += service.t.join(' ');
            html += '</p>';

            html += '<button type="button" class="btn-type2" data-service="' + id + '">';
            html += '자세히 보기';
            html += '</button>';

            html += '<span class="ico ' + service.icon + '"></span>';

            html += '</div>';

        });

        html += '<div class="bottom-box">';

        html += '<a href="' + INQUIRY + '" class="btn-type1" target="_blank" rel="noopener noreferrer">';
        html += '도입 문의';
        html += '</a>';

        html += '<button type="button" class="btn-txtline" data-restart>';
        html += '다시하기';
        html += '</button>';

        html += '</div>';

        quiz.innerHTML = html;

        bindResult();
    }

    /* 결과 버튼 */
    function bindResult() {

        var detailButtons = quiz.querySelectorAll('[data-service]');

        detailButtons.forEach(function (button) {

            button.addEventListener('click', function () {

                var id = button.dataset.service;

                location.hash = SVCPAGE[id] || 'svc-' + id;

            });

        });

        var restart = quiz.querySelector('[data-restart]');

        if (restart) {

            restart.addEventListener('click', function () {

                history = [];
                quiz.classList.remove('help');
                renderQuestion('q1');

            });

        }
    }

    /* 문의 화면 */
    function renderContact() {

        currentKey = 'contact';

        /* 문의 화면 스타일 */
        quiz.classList.add('help');

        var html = '';

        html += '<p class="main-txt">찾으시는 서비스가 없으신가요?</p>';

        html += '<h3 class="main-tit">';
        html += '두 가지 방법 중<br>편하신 쪽으로 문의해주세요.';
        html += '</h3>';

        html += '<div class="gd">';

        /* 직접 문의 */
        html += '<div class="match-area">';

        html += '<h4 class="match-tit">';

        html += '직접 문의하기';
        html += '</h4>';

        html += '<p class="match-txt">';
        html += '#공공기관이용多 #전자서명가능';
        html += '</p>';

        html += '<a href="tel:02-3771-1588" class="link-ask">';

        html += '02-3771-1588';
        html += '</a>';

        html += '<a href="tel:02-3771-1588" class="link-ask">';

        html += '02-3771-1588';
        html += '</a>';

        html += '</div>';


        /* 온라인 문의 */
        html += '<div class="match-area">';

        html += '<h4 class="match-tit">';

        html += '온라인 문의 폼으로 문의하기';
        html += '</h4>';

        html += '<p class="match-txt">';
        html += '궁금하신 내용을 작성해주시면,<br>';
        html += '전문 마케터가 확인 후 도입목적에 부합하는<br>';
        html += '서비스를 추천해드립니다.';
        html += '</p>';

        html += '<p class="match-txt">';
        html += '※ 1회 해피콜 진행';
        html += '</p>';

        html += '<a href="' + INQUIRY + '" class="btn-type2" target="_blank" rel="noopener noreferrer">';
        html += '문의 페이지로 이동';

        html += '</a>';

        html += '</div>';

        html += '</div>';


        /* 다시하기 */
        html += '<div class="bottom-box">';

        html += '<button type="button" class="btn-txtline" data-restart>';
        html += '다시하기';
        html += '</button>';

        html += '</div>';

        quiz.innerHTML = html;

        bindContact();
    }

    /* 문의 화면 이벤트 */
    function bindContact() {

        var restart = quiz.querySelector('[data-restart]');

        if (restart) {

            restart.addEventListener('click', function () {

                history = [];
                quiz.classList.remove('help');
                renderQuestion('q1');

            });

        }
    }


    /* 이전 버튼 */
    function bindPrev() {

        var prev = quiz.querySelector('.btn-prev');

        if (!prev) return;

        prev.addEventListener('click', function () {

            var prevKey = history.pop();

            if (prevKey) {
                renderQuestion(prevKey);
            } else {
                renderQuestion('q1');
            }

        });
    }

    /* 시작 */
    renderQuestion('q1');

}); //js