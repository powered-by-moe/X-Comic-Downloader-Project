class nHentaiAPI {
	#status = [403, 404, 500, 503]
	#statusMessage = [
		"You don't have the permission to View this Page.",
		"Page Not Found.",
		"Internal Server Error.",
		"Server is unavailable at this Time."
	]

	constructor() {
		this.baseURL = 'https://nhentai.net'
		this.comicURL = '/g/'
		this.groupURL = '/group/'
		this.parodyURL = '/parody/'
		this.artistURL = '/artist/'
		this.tagURL = '/tag/'
		this.languageURL = '/language/'
		this.categoryURL = '/category/'
		this.characterURL = '/character/'
		this.searchURL = '/search/'
		this.thumbURL = 'https://t.nhentai.net'
		this.imgURL = 'https://i.nhentai.net'
	}

	getPage(page = 1, callback = () => {}) {
		page = page || 1
		callback = callback || null
		const url = this.baseURL+'/?page='+page

		if (callback == null) throw "You can't Set Callback as Null."
		if (typeof callback != 'function') throw "The Type of Callback Should Be a Function."

		fetch(url).then(response => {
			if (response.status != 200) {
				const index = this.#status.indexOf(response.status)
				if (index > -1) throw this.#statusMessage[index]
				else throw "Error->Code->"+response.status
			}
			return response.text()
		}).then(html => {
			const htmlDoc = new DOMParser().parseFromString(html, 'text/html').body
			const arr = {}
			let container, child, save, save2, save3

			container = htmlDoc.getElementsByClassName('index-container')
			// Popular
			if (page == 1) {
				arr.popular = []
				child = container[0].children
				for (let i = 1; i < child.length; i++) {
					save = child[i].dataset.tags
					if (save.indexOf('12227') != -1) save = 'English'
					else if (save.indexOf('29963') != -1) save = 'Chinese'
					else if (save.indexOf('6346') != -1) save = 'Japanese'
					else save = null

					save2 = child[i].children[0]
					save3 = save2.children
					arr.popular.push({
						id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
						thumb: save3[0].getAttribute('data-src'),
						title: save3[2].innerText,
						lang: save
					})
				}
				child = container[1].children
			} else  child = container[0].children

			// Content
			arr.content = []
			if (child.length == 0) throw 'No Result, sorry'
			for (let i = 1; i < child.length; i++) {
				save = child[i].dataset.tags
				if (save.indexOf('12227') != -1) save = 'English'
				else if (save.indexOf('29963') != -1) save = 'Chinese'
				else if (save.indexOf('6346') != -1) save = 'Japanese'
				else save = null

				save2 = child[i].children[0]
				save3 = save2.children
				arr.content.push({
					id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
					thumb: save3[0].getAttribute('data-src'),
					title: save3[2].innerText,
					lang: save
				})
			}

			// Pagination
			arr.pagination = null
			child = htmlDoc.getElementsByClassName('pagination')
			if (child.length > 0) {
				arr.pagination = []
				child = child[0].children
				for (let i = 0; i < child.length; i++) {

					save3 = child[i].classList
					if (save3.contains('page')) {
						if (save3.contains('current')) { arr.pagination.push([child[i].innerText, null]); continue }
						else save = child[i].innerText
					} else {
						if (save3[0] == 'first') save = '<<'
						else if (save3[0] == 'previous') save = '<'
						else if (save3[0] == 'next') save = '>'
						else if (save3[0] == 'last') save = '>>'
						else continue
					}

					save2 = Number(child[i].getAttribute('href').replace('/?page=', ''))
					arr.pagination.push([save, save2])
				}
			}

			callback(null, arr)
		}).catch(err => {
			if (err == 'TypeError: Failed to fetch') err = 'Connection Timeout, Check Internet Connection.'
			callback(err, null)
		})
	}

	getComic(id = 1, related = false, callback = () => {}) {
		id = id || null
		if (id == null) throw "No Id."
		related = related || false
		callback = callback || null
		const url = this.baseURL+this.comicURL+id

		if (callback == null) throw "You can't Set Callback as Null."
		if (typeof callback != 'function') throw "The Type of Callback Should Be a Function."

		fetch(url).then(response => {
			if (response.status != 200) {
				const index = this.#status.indexOf(response.status)
				if (index > -1) throw this.#statusMessage[index]
				else throw "Error->Code->"+response.status
			}
			return response.text()
		}).then(html => {
			const htmlDoc = new DOMParser().parseFromString(html, 'text/html')
			const arr = {}
			let save, save2, save3

			save = htmlDoc.getElementById('info').getElementsByClassName('title')[0]
			arr.name = save.getElementsByClassName('pretty')[0].innerText
			arr.title = save.innerText
			arr.cover = htmlDoc.getElementById('cover').children[0].children[0].getAttribute('data-src')

			save = htmlDoc.getElementById('tags').children

			// Parodies
			if (!save[0].classList.contains('hidden')) {
				arr.parodies = []
				save2 = save[0].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.parodies.push({
						url: save2[i].getAttribute('href').replace(this.parodyURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Characters
			if (!save[1].classList.contains('hidden')) {
				arr.characters = []
				save2 = save[1].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.characters.push({
						url: save2[i].getAttribute('href').replace(this.characterURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Tags
			if (!save[2].classList.contains('hidden')) {
				arr.tags = []
				save2 = save[2].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.tags.push({
						url: save2[i].getAttribute('href').replace(this.tagURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Artists
			if (!save[3].classList.contains('hidden')) {
				arr.artists = []
				save2 = save[3].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.artists.push({
						url: save2[i].getAttribute('href').replace(this.artistURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Groups
			if (!save[4].classList.contains('hidden')) {
				arr.groups = []
				save2 = save[4].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.groups.push({
						url: save2[i].getAttribute('href').replace(this.groupURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Languages
			if (!save[5].classList.contains('hidden')) {
				arr.languages = []
				save2 = save[5].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.languages.push({
						url: save2[i].getAttribute('href').replace(this.languageURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Categories
			if (!save[6].classList.contains('hidden')) {
				arr.categories = []
				save2 = save[6].children[0].children
				for (let i = 0; i < save2.length; i++) {
					save3 = save2[i].children
					arr.categories.push({
						url: save2[i].getAttribute('href').replace(this.categoryURL, '').replace('/', ''),
						name: save3[0].innerText,
						count: save3[1].innerText
					})
				}
			}

			// Pages
			if (!save[7].classList.contains('hidden')) {
				save2 = save[7].children[0].children
				// 16 25
				save3 = save2[0].getAttribute('href').replace(this.searchURL, '').replace('?q=pages%3A%3E', '').replace('+pages%3A%3C', ',').split(',')
				arr.pages = {
					from: Number(save3[0]),
					to: Number(save3[1]),
					count: Number(save2[0].children[0].innerText)
				}
			}

			// Date
			if (!save[8].classList.contains('hidden')) {
				save2 = save[8].children[0].children[0]
				arr.date = {
					dataTime: save2.getAttribute('datetime'),
					ago: save2.innerText
				}
			}

			// Images
			arr.images = []
			save = htmlDoc.getElementById('thumbnail-container').children[0].children
			for (let i = 0; i < save.length; i++) {
				save2 = save[i].children[0].children[0].getAttribute('data-src')
				arr.images.push({
					url: this.imgURL+(save2.replace(this.thumbURL, '').replace('t', '')),
					thumb: save2
				})
			}

			// Related
			if (related) {
				let child
				child = htmlDoc.getElementById('related-container')
				if (child != undefined) {
					child = child.children
					if (child.length >= 2) {
						arr.related = []
						let save3
						for (let i = 1; i < child.length; i++) {
							save = child[i].dataset.tags
							if (save.indexOf('12227') != -1) save = 'English'
							else if (save.indexOf('29963') != -1) save = 'Chinese'
							else if (save.indexOf('6346') != -1) save = 'Japanese'
							else save = null

							save2 = child[i].children[0]
							save3 = save2.children
							arr.related.push({
								id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
								thumb: save3[0].getAttribute('data-src'),
								title: save3[2].innerText,
								lang: save
							})
						}
					}
				}
			}


			callback(null, arr)
		}).catch(err => {
			if (err == 'TypeError: Failed to fetch') err = 'Connection Timeout, Check Internet Connection.'
			callback(err, null)
		})
	}

	getTypePage(type = 'type', name = 'name', page = 1, callback = () => {}) {
		if (type == null) throw "You can't Set Type as Null."
		name = name || null
		if (name == null) throw "You can't Set Name as Null."
		page = page || 1
		callback = callback || null

		if (callback == null) throw "You can't Set Callback as Null."
		if (typeof callback != 'function') throw "The Type of Callback Should Be a Function."

		const types = ['group','parody','artist','tag','language','category','character']
		let subURL

		const findedIndex = types.indexOf(type.toLowerCase())
		if (findedIndex == -1) throw "Type not Found."
		else {
			const typeValues = [this.groupURL,this.parodyURL,this.artistURL,this.tagURL,this.languageURL,this.categoryURL,this.characterURL]
			subURL = typeValues[findedIndex]
		}

		const url = this.baseURL+subURL+name+'/?page='+page

		fetch(url).then(response => {
			if (response.status != 200) {
				const index = this.#status.indexOf(response.status)
				if (index > -1) throw this.#statusMessage[index]
				else throw "Error->Code->"+response.status
			}
			return response.text()
		}).then(html => {
			const htmlDoc = new DOMParser().parseFromString(html, 'text/html')
			const arr = {}
			let child, save, save2, save3

			// Name
			arr.name = htmlDoc.getElementById('content').children[1].children[1].children[0].innerText

			// Content
			arr.content = []
			child = htmlDoc.getElementsByClassName('index-container')[0].children
			if (child[0].tagName == 'H3') throw child[0].innerText
			for (let i = 0; i < child.length; i++) {
				save = child[i].dataset.tags
				if (save.indexOf('12227') != -1) save = 'English'
				else if (save.indexOf('29963') != -1) save = 'Chinese'
				else if (save.indexOf('6346') != -1) save = 'Japanese'
				else save = null

				save2 = child[i].children[0]
				save3 = save2.children
				arr.content.push({
					id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
					thumb: save3[0].getAttribute('data-src'),
					title: save3[2].innerText,
					lang: save
				})
			}

			// Pagination
			arr.pagination = null
			child = htmlDoc.getElementsByClassName('pagination')
			if (child.length > 0) {
				arr.pagination = []
				child = child[0].children
				for (let i = 0; i < child.length; i++) {

					save3 = child[i].classList
					if (save3.contains('page')) {
						if (save3.contains('current')) { arr.pagination.push([child[i].innerText, null]); continue }
						else save = child[i].innerText
					} else {
						if (save3[0] == 'first') save = '<<'
						else if (save3[0] == 'previous') save = '<'
						else if (save3[0] == 'next') save = '>'
						else if (save3[0] == 'last') save = '>>'
						else continue
					}

					save2 = Number(child[i].getAttribute('href').replace(subURL, '').replace(name, '').replace('/?page=', ''))
					arr.pagination.push([save, save2])
				}
			}

			callback(null, arr)
		}).catch(err => {
			if (err == 'TypeError: Failed to fetch') err = 'Connection Timeout, Check Internet Connection.'
			callback(err, null)
		})
	}

	searchPages(from = 1, to = 1, page = 1, callback = () => {}) {
		from = from || 1
		to = to || 1
		page = page || 1
		callback = callback || null

		if (callback == null) throw "You can't Set Callback as Null."
		if (typeof callback != 'function') throw "The Type of Callback Should Be a Function."

		const url = this.baseURL+this.searchURL+'?q=pages%3A>'+from+'+pages%3A<'+to+'&page='+page

		fetch(url).then(response => {
			if (response.status != 200) {
				const index = this.#status.indexOf(response.status)
				if (index > -1) throw this.#statusMessage[index]
				else throw "Error->Code->"+response.status
			}
			return response.text()
		}).then(html => {
			const htmlDoc = new DOMParser().parseFromString(html, 'text/html')
			const arr = {}
			let child, save, save2, save3

			// Name
			arr.title = 'Comics With '+from+' To '+to+' Pages'
			arr.result = Number(htmlDoc.getElementById('content').children[1].innerText.replace(/ /g, '').replace('results', '').replace(/,/g, ''))

			// Content
			arr.content = []
			child = htmlDoc.getElementsByClassName('index-container')[0].children
			if (child[0].tagName == 'H2') throw child[0].innerText
			for (let i = 0; i < child.length; i++) {
				save = child[i].dataset.tags
				if (save.indexOf('12227') != -1) save = 'English'
				else if (save.indexOf('29963') != -1) save = 'Chinese'
				else if (save.indexOf('6346') != -1) save = 'Japanese'
				else save = null

				save2 = child[i].children[0]
				save3 = save2.children
				arr.content.push({
					id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
					thumb: save3[0].getAttribute('data-src'),
					title: save3[2].innerText,
					lang: save
				})
			}

			// Pagination
			arr.pagination = null
			child = htmlDoc.getElementsByClassName('pagination')
			if (child.length > 0) {
				arr.pagination = []
				child = child[0].children
				for (let i = 0; i < child.length; i++) {

					save3 = child[i].classList
					if (save3.contains('page')) {
						if (save3.contains('current')) { arr.pagination.push([child[i].innerText, null]); continue }
						else save = child[i].innerText
					} else {
						if (save3[0] == 'first') save = '<<'
						else if (save3[0] == 'previous') save = '<'
						else if (save3[0] == 'next') save = '>'
						else if (save3[0] == 'last') save = '>>'
						else continue
					}

					save2 = Number(child[i].getAttribute('href').replace(this.searchURL, '').replace('?q=pages%3A%3E', '').replace('+pages%3A%3C', '').replace('&page=', '').replace(from, '').replace(to, ''))
					arr.pagination.push([save, save2])
				}
			}

			callback(null, arr)
		}).catch(err => {
			if (err == 'TypeError: Failed to fetch') err = 'Connection Timeout, Check Internet Connection.'
			callback(err, null)
		})
	}

	search(text = 'name', page = 1, callback = () => {}) {
		text = text || null
		if (text == null) throw "No Name."
		text = text.replace(/ /g, '+')
		page = page || 1
		callback = callback || null
		const url = this.baseURL+this.searchURL+'?q='+text+'&page='+page

		if (callback == null) throw "You can't Set Callback as Null."
		if (typeof callback != 'function') throw "The Type of Callback Should Be a Function."

		fetch(url).then(response => {
			if (response.status != 200) {
				const index = this.#status.indexOf(response.status)
				if (index > -1) throw this.#statusMessage[index]
				else throw "Error->Code->"+response.status
			}
			return response.text()
		}).then(html => {
			const htmlDoc = new DOMParser().parseFromString(html, 'text/html')
			const arr = {}
			let child, save, save2, save3

			// Result Text
			arr.result = Number(htmlDoc.getElementById('content').children[1].innerText.replace(/ /g, '').replace('results', '').replace(/,/g, ''))

			// Content
			arr.content = []
			child = htmlDoc.getElementsByClassName('index-container')[0].children
			if (child[0].tagName == 'H2') throw child[0].innerText
			for (let i = 0; i < child.length; i++) {
				save = child[i].dataset.tags
				if (save.indexOf('12227') != -1) save = 'English'
				else if (save.indexOf('29963') != -1) save = 'Chinese'
				else if (save.indexOf('6346') != -1) save = 'Japanese'
				else save = null

				save2 = child[i].children[0]
				save3 = save2.children
				arr.content.push({
					id: Number(save2.getAttribute('href').replace('/g/', '').replace('/', '')),
					thumb: save3[0].getAttribute('data-src'),
					title: save3[2].innerText,
					lang: save
				})
			}

			// Pagination
			arr.pagination = null
			child = htmlDoc.getElementsByClassName('pagination')
			if (child.length > 0) {
				arr.pagination = []
				child = child[0].children
				for (let i = 0; i < child.length; i++) {

					save3 = child[i].classList
					if (save3.contains('page')) {
						if (save3.contains('current')) { arr.pagination.push([child[i].innerText, null]); continue }
						else save = child[i].innerText
					} else {
						if (save3[0] == 'first') save = '<<'
						else if (save3[0] == 'previous') save = '<'
						else if (save3[0] == 'next') save = '>'
						else if (save3[0] == 'last') save = '>>'
						else continue
					}

					// this.baseURL+this.searchURL+'?q='+text+'&page='+page
					save2 = Number(child[i].getAttribute('href').replace(this.searchURL, '').replace('?q=', '').replace(text, '').replace('&page=', ''))
					arr.pagination.push([save, save2])
				}
			}

			callback(null, arr)
		}).catch(err => {
			if (err == 'TypeError: Failed to fetch') err = 'Connection Timeout, Check Internet Connection.'
			callback(err, null)
		})
	}
}