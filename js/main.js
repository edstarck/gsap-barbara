// impg:	import { gsap } from "gsap"
// .to:	.to(selector, { duration: 1, vars })
// .from:	.from(selector, { duration: 1, vars })
// .fromTo:	.fromTo(selector, { vars }, {duration: 1, vars })
// .set:	.set(selector, { vars })
// tl:	const tl = gsap.timeline({ tlVars })

gsap.registerPlugin(ScrollTrigger)

function initNavigation() {
  const mainNavlinks = gsap.utils.toArray('.main-nav a')
  const mainNavlinksRev = gsap.utils.toArray('.main-nav a').reverse()

  mainNavlinks.forEach((link) => {
    link.addEventListener('mouseleave', (e) => {
      //add class
      link.classList.add('animate-out')

      //remove class
      setTimeout(() => {
        link.classList.remove('animate-out')
      }, 300)
    })
  })

  function navAnimation(direction) {
    const scrollingDown = direction === 1
    const links = scrollingDown ? mainNavlinks : mainNavlinksRev

    return gsap.to(links, {
      duration: 0.3,
      stagger: 0.05,
      autoAlpha: scrollingDown ? 0 : 1,
      y: scrollingDown ? 20 : 0,
      ease: 'Power4.out',
    })
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
    // markers: true,
  })
}

function moveImages(e) {
  const { offsetX, offsetY, target } = e
  const { clientWidth, clientHeight } = target

  // console.log(offsetX, offsetY, clientWidth, clientHeight);
  // get 0 0 in the center
  const xPos = offsetX / clientWidth - 0.5
  const yPos = offsetY / clientHeight - 0.5

  const leftImages = gsap.utils.toArray('.hg__left .hg__image')
  const rightImages = gsap.utils.toArray('.hg__right .hg__image')

  const modifier = (index) => (!index ? 0.5 : index * 1.2 + 0.5)

  // move left 3 images
  leftImages.forEach((img, index) => {
    gsap.to(img, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: yPos * 10,
      ease: 'Power3.out',
    })
  })

  // move right 3 images
  rightImages.forEach((img, index) => {
    gsap.to(img, {
      duration: 1.2,
      x: xPos * 20 * modifier(index),
      y: yPos * 30 * modifier(index),
      rotationY: xPos * 40,
      rotationX: -yPos * 10,
      ease: 'Power3.out',
    })
  })

  gsap.to('.decor__circle', {
    duration: 1.7,
    x: xPos * 100,
    y: yPos * 120,
    ease: 'Power4.out',
  })
}

function initHeaderTilt() {
  document.querySelector('header').addEventListener('mousemove', moveImages)
}

function createHoverReveal(e) {
  const enter = e.type === 'mouseenter'
  const leave = e.type === 'mouseleave'

  const { imageBlock, mask, text, textCopy, textMask, textP, image } = e.target

  let tl = gsap.timeline({ defaults: { duration: 0.7, ease: 'Power4.out' } })

  if (enter) {
    tl.to([mask, imageBlock, textMask, textP], { yPercent: 0 })
      .to(
        text,
        {
          y: () => -getTextHeight(textCopy) / 2,
        },
        0
      )
      .to(image, { duration: 1.1, scale: 1 }, 0)
  } else if (leave) {
    tl.to([mask, textP], { yPercent: 100 })
      .to([imageBlock, textMask], { yPercent: -102 }, 0)
      .to(text, { y: 0 }, 0)
      .to(image, { scale: 1.2 }, 0)
  }

  return tl
}

function getTextHeight(textCopy) {
  return textCopy.clientHeight
}

function initHoverReveal() {
  const sections = [...document.querySelectorAll('.rg__column')]

  sections.forEach((section) => {
    // get components for animation
    section.imageBlock = section.querySelector('.rg__image')
    section.image = section.querySelector('.rg__image img')
    section.mask = section.querySelector('.rg__image--mask')
    section.text = section.querySelector('.rg__text')
    section.textCopy = section.querySelector('.rg__text--copy')
    section.textMask = section.querySelector('.rg__text--mask')
    section.textP = section.querySelector('.rg__text--copy p')

    // reset initial position
    gsap.set([section.imageBlock, section.textMask], { yPercent: -102 })
    gsap.set([section.mask, section.textP], { yPercent: 100 })
    gsap.set(section.image, { scale: 1.2 })

    // add event liseners to each section
    section.addEventListener('mouseenter', createHoverReveal)
    section.addEventListener('mouseleave', createHoverReveal)
  })
}

function init() {
  initNavigation()
  initHeaderTilt()
  initHoverReveal()
}

window.addEventListener('load', function () {
  init()
})
