import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export function homePageLoadAnimation() {
  new SplitType('#hero-heading h1', { types: 'chars' })

  // Check if this is the first load of the app
  const isFirstLoad = !sessionStorage.getItem('hasLoadedBefore')
  if (isFirstLoad) {
    sessionStorage.setItem('hasLoadedBefore', 'true')
  }

  const homePageTimeline = new gsap.timeline({
    paused: false,
    duration: 2,
    delay: isFirstLoad ? 2 : 0,
  })
  homePageTimeline.from(
    '#hero-heading h1 div',
    {
      opacity: 0,
      y: 150,
      ease: 'power3.out',
      stagger: 0.1,
      duration: 1.5,
    },
    0,
  )
  homePageTimeline.from(
    '#mobile-heading',
    {
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      duration: 1,
    },
    1,
  )
  homePageTimeline.from(
    '#hero-c2a',
    {
      opacity: 0,
      y: 50,
      ease: 'power3.out',
      duration: 1,
    },
    1.25,
  )

  // Return cleanup function
  return () => {
    homePageTimeline.kill()
  }
}

export function DropDownMenuAnimation() {
  const handlers = []

  const dropdownMenu = document.querySelector('#dropdown-menu')
  const lineOne = document.querySelector('#line-one')
  const lineTwo = document.querySelector('#line-two')
  const menuItems = document.querySelectorAll('#menu-list ul li')
  const menuButton = document.querySelector('#menu-button')

  if (!dropdownMenu || !lineOne || !lineTwo || !menuButton) {
    console.warn('Dropdown menu elements not found')
    return () => {}
  }

  // Kill any existing tweens on these elements first
  gsap.killTweensOf([lineOne, lineTwo, dropdownMenu, menuItems])

  gsap.set([lineOne, lineTwo], {
    transformOrigin: 'center center',
    force3D: true,
  })

  gsap.set(dropdownMenu, {
    visibility: 'hidden',
    xPercent: 100,
    opacity: 0,
    force3D: true,
  })

  gsap.set(menuItems, {
    y: 50,
    opacity: 0,
    force3D: true,
  })

  const dropDownTimeline = gsap.timeline({
    paused: true,
    duration: 1,
    onStart: () => {
      // Prevent body scroll on mobile when menu opens
      document.body.style.overflow = 'hidden'
    },
    onReverseComplete: () => {
      // Re-enable body scroll when menu closes
      document.body.style.overflow = ''
      // Hide the menu completely when animation is done
      gsap.set(dropdownMenu, { visibility: 'hidden' })
    },
  })

  dropDownTimeline
    .set(
      dropdownMenu,
      {
        visibility: 'visible',
      },
      0,
    )
    .to(
      dropdownMenu,
      {
        opacity: 1,
        duration: 0.1,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      [lineOne, lineTwo],
      {
        duration: 0.3,
        ease: 'power2.out',
        transformOrigin: 'center center',
      },
      0,
    )
    .to(
      lineOne,
      {
        rotation: 45,
        y: 6,
        duration: 0.3,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      lineTwo,
      {
        rotation: -45,
        y: -6,
        duration: 0.3,
        ease: 'power2.out',
      },
      0,
    )
    .to(
      dropdownMenu,
      {
        xPercent: 0,
        ease: 'power3.inOut',
        duration: 0.6,
      },
      0.1,
    )
    .to(
      menuItems,
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        ease: 'power2.out',
        duration: 0.4,
      },
      0.5,
    )

  dropDownTimeline.reverse()

  // Use event delegation for better performance and to avoid duplicate listeners
  const handleClick = function (event) {
    const target = event.target

    // Check if click is on menu button or its children
    if (target.closest('#menu-button')) {
      event.preventDefault()
      event.stopPropagation()
      dropDownTimeline.reversed(!dropDownTimeline.reversed())
      return
    }

    // Check if click is on menu links (close menu when navigating)
    if (target.matches('.menu-link-2') || target.matches('.sub-link')) {
      // Only close if menu is open
      if (!dropDownTimeline.reversed()) {
        dropDownTimeline.reverse()
      }
      // Ensure body overflow is reset immediately
      document.body.style.overflow = ''
      return
    }
  }

  const handleTouchMove = function (event) {
    // Check if dropdown elements still exist (might be removed after route change)
    if (!dropDownTimeline || !document.querySelector('#dropdown-menu')) {
      return
    }

    const isDropdownOpen = !dropDownTimeline.reversed()
    const isOnDropdown = event.target.closest('#dropdown-menu')
    const isOnBody = event.target === document.body || event.target === document.documentElement

    // Only prevent default for body scrolling when dropdown is open and visible
    // Allow normal touch interactions within the dropdown and after route changes
    if (isDropdownOpen && isOnBody && !isOnDropdown && document.querySelector('#dropdown-menu').style.visibility === 'visible') {
      event.preventDefault()
    }
  }

  document.addEventListener('click', handleClick, { passive: false })
  document.addEventListener('touchmove', handleTouchMove, { passive: false })

  handlers.push(
    { type: 'click', handler: handleClick },
    { type: 'touchmove', handler: handleTouchMove },
  )

  // Return cleanup function
  return () => {
    handlers.forEach(({ type, handler }) => {
      document.removeEventListener(type, handler)
    })
    if (dropDownTimeline) {
      dropDownTimeline.kill()
    }
  }
}

export function subMenuDrop() {
  const toggles = document.querySelectorAll('.sub-toggle')

  toggles.forEach((toggle) => {
    const subMenu = toggle.querySelector('.sub-list')
    const arrow = toggle.querySelector('.nav-arrow')

    if (!subMenu) return

    // Kill any existing tweens
    gsap.killTweensOf([subMenu, arrow])

    // Set initial state
    gsap.set(subMenu, {
      height: 0,
      opacity: 0,
      overflow: 'hidden',
      display: 'none',
      force3D: true,
    })

    if (arrow) {
      gsap.set(arrow, {
        rotation: 0,
        transformOrigin: 'center center',
        force3D: true,
      })
    }

    // Create timeline
    const subMenuTl = gsap.timeline({ paused: true })

    subMenuTl
      .set(subMenu, { display: 'flex' }, 0)
      .to(
        subMenu,
        {
          height: 'auto',
          duration: 0.4,
          ease: 'power2.out',
        },
        0,
      )
      .to(
        subMenu,
        {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.1,
      )

    if (arrow) {
      subMenuTl.to(
        arrow,
        {
          rotation: 90,
          duration: 0.4,
          ease: 'power2.out',
        },
        0,
      )
    }

    // Initialize timeline in reversed state (closed)
    subMenuTl.reverse()

    // Simple click handler - just toggle the timeline
    const clickHandler = (event) => {
      event.preventDefault()
      event.stopPropagation()

      // Toggle the timeline direction
      if (subMenuTl.reversed()) {
        subMenuTl.play()
      } else {
        subMenuTl.reverse()
      }
    }

    // Store timeline and handler on element for access
    toggle._timeline = subMenuTl
    toggle._clickHandler = clickHandler

    // Add event listener
    toggle.addEventListener('click', clickHandler, { passive: false })
  })

  // Return cleanup function
  return () => {
    toggles.forEach((toggle) => {
      const clickHandler = toggle._clickHandler
      if (clickHandler) {
        toggle.removeEventListener('click', clickHandler)
      }
      if (toggle._timeline) {
        toggle._timeline.kill()
        toggle._timeline = null
      }
    })
  }
}

export function DesktopSubmenuAnimation() {
  // For the About submenu in desktop nav
  const aboutLinkElement = document.querySelector('#menu-link-about')
  const aboutSubmenu = document.querySelector('.sub-menu-about')

  if (!aboutLinkElement || !aboutSubmenu) {
    return // Exit early if elements don't exist
  }

  // Clear any existing event listeners to prevent duplicates
  const existingHandlers = aboutLinkElement._desktopSubmenuHandlers
  if (existingHandlers) {
    existingHandlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler)
    })
  }

  // Kill any existing timeline
  if (aboutLinkElement._aboutTimeline) {
    aboutLinkElement._aboutTimeline.kill()
  }

  gsap.set(aboutSubmenu, {
    opacity: 0,
    visibility: 'hidden',
    y: -10,
    display: 'flex',
  })

  const aboutSubmenuTimeline = gsap.timeline({ paused: true })

  aboutSubmenuTimeline
    .to(aboutSubmenu, {
      opacity: 1,
      visibility: 'visible',
      y: 0,
      duration: 0.3,
      ease: 'power2.out',
    })
    .to(
      aboutSubmenu.querySelectorAll('li'),
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      },
      '-=0.15',
    )

  // Simple hover handlers
  let hoverTimeout = null

  const handleMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
    aboutSubmenuTimeline.play()
  }

  const handleMouseLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      aboutSubmenuTimeline.reverse()
    }, 150)
  }

  const handleSubmenuEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
  }

  const handleSubmenuLeave = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout)
    hoverTimeout = setTimeout(() => {
      aboutSubmenuTimeline.reverse()
    }, 150)
  }

  // Add event listeners
  aboutLinkElement.addEventListener('mouseenter', handleMouseEnter)
  aboutLinkElement.addEventListener('mouseleave', handleMouseLeave)
  aboutSubmenu.addEventListener('mouseenter', handleSubmenuEnter)
  aboutSubmenu.addEventListener('mouseleave', handleSubmenuLeave)

  // Store handlers and timeline for cleanup on next initialization
  aboutLinkElement._desktopSubmenuHandlers = [
    { element: aboutLinkElement, type: 'mouseenter', handler: handleMouseEnter },
    { element: aboutLinkElement, type: 'mouseleave', handler: handleMouseLeave },
    { element: aboutSubmenu, type: 'mouseenter', handler: handleSubmenuEnter },
    { element: aboutSubmenu, type: 'mouseleave', handler: handleSubmenuLeave },
  ]
  aboutLinkElement._aboutTimeline = aboutSubmenuTimeline

  // Return cleanup function
  return () => {
    if (aboutLinkElement._desktopSubmenuHandlers) {
      aboutLinkElement._desktopSubmenuHandlers.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
      })
    }
    if (aboutLinkElement._aboutTimeline) {
      aboutLinkElement._aboutTimeline.kill()
      aboutLinkElement._aboutTimeline = null
    }
    if (hoverTimeout) {
      clearTimeout(hoverTimeout)
      hoverTimeout = null
    }
  }
}

export function subMenuHover(menuSelector = '.sub-drop') {
  const menuItems = document.querySelectorAll(menuSelector)

  menuItems.forEach((item) => {
    const subMenu = item.querySelector('.sub-list')

    if (!subMenu) return
    gsap.set(subMenu, { height: 0, opacity: 0 })

    const subMenuTl = new gsap.timeline({
      paused: true,
      duration: 1,
    })
    subMenuTl.to(
      subMenu,
      {
        height: 'auto',
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
      },
      0,
    )
    subMenuTl.to(
      '#nav-arrow-about',
      {
        rotate: 90,
        duration: 1,
        ease: 'power2.out',
      },
      0,
    )
    subMenuTl.from(
      '.sub-list li',
      {
        y: 50,
        opacity: 0,
        stagger: 0.05,
        ease: 'power2.out',
      },
      0.1,
    )
    subMenuTl.from(
      '.sub-link',
      {
        x: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.35,
    )
    subMenuTl.to(
      '.circle-arrow',
      {
        rotate: 135,
        duration: 0.5,
        ease: 'power2.out',
      },
      0.35,
    )
    let isOpen = false
    item.addEventListener('click', () => {
      if (!isOpen) {
        gsap.set(subMenu, { display: 'flex' })
        subMenuTl.play()
        isOpen = true
      } else {
        subMenuTl.reverse()
        isOpen = false
      }
    })
  })
}

export function menuUnderline() {
  const handlers = []
  const underLineWrapper = document.querySelectorAll('#menu li')

  underLineWrapper.forEach((el) => {
    const thisUnderline = el.querySelector('.menu-underline')

    if (thisUnderline) {
      const mouseEnter = () => {
        gsap.to(thisUnderline, {
          width: '100%',
          duration: 0.5,
          ease: 'power4.out',
        })
      }
      const mouseLeave = () => {
        gsap.to(thisUnderline, {
          width: '100%',
          duration: 0.5,
          x: '110%',
          ease: 'power4.out',
          onComplete: () => {
            gsap.set(thisUnderline, {
              x: '0%',
              width: '0%',
            })
          },
        })
      }
      el.addEventListener('mouseenter', mouseEnter)
      el.addEventListener('mouseleave', mouseLeave)

      handlers.push(
        { element: el, type: 'mouseenter', handler: mouseEnter },
        { element: el, type: 'mouseleave', handler: mouseLeave },
      )
    }
  })

  // Return cleanup function
  return () => {
    handlers.forEach(({ element, type, handler }) => {
      if (element && handler) {
        element.removeEventListener(type, handler)
      }
    })
  }
}

export function teamViewAnimations() {
  const handlers = []
  let memberMenuTimeline = null

  const sidebar = document.querySelector('#side-bar')
  const mobileButton = document.querySelector('#mobile-btn')
  const footer = document.querySelector('#footer')
  const arrow = document.querySelector('#arrow')

  if (window.innerWidth < 768) {
    if (!sidebar || !mobileButton || !arrow) {
      return () => {} // Return empty cleanup if required elements don't exist
    }

    memberMenuTimeline = new gsap.timeline({
      paused: true,
      duration: 0.5,
    })

    memberMenuTimeline.to(sidebar, {
      ease: 'expo.inOut',
      duration: 0.5,
      left: '0%',
    })
    memberMenuTimeline.to(arrow, {
      ease: 'expo.inOut',
      duration: 0.1,
      opacity: 0,
    })
    memberMenuTimeline.to(arrow, {
      ease: 'expo.inOut',
      duration: 0.1,
      transform: 'scaleX(-1)',
    })
    memberMenuTimeline.to(arrow, {
      ease: 'expo.inOut',
      duration: 0.25,
      opacity: 1,
    })

    let isMenuOpen = false

    const mobileButtonHandler = () => {
      console.log('clicked')
      if (isMenuOpen) {
        memberMenuTimeline.reverse()
      } else {
        memberMenuTimeline.play()
      }
      isMenuOpen = !isMenuOpen
    }

    mobileButton.addEventListener('click', mobileButtonHandler)
    handlers.push({ element: mobileButton, type: 'click', handler: mobileButtonHandler })

    const memberLinks = document.querySelectorAll('.member-link')
    const memberLinkHandler = () => {
      memberMenuTimeline.reverse()
      isMenuOpen = false
    }

    memberLinks.forEach((member) => {
      member.addEventListener('click', memberLinkHandler)
      handlers.push({ element: member, type: 'click', handler: memberLinkHandler })
    })
  }

  if (window.innerWidth > 768) {
    if (sidebar && footer) {
      gsap.registerPlugin(ScrollTrigger)

      const scrollTriggerInstance = gsap.to(sidebar, {
        scrollTrigger: {
          trigger: footer,
          start: 'top 100%',
          end: 'top 10%',
          scrub: true,
        },
        opacity: 0,
        duration: 0.25,
        ease: 'power4.out',
      })

      // Store ScrollTrigger for cleanup
      handlers.push({ scrollTrigger: scrollTriggerInstance })
    }
  }

  // Return proper cleanup function
  return () => {
    handlers.forEach(({ element, type, handler, scrollTrigger }) => {
      if (element && type && handler) {
        element.removeEventListener(type, handler)
      }
      if (scrollTrigger && scrollTrigger.scrollTrigger) {
        scrollTrigger.scrollTrigger.kill()
      }
    })

    if (memberMenuTimeline) {
      memberMenuTimeline.kill()
    }
  }
}

export function ContactForm() {
  const contactContainer = document.querySelector('#contact-container')
  const contactWrapper = document.querySelector('#contact-wrapper')

  if (!contactContainer || !contactWrapper) {
    console.warn('Contact form elements not found, skipping initialization')
    return () => {} // Return empty cleanup function
  }

  // Clear any existing event listeners to prevent duplicates
  const existingHandlers = document._contactHandlers
  if (existingHandlers) {
    existingHandlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler)
    })
  }

  // Kill any existing timeline
  if (document._contactTimeline) {
    document._contactTimeline.kill()
  }

  // Reset contact container to initial state
  gsap.set(contactContainer, {
    pointerEvents: 'none',
  })

  gsap.set(contactWrapper, {
    visibility: 'hidden',
    height: '0vh',
  })

  const contactTimeline = gsap.timeline({
    paused: true,
    onStart: () => {
      // Allow scrolling within contact wrapper on mobile
      contactWrapper.style.overflow = 'auto'
      contactWrapper.style.webkitOverflowScrolling = 'touch'
    },
    onReverseComplete: () => {
      contactWrapper.classList.remove('active')
    }
  })

  contactTimeline
    .set(contactWrapper, { visibility: 'visible' }, 0)
    .set(contactWrapper, { className: '+=active' }, 0)
    .to(
      contactWrapper,
      {
        height: '100vh',
        ease: 'power4.out',
        duration: 1.5,
      },
      0,
    )
    .to(
      '.contact-close',
      {
        opacity: '100%',
        yPercent: 0,
        ease: 'power3.out',
        duration: 0.5,
      },
      1,
    )
    .to(
      '#contact-form-header',
      {
        opacity: '100%',
        yPercent: 0,
        ease: 'power3.out',
        duration: 1,
      },
      0.5,
    )
    .to(
      '#description',
      {
        opacity: '100%',
        ease: 'power3.out',
        duration: 1,
      },
      0.75,
    )
    .to(
      '#local-time',
      {
        opacity: '100%',
        ease: 'power3.out',
        duration: 1,
      },
      1,
    )
    .to(
      '#local-title',
      {
        opacity: '100%',
        ease: 'power3.out',
        duration: 1,
      },
      1,
    )
    .to(
      '#contact-form',
      {
        opacity: '100%',
        ease: 'power3.out',
        duration: 1,
      },
      1.25,
    )

  const clickHandler = (e) => {
    // Check if clicking on close button
    if (e.target.closest('.contact-close')) {
      e.preventDefault()
      e.stopPropagation()
      contactTimeline.reverse()
      contactContainer.style.pointerEvents = 'none'
      // Re-enable body scroll on close
      document.body.style.overflow = ''
      return
    }

    // Check if clicking on contact open button
    const contactTrigger = e.target.closest('.contact-open')
    if (contactTrigger) {
      e.preventDefault()
      e.stopPropagation()
      contactTimeline.play()
      contactContainer.style.pointerEvents = 'auto'
      // Prevent body scroll but allow contact wrapper scroll
      document.body.style.overflow = 'hidden'
      return
    }
  }

  // Single event listener for all contact interactions
  document.addEventListener('click', clickHandler, { passive: false })

  // Store handlers and timeline for cleanup on next initialization
  document._contactHandlers = [{ element: document, type: 'click', handler: clickHandler }]
  document._contactTimeline = contactTimeline

  // Return cleanup function
  return () => {
    if (document._contactHandlers) {
      document._contactHandlers.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
      })
      document._contactHandlers = null
    }
    if (document._contactTimeline) {
      document._contactTimeline.kill()
      document._contactTimeline = null
    }
  }
}
