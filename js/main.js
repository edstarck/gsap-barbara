// impg:	import { gsap } from "gsap"
// .to:	.to(selector, { duration: 1, vars })
// .from:	.from(selector, { duration: 1, vars })
// .fromTo:	.fromTo(selector, { vars }, {duration: 1, vars })
// .set:	.set(selector, { vars })
// tl:	const tl = gsap.timeline({ tlVars })

gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavlinks = gsap.utils.toArray('.main-nav a');
  const mainNavlinksRev = gsap.utils.toArray('.main-nav a').reverse();

  mainNavlinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      //add class
      link.classList.add('animate-out');

      //remove class
      setTimeout(() => {
        link.classList.remove('animate-out');
      }, 300);
    });
  });

  function navAnimation(direction) {
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavlinks : mainNavlinksRev;

    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: scrollingDown ? 0 : 1,
      y: scrollingDown ? 20 : 0,
      ease: 'Power4.out',
    });
  }

  ScrollTrigger.create({
    start: 100,
    end: 'bottom bottom-=200',
    toggleClass: {
      targets: 'body',
      className: 'has-scrolled',
    },
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: true,
  });
}

function init() {
  initNavigation();
}

window.addEventListener('load', function () {
  init();
});
