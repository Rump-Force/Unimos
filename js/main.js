// Выпадающие меню
const links = document.querySelectorAll('.menu__link')
const menuItems = document.querySelectorAll('.menu__item')

// Обработка клика по ссылке меню
links.forEach(link => {
	link.addEventListener('click', e => {
		e.preventDefault()
		const id = link.dataset.id
		if (!id) return
		// Находим соответствующее выпадающее меню
		const dropdown = document.getElementById(id)
		const menuItem = link.closest('.menu__item')

		// Переключаем текущее меню
		menuItem.classList.toggle('active')
		dropdown.classList.toggle('active-dropdown')
		// isMenuOpen = menuItem.classList.contains('active')

		// Закрываем все остальные меню
		menuItems.forEach(item => {
			// Пропускаем текущее меню
			if (item !== menuItem) {
				// Закрываем остальные меню
				item.classList.remove('active')
				const otherDropdown = item.querySelector('.dropdown__content')
				if (otherDropdown) otherDropdown.classList.remove('active-dropdown')
			}
		})
	})
})

// Закрытие при клике вне меню
document.addEventListener('click', e => {
	menuItems.forEach(item => {
		const dropdown = item.querySelector('.dropdown__content')
		if (!item.contains(e.target)) {
			// клик не по меню
			item.classList.remove('active')
			if (dropdown) dropdown.classList.remove('active-dropdown')
		}
	})
})

// Закрытие при нажатии Escape
document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		menuItems.forEach(item => {
			item.classList.remove('active')
			const dropdown = item.querySelector('.dropdown__content')
			if (dropdown) dropdown.classList.remove('active-dropdown')
		})
	}
})

// Меню открытия на мобильных устройствах
const btnClick = document.querySelector('.button__menu')
const openMenu = document.querySelector('.menu')
const overlay = document.querySelector('.overlay')
const bntClose = document.querySelector('.button__close')

// Функция закрытия меню
function closeMenu() {
	btnClick.classList.remove('active')
	openMenu.classList.remove('active')
	overlay.classList.remove('active')
}

btnClick.addEventListener('click', () => {
	btnClick.classList.toggle('active')
	openMenu.classList.toggle('active')
	overlay.classList.toggle('active')
})

bntClose.addEventListener('click', closeMenu)
overlay.addEventListener('click', closeMenu)

document.addEventListener('keydown', e => {
	if (e.key === 'Escape') {
		closeMenu()
	}
})

// Настройки слайдера Swiper
var bannerSwiper = new Swiper('.bannerSwiper', {
	// cssMode: true,
	loop: true,
	spaceBetween: 30,

	// autoplay: {
	// 	delay: 2500,
	// 	disableOnInteraction: false,
	// },

	mousewheel: {
		forceToAxis: true,
		sensitivity: 1,
	},

	keyboard: {
		enabled: true,
	},

	navigation: {
		nextEl: '.banner-btn-next',
		prevEl: '.banner-btn-prev',
	},
	pagination: {
		el: '.banner-pagination',
		clickable: true,
	},
	mousewheel: false,
	keyboard: true,
})

const header = document.querySelector('.header')
let lastScroll = 0

window.addEventListener('scroll', () => {
	const currentScroll = window.pageYOffset

	// 1. Проверяем, открыто ли какое-либо выпадающее меню или мобильное меню
	// Ищем любой элемент с классом 'active' внутри навигации или саму мобильную навигацию
	const isMenuOpen =
		document.querySelector('.menu__item.active') !== null ||
		document.querySelector('.menu.active') !== null

	// 2. Логика скрытия/показа
	if (isMenuOpen) {
		// Если меню открыто — всегда показываем хедер
		header.classList.remove('header--hidden')
	} else {
		// Если скроллим вниз и проехали больше 100px — прячем
		if (currentScroll > lastScroll && currentScroll > 100) {
			header.classList.add('header--hidden')
		}
		// Если скроллим вверх — показываем
		else {
			header.classList.remove('header--hidden')
		}
	}

	// 3. Если мы в самом верху страницы — всегда показываем
	if (currentScroll <= 0) {
		header.classList.remove('header--hidden')
	}

	lastScroll = currentScroll
})

// Настройки слайдера Swiper для секции "О нас"
var aboutSwiper = new Swiper('.aboutSwiper', {
	spaceBetween: 40,
	direction: 'horizontal',
	navigation: {
		nextEl: '.about-button-next',
		prevEl: '.about-button-prev',
	},
	pagination: {
		el: '.about-pagination',
		clickable: true,
	},

	mousewheel: false,
	keyboard: true,
})

//
var recomiendanSwiper = new Swiper('.recomiendanSwiper', {
  slidesPerView: 1.1,            // mobile default ✅
  spaceBetween: 20,
  loop: true,
  centeredSlides: true,
  watchSlidesProgress: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.pagination-button-next',
    prevEl: '.pagination-button-prev',
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 48,
    },
  },
  grabCursor: true,
})

const accordionTitles = document.querySelectorAll('.compromiso__accordion-title')

accordionTitles.forEach(title => {
	title.addEventListener('click', () => {
		const textBlock = title.nextElementSibling
		const isActive = title.classList.contains('active')

		// Закрываем все активные перед открытием нового
		document
			.querySelectorAll('.compromiso__accordion-title')
			.forEach(el => el.classList.remove('active'))
		document
			.querySelectorAll('.compromiso__accordion-text')
			.forEach(el => el.classList.remove('active'))

		// Если нажатый не был активным — открываем его
		if (!isActive) {
			title.classList.add('active')
			textBlock.classList.add('active')
		}
	})
})
