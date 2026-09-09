gsap.registerPlugin(ScrollTrigger, SplitText);


// 브라우저의 자동 스크롤 위치 복원 방지
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

document.addEventListener('DOMContentLoaded', function () {

    // 페이지 로드 시 최상단
    window.scrollTo(0, 0);


    // intro fade in
    const mm = gsap.matchMedia();

mm.add('(min-width: 769px)', () => {

    const tl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power1.out'
        }
    });

    tl.from('.intro-sub-tit', {
        y: 20,
        opacity: 0
    })
    .from('.intro-tit', {
        y: 20,
        opacity: 0
    }, '-=0.3')
    .from('.group-intro.quiz', {
        y: 20,
        opacity: 0
    }, '<')
    .from('.intro-txt', {
        y: 20,
        opacity: 0
    }, '<')
    .from('.strength-list', {
        opacity: 0
    }, '-=0.3');

});


mm.add('(max-width: 768px)', () => {

    const tl = gsap.timeline({
        defaults: {
            duration: 0.7,
            ease: 'power1.out'
        }
    });

    tl.from('.intro-sub-tit', {
        y: 15,
        opacity: 0
    })
    .from('.intro-tit', {
        y: 15,
        opacity: 0
    }, '-=0.2')
    .from('.intro-txt', {
        y: 15,
        opacity: 0
    }, '<')
    .from('.strength-list', {
        opacity: 0
    }, '-=0.2');

});
    // const tl = gsap.timeline({
    //     defaults: {
    //         duration: 1,
    //         ease: 'power1.out'
    //     }
    // });

    // tl.from('.intro-sub-tit', {
    //     y: 20,
    //     opacity: 0
    // })
    //     .from('.intro-tit', {
    //         y: 20,
    //         opacity: 0
    //     }, '-=0.3')
    //     .from('.sc-intro .quiz', {
    //         y: 20,
    //         opacity: 0
    //     }, '<')
    //     .from('.intro-txt', {
    //         y: 20,
    //         opacity: 0
    //     }, '<')
    //     .from('.strength-list', {
    //         opacity: 0,
    //     }, '-=0.3');


    // 타이틀 공통 애니메이션
    function titleAnimation(section) {
        const mainTxt = section.querySelector('.main-txt');
        const mainTit = section.querySelector('.main-tit');
    
        // 모바일
        if (window.innerWidth < 768) { 
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            });
    
            tl.from([mainTxt, mainTit], {
                y: 20,
                opacity: 0,
                duration: 0.7,
                stagger: 0.1,
                ease: 'power2.out'
            });
    
            return tl;
        }
    
        // PC
        const splitTxt = SplitText.create(mainTxt, {
            type: 'words,lines',
            mask: 'words'
        });
    
        const splitTit = SplitText.create(mainTit, {
            type: 'words,lines',
            mask: 'words'
        });
    
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        });
    
        tl.from(splitTxt.words, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: 'power2.out'
        })
        .from(splitTit.words, {
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.7,
            ease: 'power2.out'
        }, '-=0.2');
    
        return tl;
    }


    // 필요한 인증서비스
    const authSection = document.querySelector('.sc-authentication');

    if (authSection) {
        const tl = titleAnimation(authSection);
        
        tl.from('.authentication-area', {
            //y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power1.out'
        }, '-=0.2');
    }

    // 버튼 호버 효과
    // const authBoxes = document.querySelectorAll('.card-box');

    // authBoxes.forEach((box) => {

    //     const circle = box.querySelector('.hover-circle');

    //     box.addEventListener('mouseenter', () => {

    //         gsap.to(circle, {
    //             y: -100,
    //             scale: 2,
    //             duration: 0.7,
    //             ease: 'power3.out'
    //         });

    //     });

    //     box.addEventListener('mouseleave', () => {

    //         gsap.to(circle, {
    //             y: 0,
    //             scale: 0,
    //             duration: 0.7,
    //             ease: 'power3.inOut'
    //         });

    //     });

    // });


    // 추천 서비스
    const recommnadSection = document.querySelector('.sc-recommand');

    if (recommnadSection) {
        titleAnimation(recommnadSection);

        gsap.fromTo('.bg-recommand', {
            x: '-12%'
        }, {
            x: '12%',
            ease: 'none',
            scrollTrigger: {
                trigger: '.sc-recommand',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

    }


    // 도입 절차
    const procedureSection = document.querySelector('.sc-procedure');

    if (procedureSection) {

        const tl = titleAnimation(procedureSection);

        // 절차 단계
        const procedureItems = procedureSection.querySelectorAll('.procedure-item');

        tl.from(procedureItems, {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power2.out'
        }, '-=0.5');

    }


    // 컨설팅
    const consultingSection = document.querySelector('.sc-consulting');

    if (consultingSection) {

        const tl = titleAnimation(consultingSection);

        const contactItems = consultingSection.querySelectorAll('.contact-item');

        tl.from(contactItems, {
            y: 40,
            opacity: 0,
            stagger: 0.12,
            duration: 0.9,
            ease: 'power2.out'
        }, '-=0.5');

    }

    const footer = document.querySelector('.group-footer');
    gsap.from(footer, {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: 'back.out(0.8)',
        scrollTrigger: {
            trigger: footer,
            start: 'top bottom',
            toggleActions: 'play none none reverse'
        }
    });

});